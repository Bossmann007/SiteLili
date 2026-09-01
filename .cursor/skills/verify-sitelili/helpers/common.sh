# Shared paths and helpers for verify-sitelili. Sourced by other scripts.
# Do not execute this file directly.

set -euo pipefail

_COMMON_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(cd "$_COMMON_DIR/.." && pwd)"
HELPERS_DIR="$_COMMON_DIR"
EVIDENCE_ROOT="$SKILL_DIR/evidence"
RUN_DIR="$SKILL_DIR/.run"

find_repo_root() {
  local d="$SKILL_DIR"
  while [[ "$d" != / ]]; do
    if [[ -f "$d/package.json" ]] && grep -q '"name": "sitelili"' "$d/package.json"; then
      printf '%s\n' "$d"
      return 0
    fi
    d="$(dirname "$d")"
  done
  echo "verify-sitelili: could not find sitelili package.json walking up from $SKILL_DIR" >&2
  return 1
}

REPO_ROOT="$(find_repo_root)"

PRODUCTION_HOST="www.draligianamaffini.com.br"
EXPECTED_TITLE_SNIPPET="Dra. Ligiana Maffini"
EXPECTED_CRM="CRM/PR 17731"
EXPECTED_WHATSAPP_HREF="https://wa.me/5541995104424"
EXPECTED_EMAIL="draligianamaffini@gmail.com"
EXPECTED_LANG='lang="pt-BR"'

require_local_url() {
  local url="${1:-}"
  case "$url" in
    http://127.0.0.1:*|http://localhost:*|http://[::1]:*)
      return 0
      ;;
    *)
      echo "verify-sitelili: refusing non-local URL '$url'. Never drive ${PRODUCTION_HOST} as the harness." >&2
      return 1
      ;;
  esac
}

find_free_port() {
  python3 - <<'PY'
import socket
s = socket.socket()
s.bind(("127.0.0.1", 0))
print(s.getsockname()[1])
s.close()
PY
}

state_path() {
  if [[ -n "${SITELILI_VERIFY_STATE:-}" ]]; then
    printf '%s\n' "$SITELILI_VERIFY_STATE"
    return 0
  fi
  if [[ -f "$RUN_DIR/latest" ]]; then
    cat "$RUN_DIR/latest"
    return 0
  fi
  echo "verify-sitelili: no state file. Run helpers/launch.sh first, or export SITELILI_VERIFY_STATE." >&2
  return 1
}

read_state_field() {
  local file="$1" key="$2"
  python3 - "$file" "$key" <<'PY'
import json, sys
path, key = sys.argv[1], sys.argv[2]
with open(path, encoding="utf-8") as f:
    data = json.load(f)
value = data[key]
print(value if value is not None else "")
PY
}

pid_alive() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

listening_pid_on_port() {
  local port="$1"
  python3 - "$port" <<'PY'
import socket, sys
port = int(sys.argv[1])
try:
    import subprocess
    out = subprocess.check_output(["ss", "-ltnp"], text=True, stderr=subprocess.DEVNULL)
except Exception:
    out = ""
needle = f":{port} "
for line in out.splitlines():
    if needle not in line and f":{port}\n" not in line + "\n":
        continue
    if "LISTEN" not in line:
        continue
    # users:(("node",pid=123,fd=23))
    import re
    m = re.search(r"pid=(\d+)", line)
    if m:
        print(m.group(1))
        sys.exit(0)
print("")
PY
}

wait_http_ok() {
  local url="$1" attempts="${2:-60}"
  local i
  for i in $(seq 1 "$attempts"); do
    if curl -fsS -o /dev/null --max-time 2 "$url"; then
      return 0
    fi
    sleep 0.5
  done
  echo "verify-sitelili: timed out waiting for $url" >&2
  return 1
}
