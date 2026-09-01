#!/usr/bin/env bash
# Read-only health check: is this instance ours and worth driving?
# Usage: helpers/doctor.sh [state.json]
# Exit 0 only when local URL, recorded PIDs, and home HTML identity all match.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
source "$SCRIPT_DIR/common.sh"

if [[ "${1:-}" != "" ]]; then
  STATE_FILE="$1"
else
  STATE_FILE="$(state_path)"
fi

if [[ ! -f "$STATE_FILE" ]]; then
  echo "verify-sitelili doctor: missing state file $STATE_FILE" >&2
  exit 1
fi

BASE_URL="$(read_state_field "$STATE_FILE" baseUrl)"
PORT="$(read_state_field "$STATE_FILE" port)"
LAUNCH_PID="$(read_state_field "$STATE_FILE" launchPid)"
SERVER_PID="$(read_state_field "$STATE_FILE" serverPid)"
MODE="$(read_state_field "$STATE_FILE" mode)"
NODE_VERSION="$(read_state_field "$STATE_FILE" nodeVersion)"
EVIDENCE_DIR="$(read_state_field "$STATE_FILE" evidenceDir)"

require_local_url "$BASE_URL"

FAIL=0
note() { echo "verify-sitelili doctor: $*"; }
fail() { echo "verify-sitelili doctor FAIL: $*" >&2; FAIL=1; }

note "state=$STATE_FILE"
note "baseUrl=$BASE_URL mode=$MODE node=$NODE_VERSION"

if ! pid_alive "$LAUNCH_PID"; then
  fail "launchPid $LAUNCH_PID is not running"
fi
if ! pid_alive "$SERVER_PID"; then
  fail "serverPid $SERVER_PID is not running"
fi

LISTEN_PID="$(listening_pid_on_port "$PORT")"
if [[ -z "$LISTEN_PID" ]]; then
  fail "nothing listening on port $PORT"
elif [[ "$LISTEN_PID" != "$SERVER_PID" && "$LISTEN_PID" != "$LAUNCH_PID" ]]; then
  fail "port $PORT is owned by pid $LISTEN_PID, not launchPid=$LAUNCH_PID/serverPid=$SERVER_PID — refuse to drive a foreign instance"
fi

TMP_HTML="$(mktemp)"
trap 'rm -f "$TMP_HTML"' EXIT
HTTP_CODE="$(curl -sS -o "$TMP_HTML" -w "%{http_code}" --max-time 10 "$BASE_URL/")" || true
if [[ "$HTTP_CODE" != "200" ]]; then
  fail "GET / returned HTTP $HTTP_CODE"
fi

grep -q "$EXPECTED_LANG" "$TMP_HTML" || fail "home HTML missing ${EXPECTED_LANG}"
grep -q "$EXPECTED_TITLE_SNIPPET" "$TMP_HTML" || fail "home HTML missing '$EXPECTED_TITLE_SNIPPET'"
grep -q "$EXPECTED_CRM" "$TMP_HTML" || fail "home HTML missing '$EXPECTED_CRM'"
grep -q "$EXPECTED_WHATSAPP_HREF" "$TMP_HTML" || fail "home HTML missing WhatsApp href $EXPECTED_WHATSAPP_HREF"
grep -q 'id="conteudo"' "$TMP_HTML" || fail "home HTML missing main#conteudo"
grep -q 'data-hero-title' "$TMP_HTML" || fail "home HTML missing [data-hero-title]"
grep -q 'data-site-header' "$TMP_HTML" || fail "home HTML missing [data-site-header]"
grep -q 'name="sitelili"' "$REPO_ROOT/package.json" || fail "package.json name is not sitelili"

if grep -qiE '<form[ >]' "$TMP_HTML"; then
  fail "home HTML contains a <form> — this site must not collect patient data"
fi

if [[ "$FAIL" -ne 0 ]]; then
  echo "verify-sitelili doctor: instance is NOT safe to drive" >&2
  exit 1
fi

note "OK — local $MODE instance owns port $PORT and home identity matches"
if [[ -n "$EVIDENCE_DIR" && -d "$EVIDENCE_DIR" ]]; then
  python3 - "$EVIDENCE_DIR/doctor.json" "$STATE_FILE" "$HTTP_CODE" <<'PY'
import json, sys, datetime
out, state_path, code = sys.argv[1], sys.argv[2], sys.argv[3]
with open(state_path, encoding="utf-8") as f:
    state = json.load(f)
payload = {
    "ok": True,
    "checkedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    "httpStatus": int(code),
    "baseUrl": state["baseUrl"],
    "mode": state["mode"],
    "port": state["port"],
    "launchPid": state["launchPid"],
    "serverPid": state["serverPid"],
}
with open(out, "w", encoding="utf-8") as f:
    json.dump(payload, f, indent=2)
    f.write("\n")
PY
  note "wrote $EVIDENCE_DIR/doctor.json"
fi
