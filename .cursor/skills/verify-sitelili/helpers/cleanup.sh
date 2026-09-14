#!/usr/bin/env bash
# Tear down only the instance this skill started. Never pkill by process name.
# Does not delete evidence/. Usage: helpers/cleanup.sh [state.json]

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
  echo "verify-sitelili cleanup: no state file at $STATE_FILE (nothing to kill)" >&2
  exit 0
fi

LAUNCH_PID="$(read_state_field "$STATE_FILE" launchPid)"
SERVER_PID="$(read_state_field "$STATE_FILE" serverPid)"
PORT="$(read_state_field "$STATE_FILE" port)"
EVIDENCE_DIR="$(read_state_field "$STATE_FILE" evidenceDir)"
INSTANCE_DIR="$(dirname "$STATE_FILE")"

echo "verify-sitelili cleanup: stopping launchPid=$LAUNCH_PID serverPid=$SERVER_PID port=$PORT"

# Kill the session started by setsid in launch.sh (negative PGID). Fall back to recorded PIDs only.
if [[ -n "$LAUNCH_PID" ]] && pid_alive "$LAUNCH_PID"; then
  kill -TERM -- "-$LAUNCH_PID" 2>/dev/null || kill -TERM "$LAUNCH_PID" 2>/dev/null || true
fi
if [[ -n "$SERVER_PID" && "$SERVER_PID" != "$LAUNCH_PID" ]] && pid_alive "$SERVER_PID"; then
  kill -TERM "$SERVER_PID" 2>/dev/null || true
fi

for _ in 1 2 3 4 5 6 7 8; do
  still=0
  pid_alive "$LAUNCH_PID" && still=1
  pid_alive "$SERVER_PID" && still=1
  if [[ "$still" -eq 0 ]]; then
    break
  fi
  sleep 0.25
done

if pid_alive "$LAUNCH_PID"; then
  kill -KILL -- "-$LAUNCH_PID" 2>/dev/null || kill -KILL "$LAUNCH_PID" 2>/dev/null || true
fi
if pid_alive "$SERVER_PID"; then
  kill -KILL "$SERVER_PID" 2>/dev/null || true
fi

# Scratch only: instance dir + latest pointer. Evidence stays.
rm -rf "$INSTANCE_DIR"
if [[ -f "$RUN_DIR/latest" ]] && [[ "$(cat "$RUN_DIR/latest")" == "$STATE_FILE" ]]; then
  rm -f "$RUN_DIR/latest"
fi

echo "verify-sitelili cleanup: instance removed. Evidence kept at ${EVIDENCE_DIR:-<none>}"
if [[ -n "$EVIDENCE_DIR" && ! -d "$EVIDENCE_DIR" ]]; then
  echo "verify-sitelili cleanup: WARNING evidence dir missing: $EVIDENCE_DIR" >&2
  exit 1
fi
