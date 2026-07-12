# Content & link audit (portfolio)

**Last full pass:** 2026-07-10  
**Sources:** live HTTP titles, `gh api` repo privacy, `quant-analytics-framework` test count, career-model SSOT, Grok sessions on `/tmp/fortune-insight-`.

## Public demos (must 200)

| Product | URL | Live title (sampled) | Status |
|---------|-----|----------------------|--------|
| QuantRadar | https://quantradar.one | QuantRadar - Stock Pattern… | PASS |
| Fortune Insight | https://fortunesite.one/ | Fortune Insight — AI Tarot, BaZi… | PASS |
| 摸了么 MoYu | https://chillworks.ai | 摸了么 MoYu - 每日摸鱼运势… | PASS |

## Dead / wrong domains (must not be demoUrl)

| Domain | Status |
|--------|--------|
| ~~fortunesite.us~~ | historical dead domain; SSOT+resumes now use fortunesite.one |
| chillswork.ai | dead / fail |
| alexaliao001.github.io as Fortune **demo** | obsolete for apex app (GitHub Pages static; Manus app is fortunesite.one) |

## Repos

| Product | Canonical repo | Private? | Visitor button |
|---------|----------------|----------|----------------|
| QuantRadar app | quantradar | yes | no |
| QuantRadar site | quantradar-site | no | **yes** |
| quant-analytics-framework | same | no | **yes** |
| Fortune Insight | fortune-insight- | yes | no |
| Moyu | moyu-fortune | yes | no |
| stock-skills | stock-skills | yes | no |
| gzh-pipeline | gzh-pipeline | yes | no |

## Facts (SSOT)

| Claim | Source | Portfolio |
|-------|--------|-----------|
| ASU M.Eng. MECT, 2023–2025, With Distinction, GPA 4.0 coursework | facts.json | profile.ts |
| USF M.S. CE Water Resources 2018–2020 GPA 3.75 | facts.json | profile.ts |
| 给排水助理工程师 @ 中建西南 2021.07–2022.04 | facts.json | profile.ts |
| WSP not on main timeline | career narrative | omitted |
| GitHub Alexaliao001 | facts.json | social.ts |
| email liaorongjian@outlook.com | facts.json | social.ts |
| 153 tests in framework | repo `def test_` count + README | locales + SignalPanel |

## SSOT

- `~/career-model/profile/facts.json` and `~/self-model/user_profile.json` web_products: Fortune → `fortunesite.one` (migrated from dead fortunesite.us); Moyu → `chillworks.ai`.

## Re-run

```bash
bash scripts/check_project_links.sh
pnpm check
```
