#!/usr/bin/env bash
# Start an isolated local SiteLili instance for verification.
# Usage: helpers/launch.sh [--dev]
# Prints SITELILI_VERIFY_STATE / SITELILI_BASE_URL / SITELILI_EVIDENCE_DIR.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
source "$SCRIPT_DIR/common.sh"

MODE="preview"
if [[ "${1:-}" == "--dev" ]]; then
  MODE="dev"
fi

mkdir -p "$RUN_DIR" "$EVIDENCE_ROOT"

if [[ -z "${SITELILI_PORT:-}" ]]; then
  SITELILI_PORT="$(find_free_port)"
fi
HOST="127.0.0.1"
BASE_URL="http://${HOST}:${SITELILI_PORT}"
require_local_url "$BASE_URL"

RUN_ID="${SITELILI_RUN_ID:-$(date -u +%Y%m%dT%H%M%SZ)-$$}"
INSTANCE_DIR="$RUN_DIR/$RUN_ID"
mkdir -p "$INSTANCE_DIR"
LOG_FILE="$INSTANCE_DIR/server.log"
STATE_FILE="$INSTANCE_DIR/state.json"
EVIDENCE_DIR="${SITELILI_EVIDENCE_DIR:-$EVIDENCE_ROOT/$RUN_ID}"
mkdir -p "$EVIDENCE_DIR"

cd "$REPO_ROOT"

if ! command -v node >/dev/null; then
  echo "verify-sitelili: node is required (engines.node >= 22.12.0)" >&2
  exit 1
fi

NODE_VERSION="$(node -p "process.versions.node")"
python3 - "$NODE_VERSION" <<'PY'
import sys
ver = tuple(int(p) for p in sys.argv[1].split(".")[:3])
if ver < (22, 12, 0):
    print(f"verify-sitelili: Node {sys.argv[1]} is below engines.node >= 22.12.0", file=sys.stderr)
    sys.exit(1)
PY

if [[ ! -d "$REPO_ROOT/node_modules" ]]; then
  echo "verify-sitelili: npm install (site dependencies)" >&2
  npm install >&2
fi

if [[ "$MODE" == "preview" ]]; then
  echo "verify-sitelili: npm run build" >&2
  npm run build >&2
  START_CMD=(npx astro preview --host "$HOST" --port "$SITELILI_PORT")
else
  START_CMD=(npx astro dev --host "$HOST" --port "$SITELILI_PORT")
fi

# New session so cleanup can kill only this tree (never pkill by name).
setsid "${START_CMD[@]}" >"$LOG_FILE" 2>&1 < /dev/null &
LAUNCH_PID=$!

if ! wait_http_ok "$BASE_URL/" 80; then
  echo "verify-sitelili: launch failed. Last log lines:" >&2
  tail -n 80 "$LOG_FILE" >&2 || true
  kill -TERM -- "-$LAUNCH_PID" 2>/dev/null || kill -TERM "$LAUNCH_PID" 2>/dev/null || true
  exit 1
fi

SERVER_PID="$(listening_pid_on_port "$SITELILI_PORT")"
if [[ -z "$SERVER_PID" ]]; then
  SERVER_PID="$LAUNCH_PID"
fi

python3 - "$STATE_FILE" "$LAUNCH_PID" "$SERVER_PID" "$SITELILI_PORT" "$HOST" "$BASE_URL" "$MODE" "$REPO_ROOT" "$RUN_ID" "$EVIDENCE_DIR" "$LOG_FILE" "$NODE_VERSION" <<'PY'
import json, sys, datetime
path = sys.argv[1]
keys = ["launchPid","serverPid","port","host","baseUrl","mode","repoRoot","runId","evidenceDir","logFile","nodeVersion"]
vals = sys.argv[2:]
data = dict(zip(keys, vals))
data["launchPid"] = int(data["launchPid"])
data["serverPid"] = int(data["serverPid"])
data["port"] = int(data["port"])
data["startedAt"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
data["pgid"] = data["launchPid"]
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
PY

printf '%s\n' "$STATE_FILE" > "$RUN_DIR/latest"

echo "verify-sitelili: $MODE ready at $BASE_URL (pid $LAUNCH_PID, listen pid $SERVER_PID)" >&2
echo "SITELILI_VERIFY_STATE=$STATE_FILE"
echo "SITELILI_BASE_URL=$BASE_URL"
echo "SITELILI_EVIDENCE_DIR=$EVIDENCE_DIR"
echo "SITELILI_RUN_ID=$RUN_ID"
