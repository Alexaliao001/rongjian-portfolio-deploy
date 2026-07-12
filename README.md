# rongjian-portfolio

Personal portfolio for **Rongjian Liao / 廖荣剑** — bilingual (**English** + **中文**), Neo-Brutalism dark UI, Manus-publishable.

## Quick start

```bash
cd ~/rongjian-portfolio
pnpm install
pnpm dev          # http://localhost:3000 → redirects to /en or /zh
pnpm check        # tsc
pnpm test         # vitest (i18n path helpers)
pnpm build
pnpm start        # production server on dist/
```

## Locales

| Prefix | Language |
|--------|----------|
| `/en` | English (default when browser is not `zh*`) |
| `/zh` | 中文 |

Language toggle in the header preserves the logical path (`/en/about` ↔ `/zh/about`) and stores preference in `localStorage` (`portfolio_locale`).

Legacy paths (`/about`, `/projects`, `/blog`) redirect into the preferred locale.

## Content SSOT

| Path | Role |
|------|------|
| `client/src/data/profile.ts` | Education / experience facts (no long narrative) |
| `client/src/data/projects.ts` | Project URLs & tags |
| `client/src/data/blog.ts` | Posts with `en` + `zh` bodies |
| `client/src/data/social.ts` | Verified GitHub + email only |
| `client/src/locales/en/*` | English copy |
| `client/src/locales/zh/*` | Chinese copy |

Facts must stay aligned with `~/career-model/profile/facts.json`.

## Manus publish

Do **not** remove items listed in `docs/MANUS_KEEP.md` (runtime plugin, wouter patch, analytics placeholders, etc.).

After `git push`, sync/publish from Manus as usual. Local `pnpm build` may warn about `%VITE_ANALYTICS_*%` — expected without Manus env injection.

## Perfect gate

```bash
bash scripts/perfect_gate.sh
```

## Goal docs

- Daily / detailed: `GROK_GOAL.md`
- Multi-hour marathon: `GROK_GOAL_SUPER.md`
- Progress: `PROGRESS_GROK.md`
