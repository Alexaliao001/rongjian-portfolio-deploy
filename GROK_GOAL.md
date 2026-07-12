# GROK /goal — rongjian-portfolio 全方位优化（中英双版本）

> **仓库**：https://github.com/Alexaliao001/rongjian-portfolio  
> **本地**：`~/rongjian-portfolio`  
> **发布**：继续用 **Manus Publish**（禁止拆掉 Manus 脚手架，见 `docs/MANUS_KEEP.md`）  
> **事实 SSOT**：`~/career-model/profile/facts.json` + `portrait.md` + `~/Documents/career_narrative_unified_2026-03-22.md`  
> **语言**：站点必须提供 **完整中文版 + 完整英文版**（非机翻半截、非仅按钮切换 UI chrome）  
> **编排**：单轮 1 backlog、1 写者；`pnpm check` + `pnpm build` 绿 → commit + push → 用户 Manus Publish  

---

## 粘贴版（完整 /goal — 整块复制回车）

```
/goal 全方位优化个人作品集 rongjian-portfolio（中英双版本）。

════════════════════════════════════
仓库与任务源
════════════════════════════════════
仓库：~/rongjian-portfolio
远程：https://github.com/Alexaliao001/rongjian-portfolio
任务源（唯一）：~/rongjian-portfolio/GROK_GOAL.md
进度：~/rongjian-portfolio/PROGRESS_GROK.md
Manus 保留清单：~/rongjian-portfolio/docs/MANUS_KEEP.md

开工前：
  git -C ~/rongjian-portfolio pull --rebase
  完整阅读 GROK_GOAL.md（§三事实红线、§四定位、§五铁律、§六双语架构、§八 Backlog、§九 N 验收）

════════════════════════════════════
角色
════════════════════════════════════
你是我的 portfolio 驻场「产品 + 工程 + 文案」代理。
- 事实只允许来自 career-model facts/portrait 与 career_narrative 底稿
- 禁止编造学历、头衔、日期、用户量、融资、未验证社交链接
- 中文版与英文版都是一等公民：结构对称、事实一致、语气本地化（不是同一字符串硬翻）

════════════════════════════════════
北极星（同时满足）
════════════════════════════════════
把站点从「Manus 模板能看」升级为「中英文招聘官/联创 90 秒内愿意约面试」：

  ① 事实零红线（教育/经历/项目与 SSOT 一致；双语文案都不得踩红线）
  ② 叙事主航道：AI 应用 / 数据系统 / Agent 落地；量化是证据不是唯一标签
  ③ 中英双完整版本：
       - URL 前缀路由：/en/* 与 /zh/*（默认智能跳转，可手动切换）
       - 全部主页面双语：Home / About / Projects / Blog 列表与详情 / 404 / Layout / 联系
       - 语言切换持久化（localStorage）；切换保留当前路径语义
  ④ 作品有可点证据（demo / GitHub / 诚实 private），无死链、无假「已发送」
  ⑤ 设计：Neo-Brutalism × 工程精度；移动端导航完整可用
  ⑥ Manus 发布链路完整（runtime / analytics 占位 / allowedHosts / wouter patch 不删）

════════════════════════════════════
受众（写文案时心里要有人）
════════════════════════════════════
A. 早期 AI 创业 Founding Eng / CTO（远程优先）— 英文为主、中文加分
B. 国内/华人圈 AI 应用与数据系统岗位 — 中文为主
C. Fintech / 量化系统（副航道）— 强调系统结构，非荐股
D. 协作与读者 — Blog 双语（可中英分篇或同 slug 双正文）

求职偏好：早期 AI 创业 + equity + 远程；主头衔
  EN: Full-stack AI Application & Data Systems Engineer
  ZH: 全栈 AI 应用与数据系统工程师
Quant 是 bonus，不是主标签。

════════════════════════════════════
每轮 SOP（强制）
════════════════════════════════════
0.  git -C ~/rongjian-portfolio pull --rebase
0b. 读 PROGRESS_GROK.md 最近 3 行
0c. 取 §八 Backlog 中最高优先级且 status≠done 的【一项】（只做这一项）
1.  实现最小 diff；需要勘探可 spawn 只读 explore；禁止无 worktree 双写
2.  门禁：pnpm check && pnpm build
    （本地 %VITE_ANALYTICS_*% warning 可忽略，属 Manus 注入）
3.  抽检清单（本轮相关者必做）：
    - /en /en/about /en/projects /en/blog /en/blog/:slug
    - /zh /zh/about /zh/projects /zh/blog /zh/blog/:slug
    - 语言切换后路径语义正确；375px 移动菜单中英均可
4.  凡改文案 → §三红线自检（教育/头衔/WSP/假学位/假链接）
5.  PROGRESS_GROK.md 追加一行；commit；git push origin main
6.  update_goal(message="本轮 ID + 结果摘要")；用户去 Manus Publish

════════════════════════════════════
终局
════════════════════════════════════
§七 综合分 P≥90 且 §九 N1–N14 全 PASS
→ update_goal(completed=true)

铁律一句话：不拆 Manus；不写假数据；中英对等完整；单写者；每轮一项；push 前 build 绿。
```

---

## 一、使命

用**可验证的工程与 AI 系统作品**，把「给排水/工程建模 → 计算机与 AI」的收敛路径讲清楚；  
**中文版**服务国内与华人决策者，**英文版**服务远程/国际/早期创业招聘方；两边事实一致、语气各自地道。

---

## 二、受众与转化

| 优先级 | 受众 | 默认语言 | 90s 要看到 | 主 CTA |
|--------|------|----------|------------|--------|
| **A** | 早期 AI 创业 Founding Eng / CTO（远程） | **EN** | 能独立 ship 全栈+Agent；有 live/private 诚实证据 | Email + projects |
| **B** | 国内 AI 应用 / 数据系统招聘 | **ZH** | 路径清晰、可验证项目、能落地 | 邮件 + GitHub |
| **C** | Fintech / 量化系统（副） | 双 | 系统结构与校准思维，非荐股 | QuantRadar + framework |
| **D** | 读者 / 协作 | 双 | 可读 build log | Blog |

**非目标**：交易带单站、堆 FAANG 空名、假国际化（仅 UI 英文化而内容仍中文或反过来）。

---

## 三、事实 SSOT 与红线（违反 = 本轮作废）

> 中英**任一语言**踩红线都算失败。数字、校名、头衔、日期两边必须对齐。

### 3.1 身份

| 字段 | 值 |
|------|-----|
| 姓名 | 廖荣剑 / Rongjian Liao |
| Email | liaorongjian@outlook.com |
| GitHub | https://github.com/Alexaliao001 |
| 现居 | 成都（temporary）；Open to remote / 合适机会 relocation |
| 语言能力 | 中文母语；英文可工作（CET-6, GRE 315） |

### 3.2 教育

| | 正确 | 禁止 |
|--|------|------|
| **ASU** | M.Eng. (Engineering / MECT online · Computing & Technology), 2023–2025, With Distinction, graduate computing coursework GPA 4.0/4.0 | ❌ M.S. Computer Science 作为独立第二学位；❌ 两个 ASU 学位 |
| **USF** | M.S. Civil Engineering (Water Resources), **2018–2020**, GPA 3.75/4.0；叙事可写建模/水动力/CFD 向 | ❌ 笼统「土木施工」；❌ 2015–2020 |
| **Merrimack** | M.S. Management (Master of Management), 2016–2017 | ❌ MBA；❌ 具体 GPA（PENDING） |
| 本科 | 四川理工学院 · 给水排水科学与工程 2011–2015 | 英文旗舰可省略本科 |

### 3.3 经历

| 段 | 正确 | 禁止 |
|----|------|------|
| 2022–今 | 独立全栈 AI / 数据与量化系统工程师 | 编造融资/DAU |
| 2021.07–2022.04 | **给排水助理工程师** @ 中国建筑西南勘察设计研究院 | ❌ 项目经理 |
| 中建上海院 | 给排水助理工程师；日期未核可不写 | 瞎编日期 |
| WSP | **默认不进主时间线** | ❌ 一年完整主经历 / MEP PM 主标签 |

### 3.4 项目证据池（中英同一事实，描述本地化）

| 项目 | 证据 | 链接 |
|------|------|------|
| QuantRadar | 门控 Market→Sector→Stock | quantradar.one · `quantradar` |
| quant-analytics-framework | 贝叶斯校准、多源 API、153 tests | public GitHub |
| stock-skills / trading skills | 生产级 private 系统 + MCP | 可标 private |
| Moyu 摸了么 | 产品实验 | https://chillworks.ai |
| Fortune Insight | 完整产品闭环 | demo https://fortunesite.one/ · 源码 private `fortune-insight-` |
| gzh-pipeline | 内容工厂自动化 | private 诚实写 |

### 3.5 现状已知错误（优先清）

1. About 写「M.S. Computer Science」→ 改 M.Eng.  
2. USF 年限/专业不准  
3. 「Project Manager」@ 中建 → 助理工程师  
4. WSP 主时间线 → 移除或极度降级  
5. 错误 Twitter/LinkedIn handle → 只留 GitHub + email  
6. 假表单 success、死链、`href="#"` 外链  
7. Hero/OPEN_TO 名企 listicle → 对齐 founding / AI app / remote  

---

## 四、定位与叙事

### 4.1 One-liner

| | 文案 |
|--|------|
| **ZH** | 我前面是给排水工程和工程建模，后面主动收敛到计算机、AI 应用和数据系统；现在最适合做 AI 应用、Python、数据系统与 AI 平台化落地。 |
| **EN** | Engineer turned systems builder — from water-resources modeling to production AI applications, data systems, and agent workflows. |

### 4.2 头衔

| | |
|--|--|
| **ZH** | 全栈 AI 应用与数据系统工程师 |
| **EN** | Full-stack AI Application & Data Systems Engineer |

### 4.3 设计语言（中英共享视觉）

Neo-Brutalism × Scientific Precision：`#0a0a0a` / `#3b82f6` / `#10b981` / JetBrains Mono + Inter / `tech-border`。  
双语只换文案与 `lang` 属性，不换两套皮肤。

---

## 五、铁律

1. **Manus 发布主权**：见 `docs/MANUS_KEEP.md`；本地 analytics warning 不算失败。  
2. **事实神圣**：无 SSOT 不写；不确定省略或 `TBD`。  
3. **中英对等**：不允许「英文完整、中文占位」或反过来；UI chrome + 主内容必须双语齐。  
4. **本地化而非硬翻**：中文用求职叙事底稿语气；英文简洁、可扫读、少中国职场黑话直译。  
5. **诚实交互**：无假 MESSAGE_SENT。  
6. **单轮单写者**；无 worktree 禁止双写。  
7. **移动可用**。  
8. **无死链**。  
9. **a11y**：不恢复 `maximum-scale=1`；`html lang` 随 locale 切换。  
10. **密钥**：站点不放手机号；只放 email。  
11. **Push 门禁**：`pnpm check` + `pnpm build`。  
12. **范围**：只改本仓库；可读 career-model / Documents narrative。

---

## 六、双语架构（实现契约）

### 6.1 路由（强制方案）

使用 **路径前缀**（利于 SEO、分享、Manus 预览路由列表）：

| Locale | 前缀 | 示例 |
|--------|------|------|
| English | `/en` | `/en`, `/en/about`, `/en/projects`, `/en/blog`, `/en/blog/:slug` |
| 中文 | `/zh` | `/zh`, `/zh/about`, … |

- `/` → 按 `localStorage.locale` 或 `navigator.language` 重定向到 `/en` 或 `/zh`（无偏好时默认 **`/en`**，国际优先；可配置）。  
- 切换语言：`/en/about` ↔ `/zh/about`（同名路径段映射）。  
- wouter 的 Manus patch 会收集 path：务必注册全部 `/en/*` 与 `/zh/*` 路由。

### 6.2 代码结构（推荐）

```
client/src/
  i18n/
    locale.tsx          # LocaleProvider, useLocale, t(), setLocale
    routes.ts           # path helpers: withLocale(locale, "/about")
  locales/
    en/
      common.ts         # nav, footer, cta, status labels
      home.ts
      about.ts
      projects.ts
      blog.ts           # posts meta + body EN
      notFound.ts
    zh/
      common.ts
      home.ts
      about.ts
      projects.ts
      blog.ts
      notFound.ts
  data/
    profile.ts          # 语言无关事实：日期、学校官方英文名、URL、GPA
    social.ts
```

**规则**：

- **事实字段**（学校官方名、年份、GPA、URL、repo）放 `data/profile.ts`，中英共用。  
- **叙述字段**（段落、角色职责描述、CTA）放 `locales/{en,zh}/*`。  
- 禁止在 JSX 里散落 hardcode 长文案（导航短 label 可例外但须双文件都有）。

### 6.3 语言切换 UI

- Header 固定 **EN | 中文**（或 `EN` / `中`）  
- 当前语言高亮；`aria-label` 双语可理解  
- 写入 `localStorage.setItem("locale", "en"|"zh")`  
- 切换不丢锚点意图（about→about）

### 6.4 Blog 双语策略

| 策略 | 说明 | 选用 |
|------|------|------|
| **A. 同 slug 双正文** | `slug` 相同，`body.en` / `body.zh` | **默认推荐** |
| B. 分 slug | `why-classic-patterns` vs `weishenme-jingdian-xingtai` | 仅当 SEO 强需求 |

列表页只展示当前 locale 的 title/desc；缺译的文章：**不显示**或标「仅中文/EN only」，禁止显示另一语言正文却标当前语言。

### 6.5 SEO / 文档

- `document.documentElement.lang = "en" | "zh-CN"`  
- 每页 title/description 随语言变  
- 可选：`link rel="alternate" hreflang="en"|zh"`  
- `index.html` 默认 lang 可 `en`，运行时覆盖  

---

## 七、综合分 P（0–100）

| 维 | 权重 | 满分条件 |
|----|------|----------|
| **P1 事实正确** | 20 | 红线 0；中英事实字段一致 |
| **P2 叙事转化** | 15 | 中英 one-liner 与 OPEN_TO 对齐真实偏好 |
| **P3 作品证据** | 15 | ≥4 项目卡有证据；双语言描述完整 |
| **P4 双语完整度** | **20** | 全主路径中英可切换；无半截翻译；html lang 正确 |
| **P5 体验工程** | 15 | 路由/移动/无死链/build 绿 |
| **P6 设计辨识** | 15 | 字体、暗色、统一组件；中英同一视觉系统 |

**终局**：P≥90 且 §九 N1–N14 全 PASS。

---

## 八、Backlog（严格按序；每轮一项）

状态：`todo` → `doing` → `done`。完成写 PROGRESS 一行。

### Phase 0 — 事实 SSOT 地基

| ID | 任务 | 验收 |
|----|------|------|
| **PF-0** | `data/profile.ts`：语言无关事实（教育、经历、技能标签 id、链接） | 类型清晰；无叙述长文 |
| **PF-1** | 纠正错误教育/经历（先修 en 硬编码页或迁入 profile） | §3.5 1–4 清零 |
| **PF-2** | `social.ts` 仅 GitHub+email；全站引用统一 | 无假社交 |
| **PF-3** | `rg` 扫描禁止串：M.S. Computer Science、Project Manager@中建 等 | 业务代码 0 命中 |

### Phase 1 — 双语基础设施（优先于继续堆英文文案）

| ID | 任务 | 验收 |
|----|------|------|
| **PL-0** | `LocaleProvider` + `useLocale` + `localStorage` + `t` 或模块 import 模式 | 单元可测或页面切换无闪断 |
| **PL-1** | wouter 路由：`/en/*` `/zh/*`；`/` 重定向；Layout 语言切换 | Manus 可收集全部 path |
| **PL-2** | `locales/en/common.ts` + `locales/zh/common.ts`（nav/footer/cta） | Header/Footer 无硬编码 |
| **PL-3** | `html lang` + 文档 title 模板随 locale | 切换后 devtools 可见 |

### Phase 2 — 页面双语内容

| ID | 任务 | 验收 |
|----|------|------|
| **PL-4** | Home 中英全文（Hero、Featured、Logs 摘要、OPEN_TO） | `/en` `/zh` 抽检 |
| **PL-5** | About 中英全文（叙事、教育、经历、技能、联系） | 事实与 profile 一致 |
| **PL-6** | Projects 中英（`data/projects` 事实 + locale 描述） | ≥4 卡证据链 |
| **PL-7** | Blog 列表+详情双语（策略 A） | 3 篇双正文或诚实「仅一语」标记 |
| **PL-8** | NotFound 中英 | 暗色统一 |

### Phase 3 — 转化与 SEO

| ID | 任务 | 验收 |
|----|------|------|
| **PC-1** | OPEN_TO / CTA 对齐 founding + remote；去空洞名企堆砌 | 中英各自自然 |
| **PC-2** | Resume CTA：`/resume.pdf` 或 mailto 索取（中英按钮文案） | 不 404 |
| **PC-3** | meta description + 可选 OG；hreflang alternate | 基础 SEO |
| **PC-4** | 联系 mailto 预填主题随语言变化 | 诚实可用 |

### Phase 4 — 体验与设计

| ID | 任务 | 验收 |
|----|------|------|
| **PX-1** | 设计 token 文档化；减少无用 shadcn 堆砌感 | 主路径一致 |
| **PX-2** | 375px 中英移动菜单 + 语言切换 | 走查通过 |
| **PX-3** | focus-visible / 对比度 / 字体 swap | a11y 抽检 |
| **PX-4** | 性能：避免无用大依赖上首页 | build 产物检查 |

### Phase 5 — Manus 与收官

| ID | 任务 | 验收 |
|----|------|------|
| **PM-1** | README：dev/build + 双语路由说明 + Manus Publish | 新人可跑 |
| **PM-2** | 更新 `docs/MANUS_KEEP.md` 若路由注册方式有变 | 清单有效 |
| **PZ-1** | 真机 Manus 发布后中英 URL 分享验收 | 用户确认 |
| **PZ-2** | 计算 P；N1–N14；收官 | `completed=true` |

---

## 九、收官 N1–N14

| ID | 条件 |
|----|------|
| **N1** | 事实红线 0 命中（中英） |
| **N2** | GitHub=Alexaliao001；email 正确 |
| **N3** | `/en` 与 `/zh` 及 about/projects/blog 均可打开 |
| **N4** | 语言切换保留路径语义；localStorage 记忆 |
| **N5** | Blog 详情中英策略落实；未知 slug 404 |
| **N6** | 移动菜单中英均可到达主路由 |
| **N7** | 联系诚实可用 |
| **N8** | ≥4 项目证据链；中英描述齐全 |
| **N9** | `pnpm check` && `pnpm build` PASS |
| **N10** | Manus 关键文件仍在 |
| **N11** | 字体加载；`lang` 正确 |
| **N12** | 404/主站暗色统一 |
| **N13** | SEO 基础 meta 双语 |
| **N14** | P≥90 + 用户完成一次 Manus 双语发布抽检 |

---

## 十、Skills

| 场景 | Skill |
|------|--------|
| 实现 | `ship-code` / `implement` |
| 设计 | `design-taste-frontend`、`emil-design-eng` |
| a11y | `web-design-guidelines` |
| 事实 | `~/career-model/profile/facts.json` |
| 调研 | `agent-reach` |
| 验收 | `check-work` / `review` |

---

## 十一、PROGRESS 格式

```text
YYYY-MM-DD | PL-1 | done | /en /zh routes + locale switch | P~55 | commit <sha>
```

---

## 十二、目录

```
~/rongjian-portfolio/
  GROK_GOAL.md              ← 本任务源
  PROGRESS_GROK.md
  docs/MANUS_KEEP.md
  client/src/i18n/          ← 待建
  client/src/locales/en|zh/ ← 待建
  client/src/data/          ← profile/projects/social/blog
```

---

## 附录 A — 语气

- **ZH**：求职叙事底稿风格——清楚、不装、路径收敛。  
- **EN**：短句、动词优先、可扫读；避免 “first principles” 空喊堆砌。  
- **都不要**：哭穷、焦虑、过度谦虚或过度狂妄。

## 附录 B — 与历史误操作

「去掉 Manus 痕迹」= 去掉**用户可见品牌**，不是删发布脚手架。  
双语实现不得以「简化 Manus」为借口删除 runtime/patch。

---

*rongjian-portfolio continuous goal · bilingual · 2026-07-10*
