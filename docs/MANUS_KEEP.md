# Manus Publish — Do Not Delete

These exist so **Manus preview / publish** keeps working. Product UI should not surface Manus branding; infrastructure stays.

| Path / config | Why |
|---------------|-----|
| `vite-plugin-manus-runtime` in `package.json` + `vite.config.ts` | Host preview runtime injected into HTML |
| `@builder.io/vite-plugin-jsx-loc` | Element location for Manus editor |
| `vitePluginManusDebugCollector` + `client/public/__manus__/debug-collector.js` | Dev log shipping to `/__manus__/logs` |
| `server.allowedHosts` `*.manus*.computer` etc. | Preview domain allowlist |
| `patches/wouter@3.7.1.patch` | Exposes `__WOUTER_ROUTES__` for previewer routing |
| `client/index.html` `%VITE_ANALYTICS_ENDPOINT%` / `%VITE_ANALYTICS_WEBSITE_ID%` | Injected at Manus publish (local warning OK) |
| `client/src/components/ManusDialog.tsx`, `const.ts` OAuth helpers | Scaffolding; unused is fine, do not strip “to clean” |

**Safe to improve:** page copy, design tokens, routes, forms, SEO, public assets.  
**Not safe without Manus confirmation:** removing the above list.
