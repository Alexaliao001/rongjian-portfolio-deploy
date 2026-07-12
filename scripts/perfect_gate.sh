#!/usr/bin/env bash
# Perfect Gate — machine checks for rongjian-portfolio SUPER goal.
# Exit 0 only if all machine checks pass. Human G10–G16 still required in PROGRESS.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
FAIL=0
pass() { echo "PASS  $1"; }
fail() { echo "FAIL  $1"; FAIL=1; }

echo "=== Perfect Gate (machine) ==="
echo "repo: $ROOT"
echo "sha:  $(git rev-parse --short HEAD 2>/dev/null || echo nogit)"
echo

# G1 / G2
if pnpm check >/tmp/portfolio-gate-check.txt 2>&1; then
  pass "G1 pnpm check"
else
  fail "G1 pnpm check"
  tail -20 /tmp/portfolio-gate-check.txt || true
fi

if pnpm build >/tmp/portfolio-gate-build.txt 2>&1; then
  pass "G2 pnpm build"
else
  fail "G2 pnpm build"
  tail -30 /tmp/portfolio-gate-build.txt || true
fi

# G3 red-line strings in business source (exclude this script / goal md)
if rg -n --glob '!**/GROK_GOAL*.md' --glob '!**/PROGRESS*.md' --glob '!**/docs/**' \
  'M\.S\. Computer Science|twitter\.com/rongjian|linkedin\.com/in/rongjian' client/src 2>/dev/null; then
  fail "G3 red-line strings still present in client/src"
else
  pass "G3 no known red-line strings in client/src"
fi

# G4 Manus runtime dep
if grep -q 'vite-plugin-manus-runtime' package.json; then
  pass "G4 vite-plugin-manus-runtime in package.json"
else
  fail "G4 missing vite-plugin-manus-runtime"
fi

if test -f docs/MANUS_KEEP.md; then
  pass "G4b docs/MANUS_KEEP.md exists"
else
  fail "G4b docs/MANUS_KEEP.md missing"
fi

# G5 wouter patch
if test -f patches/wouter@3.7.1.patch; then
  pass "G5 wouter Manus patch present"
else
  fail "G5 wouter patch missing"
fi

# G6 locale routes
if rg -n '"/en"|'"'/en'"'|path:\s*"/en|`/en' client/src --glob '*.{tsx,ts}' >/dev/null 2>&1 \
  && rg -n '"/zh"|'"'/zh'"'|path:\s*"/zh|`/zh' client/src --glob '*.{tsx,ts}' >/dev/null 2>&1; then
  pass "G6 /en and /zh route markers found"
else
  fail "G6 missing /en or /zh route markers (WAVE-2 not done?)"
fi

# G7 locale content dirs or modules
if { test -d client/src/locales/en && test -d client/src/locales/zh; } \
  || { test -f client/src/locales/en.ts && test -f client/src/locales/zh.ts; }; then
  pass "G7 locales en+zh present"
else
  fail "G7 locales en+zh missing (WAVE-2/3)"
fi

# G8 education signal
if rg -n 'M\.Eng|Master of Engineering|MECT' client/src --glob '*.{ts,tsx}' >/dev/null 2>&1; then
  pass "G8 M.Eng / Engineering signal present"
else
  fail "G8 no M.Eng signal in client/src (WAVE-1/3)"
fi

if rg -n 'M\.S\. Computer Science' client/src --glob '*.{ts,tsx}' >/dev/null 2>&1; then
  fail "G8b forbidden M.S. Computer Science still in client/src"
else
  pass "G8b no M.S. Computer Science claim"
fi

# G9 github handle
if rg -n 'github\.com/Alexaliao001' client/src --glob '*.{ts,tsx}' >/dev/null 2>&1; then
  pass "G9 GitHub Alexaliao001 referenced"
else
  fail "G9 GitHub Alexaliao001 not found in client/src"
fi

echo
if [[ "$FAIL" -eq 0 ]]; then
  echo "PERFECT_GATE_MACHINE_OK"
  echo "Still required in PROGRESS (human): G10–G16 from GROK_GOAL_SUPER.md §G"
  exit 0
else
  echo "PERFECT_GATE_MACHINE_FAIL"
  exit 1
fi
