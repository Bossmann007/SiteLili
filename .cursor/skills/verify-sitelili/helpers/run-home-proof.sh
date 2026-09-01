#!/usr/bin/env bash
# End-to-end generator proof: launch → doctor → drive home → cleanup.
# Evidence must still exist after cleanup.
# Usage: helpers/run-home-proof.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
source "$SCRIPT_DIR/common.sh"

cd "$HELPERS_DIR"
if [[ ! -d node_modules/playwright ]]; then
  echo "verify-sitelili: installing Playwright (verification scaffolding only)"
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
fi

# Isolate this proof from any other instance. Do not reuse .run/latest from a previous agent.
unset SITELILI_VERIFY_STATE
export SITELILI_RUN_ID="${SITELILI_RUN_ID:-proof-$(date -u +%Y%m%dT%H%M%SZ)}"
export SITELILI_EVIDENCE_DIR="$EVIDENCE_ROOT/proof"

rm -rf "$SITELILI_EVIDENCE_DIR"
mkdir -p "$SITELILI_EVIDENCE_DIR"

cleanup_on_fail() {
  local code=$?
  if [[ -n "${SITELILI_VERIFY_STATE:-}" && -f "$SITELILI_VERIFY_STATE" ]]; then
    "$SCRIPT_DIR/cleanup.sh" "$SITELILI_VERIFY_STATE" || true
  fi
  exit "$code"
}
trap cleanup_on_fail ERR

eval "$("$SCRIPT_DIR/launch.sh")"
export SITELILI_VERIFY_STATE SITELILI_BASE_URL SITELILI_EVIDENCE_DIR SITELILI_RUN_ID

"$SCRIPT_DIR/doctor.sh" "$SITELILI_VERIFY_STATE"
node "$SCRIPT_DIR/drive.mjs" --state "$SITELILI_VERIFY_STATE" --feature home
"$SCRIPT_DIR/cleanup.sh" "$SITELILI_VERIFY_STATE"

echo "verify-sitelili: confirming evidence survived cleanup"
test -f "$SITELILI_EVIDENCE_DIR/home-hero.png"
test -f "$SITELILI_EVIDENCE_DIR/home.proof.json"
test -f "$SITELILI_EVIDENCE_DIR/doctor.json"
test ! -f "${SITELILI_VERIFY_STATE:-/tmp/sitelili-missing-state}"
echo "verify-sitelili: proof complete. Evidence remains at $SITELILI_EVIDENCE_DIR"
ls -la "$SITELILI_EVIDENCE_DIR"
