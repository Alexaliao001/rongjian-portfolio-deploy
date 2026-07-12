#!/usr/bin/env bash
# Audit demo URLs + public repo URLs in client/src/data/projects.ts
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

python3 <<'PY'
import re
import ssl
import sys
import urllib.request
from pathlib import Path

FILE = Path("client/src/data/projects.ts")
text = FILE.read_text()
ctx = ssl.create_default_context()
fail = 0

def check(url: str, label: str) -> None:
    global fail
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "portfolio-link-check"})
        with urllib.request.urlopen(req, context=ctx, timeout=12) as r:
            code = r.status
            final = r.geturl()
    except Exception as e:
        print(f"FAIL  ERR   [{label}] {url}  ({e})")
        fail = 1
        return
    if code in (200, 301, 302):
        print(f"PASS  {code}  [{label}] {url}")
    else:
        print(f"FAIL  {code}  [{label}] {url} -> {final}")
        fail = 1

print("=== Project link audit ===")
print(f"source: {FILE}")
print()

blocks = re.split(r"\n  \{\n", text)
for b in blocks:
    demos = re.findall(r'demoUrl:\s*"(https://[^"]+)"', b)
    repos = re.findall(r'repoUrl:\s*"(https://[^"]+)"', b)
    pub_m = re.search(r"repoPublic:\s*(true|false)", b)
    for d in demos:
        check(d, "demo")
    for r in repos:
        is_pub = True if not pub_m else pub_m.group(1) == "true"
        if is_pub:
            check(r, "repo-public")
        else:
            print(f"SKIP  private repo (no public button)  {r}")

if re.search(r'(demoUrl|repoUrl):\s*"https://[^"]*(fortunesite\.us|chillswork\.ai)', text):
    print("FAIL  forbidden dead domain as demo/repo URL")
    fail = 1
else:
    print("PASS  no forbidden dead domains as demo/repo URL")

if "fortunesite.one" not in text:
    print("FAIL  fortunesite.one missing")
    fail = 1
else:
    print("PASS  fortunesite.one present")

if "fortune-insight-" not in text:
    print("FAIL  fortune-insight- private source missing")
    fail = 1
else:
    print("PASS  fortune-insight- documented")

if "Alexaliao001.github.io" in re.findall(r'demoUrl:\s*"(https://[^"]+)"', text):
    print("FAIL  github.io still used as Fortune demo")
    fail = 1

print()
if fail:
    print("LINK_AUDIT_FAIL")
    sys.exit(1)
print("LINK_AUDIT_OK")
sys.exit(0)
PY
