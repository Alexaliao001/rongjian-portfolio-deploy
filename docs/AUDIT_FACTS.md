# WAVE-0 Fact Audit vs SSOT

**Baseline sha:** `3859880`  
**Date:** 2026-07-10  
**SSOT:** `~/career-model/profile/facts.json` + portrait + career_narrative  
**Build:** `pnpm check` PASS · `pnpm build` PASS (analytics env warnings expected)

## Manus keep-set

| Item | Status |
|------|--------|
| `docs/MANUS_KEEP.md` | present |
| `vite-plugin-manus-runtime` in package.json | present |
| `patches/wouter@3.7.1.patch` | present |
| `client/public/__manus__/debug-collector.js` | present |
| Manus plugins in vite.config.ts | present |

## Concrete errors (≥5)

| # | Location | Error | Correct (SSOT) |
|---|----------|-------|----------------|
| 1 | `About.tsx` ~L284 | `M.S. Computer Science (GPA 4.0/4.0)` | ASU **M.Eng.** (MECT / Computing & Technology), With Distinction, coursework GPA 4.0/4.0 — **not** M.S. CS |
| 2 | `About.tsx` ~L295 | USF period `2015 - 2020` | **2018–2020** |
| 3 | `About.tsx` ~L323 | role `Project Manager` @ 中建西南 | **给排水助理工程师** / Assistant Engineer (Water Supply & Drainage) |
| 4 | `About.tsx` ~L330–331 | WSP **MEP Project Manager** on primary timeline | **Remove from primary timeline** (short tenure; default-not-in-resume) |
| 5 | `About.tsx` ~L215 | “Computer Science” as degree framing | Path is computing/AI systems via M.Eng. track, not a second CS master’s |
| 6 | `Home.tsx` ~L192 | OPEN_TO lists `xAI, Tesla, Nvidia` | Prefer founding / remote AI application teams — no hollow FAANG laundry list |
| 7 | Site-wide | No `/en` `/zh` locales | SUPER requires full bilingual path-prefix site |
| 8 | Projects page | Missing quant-analytics-framework + honest private stock-skills | ≥4 evidenced projects per SUPER |

## Notes

- `social.ts` already correct (Alexaliao001 + outlook email only).
- Blog content is English-only (bilingual required in WAVE-2/3).
- Contact form already uses honest mailto (keep).
