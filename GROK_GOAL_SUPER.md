# SUPER /goal — rongjian-portfolio 多小时马拉松收官

> **模式**：Grok Build CLI **连续执行数小时**，直到 **Perfect Gate 全绿** 才允许 `update_goal(completed=true)`。  
> **仓库**：`~/rongjian-portfolio` · https://github.com/Alexaliao001/rongjian-portfolio  
> **发布**：Manus Publish 必须可用（`docs/MANUS_KEEP.md`）  
> **事实 SSOT**：`~/career-model/profile/facts.json` + `portrait.md` + `~/Documents/career_narrative_unified_2026-03-22.md`  
> **姊妹文档**：细节铁律与受众见 `GROK_GOAL.md`；**执行以本文为准**（冲突时本文优先）。  
> **进度**：`PROGRESS_GROK.md` + 可选 `HARNESS_ROUNDS.jsonl`

---

## 0. 超级粘贴版（整块丢进 Grok Build CLI）

```
/goal SUPER 马拉松：把 rongjian-portfolio 做到 Perfect（中英双完整站 + 事实零红线 + Manus 可发）。
允许连续运行很多小时。禁止假收官。未过 Perfect Gate 不得 completed=true。

════════════════════════════════════════════════════════════════
A. 仓库 / 任务源 / 只读事实
════════════════════════════════════════════════════════════════
REPO=~/rongjian-portfolio
任务源（执行权威）：$REPO/GROK_GOAL_SUPER.md
补充细节：$REPO/GROK_GOAL.md  §三事实 §四叙事 §六双语架构
Manus 白名单：$REPO/docs/MANUS_KEEP.md
进度：$REPO/PROGRESS_GROK.md
事实只读（禁止编造）：
  ~/career-model/profile/facts.json
  ~/career-model/profile/portrait.md
  ~/Documents/career_narrative_unified_2026-03-22.md

开工：
  cd ~/rongjian-portfolio && git pull --rebase
  pnpm install
  通读 GROK_GOAL_SUPER.md 全文 + MANUS_KEEP.md + 当前 client/src 结构

════════════════════════════════════════════════════════════════
B. 北极星 = Perfect（必须同时成立）
════════════════════════════════════════════════════════════════
P0  事实：教育/经历/链接零红线（中英一致）
P1  双语：/en/* 与 /zh/* 全主路径完整；切换保留路径；localStorage；html lang
P2  叙事：主航道 AI 应用/数据系统/Agent；量化是证据；OPEN_TO=founding+remote，无空洞名企堆砌
P3  作品：≥4 项目卡有 demo|repo|诚实 private；QuantRadar + quant-analytics-framework 必在
P4  体验：移动菜单、无死链、无假 MESSAGE_SENT、无嵌套非法 Link、字体加载、暗色统一
P5  工程：pnpm check && pnpm build 绿；Manus 关键文件未删
P6  设计：Neo-Brutalism 辨识度；首屏 5 秒说清「谁/做什么/证据/联系」
P7  分：综合 P≥92 且 Perfect Gate 脚本/清单 100% PASS

════════════════════════════════════════════════════════════════
C. 反假收官（铁律 — 违反整轮作废）
════════════════════════════════════════════════════════════════
1. 禁止在 Phase Wave 未全部 done 时 completed=true
2. 禁止「差不多了」「时间够了」收官；只认 Perfect Gate
3. 每次声称阶段完成必须：pnpm check + pnpm build + 本 Wave 验收表勾选
4. 每次 push 前：git status 干净意图内；commit message 含 Wave ID
5. 禁止删除 MANUS_KEEP 清单内任何项
6. 禁止写入 SSOT 没有的学历/头衔/数字/URL
7. 禁止只做英文不做中文（或反过来）
8. 单写者：同时只改本仓库；不并行双 agent 写同一 tree（除非 isolation worktree 且不同文件）
9. 卡住同一 Wave ≥3 次失败 → 写 BLOCKER 到 PROGRESS，换最小修复路径，不跳 Wave 装完成
10. 最终 completed=true 前必须跑 §G Perfect Gate 并贴完整输出到 PROGRESS

════════════════════════════════════════════════════════════════
D. 马拉松主循环（无限直到 Perfect）
════════════════════════════════════════════════════════════════
LOOP:
  1. 读 PROGRESS 最近 5 行 + 本文 §E 找第一个 status≠done 的 Wave
  2. 执行该 Wave 的全部子任务（可在 Wave 内按子任务顺序连做多小时）
  3. 跑该 Wave 验收；FAIL → 修 → 再验，最多 5 次内循环
  4. PASS → PROGRESS 一行 + commit + git push origin main
  5. update_goal(message="WAVE-x PASS | P估计 | next=WAVE-y")
  6. 若全部 Wave done → 跑 §G Perfect Gate
       PASS → update_goal(completed=true, message=Perfect Gate 摘要)
       FAIL → 打开对应回归 Wave，继续 LOOP
  7. 用户不在也继续；只有 Perfect 或不可恢复 BLOCKER（密钥/无 SSOT）才停

════════════════════════════════════════════════════════════════
E. Wave 路线图（严格顺序；前面 PASS 才能标后面 done）
════════════════════════════════════════════════════════════════

### WAVE-0 · 基线与清单（≤30min）
- 记录当前 git sha、pnpm check/build 结果
- 对照 SSOT 列出「页面错误事实」清单 → docs/AUDIT_FACTS.md
- 确认 MANUS_KEEP 文件都在
验收：AUDIT_FACTS.md 存在且 ≥5 条具体错误行（文件:行或组件）

### WAVE-1 · 事实 SSOT 数据层
- 建 client/src/data/profile.ts（教育/经历/技能 id/链接 — 无长叙述）
- 建 client/src/data/projects.ts（titleKey、urls、status、tags）
- social.ts 仅 GitHub Alexaliao001 + email
- 删除/改掉错误 MS CS、Project Manager、WSP 主线、假社交
验收：
  rg -n "M\\.S\\. Computer Science|Project Manager|twitter.com/rongjian|linkedin.com/in/rongjian" client/src → 业务代码 0
  profile 与 facts.json 教育字段一致（人工 diff）

### WAVE-2 · 双语基础设施
- LocaleProvider（en|zh）+ localStorage + setLocale
- 路由：/en/* /zh/* ；/ 智能重定向（默认 en）
- Layout：EN|中 切换，路径语义映射
- locales/en|zh/common.ts
- document.documentElement.lang 同步
验收：
  App 注册全部 en/zh 路由；切换 about 不丢；pnpm check build 绿

### WAVE-3 · 全站双语内容（最大 Wave，可连做很久）
对 Home/About/Projects/Blog/BlogPost/NotFound/Contact：
- locales/en/* 与 locales/zh/* 完整叙述
- 页面只消费 profile + locale 模块，禁止硬编码长文
- Blog：同 slug 双正文；缺译不装有译
- Hero one-liner / OPEN_TO 对齐 founding+remote（中英各自本地化）
验收：
  每个主路由 en+zh 有实质段落（非 TODO）
  About 教育显示 ASU M.Eng + USF Water Resources 2018-2020
  经历无 WSP 主线；中建为给排水助理工程师

### WAVE-4 · 作品证据与转化
- ≥4 项目卡：QuantRadar、quant-analytics-framework、stock-skills(private 诚实)、+1 产品（Fortune 或 Moyu/Chills 以可访问 URL 为准）
- 每卡：职责一句 + 结果一句 + 链接
- Resume CTA：client/public/resume.pdf 若无则「Email for resume」不 404
- SEO：title/description 随语言；可选 hreflang
- mailto 主题随语言
验收：外链抽检；无 href="#" 假外链；Projects 中英齐全

### WAVE-5 · 设计系统与体验打磨
- 统一 token（已有 CSS 变量整理注释）
- 移动 375 导航走查清单 docs/QA_MOBILE.md
- focus-visible、对比度、字体 display=swap
- 404/空态与主站一致
- 减少「未使用的模板感」：主路径视觉层级 Hero→Proof→Projects→Contact
验收：QA_MOBILE.md 勾选；视觉不回归到浅色 404

### WAVE-6 · 工程、README、防回归
- README：dev/build/双语路由/Manus 注意
- scripts/perfect_gate.sh（或 .mjs）：自动检查 §G 可机器项
- .gitignore 含 dist、.manus-logs、.env*
- 确认 vite Manus 插件仍在
验收：bash scripts/perfect_gate.sh 退出码 0（实现后）

### WAVE-7 · Perfect Gate + 抛光
- 跑完整 §G
- 修所有 FAIL
- 最终 commit：chore(portfolio): perfect gate green
- push
- update_goal(completed=true) 仅当 §G 全 PASS
验收：§G 输出全部 PASS 粘贴进 PROGRESS

════════════════════════════════════════════════════════════════
F. 每 Wave 结束强制命令
════════════════════════════════════════════════════════════════
cd ~/rongjian-portfolio
pnpm check
pnpm build   # analytics env warning 可忽略
# 手动或脚本抽检关键 path（实现 perfect_gate 后必跑）
git add -A
git commit -m "wave(X): <一句话>"
git pull --rebase origin main
git push origin main
echo "YYYY-MM-DD | WAVE-X | done | <摘要> | P~?? | $(git rev-parse --short HEAD)" >> PROGRESS_GROK.md
git add PROGRESS_GROK.md && git commit -m "progress: WAVE-X" && git push

════════════════════════════════════════════════════════════════
G. Perfect Gate（收官唯一标准）
════════════════════════════════════════════════════════════════
机器项（scripts/perfect_gate.sh 应覆盖，没有则人工+命令）：
  [G1] pnpm check exit 0
  [G2] pnpm build exit 0
  [G3] rg 红线串在 client/src 业务代码为 0
  [G4] test -f docs/MANUS_KEEP.md && package.json 含 vite-plugin-manus-runtime
  [G5] test -f patches/wouter@3.7.1.patch
  [G6] App 或路由文件同时含 "/en" 与 "/zh"
  [G7] locales/en 与 locales/zh（或等价）存在且 about/home/projects 有内容
  [G8] profile.ts 或等价含 "M.Eng" 或 "Master of Engineering" 且不含独立 "M.S. Computer Science" 学位声称
  [G9] social 仅为 Alexaliao001 + outlook email

人工项（agent 必须自检并写 PROGRESS）：
  [G10] /en /zh /en/about /zh/about /en/projects /zh/projects /en/blog /zh/blog 逻辑存在
  [G11] 语言切换 about→about
  [G12] 移动菜单代码存在且非 placeholder MENU 文本-only
  [G13] 联系非假 success（mailto 或真 API）
  [G14] ≥4 项目证据
  [G15] 中英 OPEN_TO 无 xAI/Tesla/Nvidia 无脑列举（可写 ambitious AI teams）
  [G16] 综合 P 自估 ≥92

全部 G1–G16 PASS → 才允许 completed=true。

════════════════════════════════════════════════════════════════
H. 文案红线速查（中英都禁）
════════════════════════════════════════════════════════════════
- ASU = M.Eng. MECT/Computing，With Distinction，GPA 4.0 课程口径；禁止 M.S. CS 第二学位
- USF = M.S. Civil Engineering Water Resources 2018-2020 GPA 3.75
- 中建西南 = 给排水助理工程师 2021.07-2022.04；禁止项目经理
- WSP 不进主时间线
- GitHub 仅 github.com/Alexaliao001
- 不编造用户量/融资/星标

════════════════════════════════════════════════════════════════
I. 设计与产品感觉（Perfect 的「观感」）
════════════════════════════════════════════════════════════════
- 保留 Neo-Brutalism 暗色 + 电蓝 + 信号绿 + 等宽标题
- 首屏：姓名/头衔 one-liner / 3 proof chips / 双 CTA（Projects + Contact）
- 项目卡：问题→你的系统→证据链接
- 中文像「叙事底稿」；英文像「能扫的 eng portfolio」
- 不要做成加密土狗站或荐股站

════════════════════════════════════════════════════════════════
J. 时间与精力策略（数小时）
════════════════════════════════════════════════════════════════
- WAVE-0..1：快（事实）
- WAVE-2：中（路由 i18n）
- WAVE-3：最长（双语文案，可拆 commit 但同一 Wave 内连续做完）
- WAVE-4..5：中
- WAVE-6..7：收官
若上下文将满：先 commit push 当前 Wave 进度，PROGRESS 写 CONTINUES，新会话只读 SUPER 从下一 Wave 接着干。
禁止新会话从 WAVE-0 重做已 done 项。

════════════════════════════════════════════════════════════════
K. 完成句式（仅 Perfect 后）
════════════════════════════════════════════════════════════════
update_goal(completed=true, message="Portfolio Perfect: bilingual /en/zh, SSOT facts, Manus kept, gate G1-G16 PASS, sha=...")

现在开始执行 WAVE-0，然后按主循环推进直到 Perfect。
```

---

## 1. 为何需要 SUPER

普通 goal 适合「每轮一项」。  
你要的是：**丢给 Grok Build 跑很多小时 → 回来直接 Perfect**。  
因此本文把多项 Wave 串成**强制主循环**，并用 **Perfect Gate** 锁死假收官（对齐你在 stock-agent goal 上吃过的假 completed 教训）。

---

## 2. Perfect 定义（产品语言）

| 维度 | Perfect 样子 |
|------|----------------|
| 信任 | 学历经历与 SSOT 一致，经得起背调 |
| 双语 | 中英都是完整站，不是半吊子 |
| 转化 | 90 秒想点项目或发邮件 |
| 证据 | 链接真、private 诚实 |
| 工程 | build 绿、Manus 能发 |
| 设计 | 有记忆点，不像默认模板 |

综合分 **P≥92**（比日常 goal 的 90 更严）。

---

## 3. Wave 状态表（agent 维护）

在 `PROGRESS_GROK.md` 维护：

```text
WAVE-0: todo|doing|done
WAVE-1: ...
...
WAVE-7: ...
GATE: pending|PASS
```

---

## 4. 推荐实现清单（避免 agent 迷路）

### 4.1 目录目标态

```
client/src/
  i18n/locale.tsx
  i18n/paths.ts
  locales/en/{common,home,about,projects,blog,notFound}.ts
  locales/zh/{common,home,about,projects,blog,notFound}.ts
  data/{profile,projects,social,blog}.ts
  pages/*  (薄，只编排)
  components/Layout.tsx  (含语言切换)
```

### 4.2 路由表（必须全部注册，Manus 用）

```
/ → redirect
/en /en/about /en/projects /en/blog /en/blog/:slug
/zh /zh/about /zh/projects /zh/blog /zh/blog/:slug
```

### 4.3 perfect_gate.sh 最小实现要求

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
pnpm check
pnpm build
rg -n 'M\.S\. Computer Science|twitter\.com/rongjian|linkedin\.com/in/rongjian' client/src && exit 1 || true
grep -q 'vite-plugin-manus-runtime' package.json
test -f patches/wouter@3.7.1.patch
# 路由与 locale 存在性检查...
echo "PERFECT_GATE_MACHINE_OK"
```

---

## 5. 与 `GROK_GOAL.md` 关系

| 文件 | 用途 |
|------|------|
| `GROK_GOAL_SUPER.md` | **数小时连跑 / Perfect 收官**（本文件） |
| `GROK_GOAL.md` | 日常逐项、细节铁律、受众与红线展开 |
| `docs/MANUS_KEEP.md` | 发布红线 |

冲突：**SUPER 的 Wave 顺序与 Gate 优先**。

---

## 6. 用户侧（你回来后）

1. 看 `PROGRESS_GROK.md` 是否 `GATE: PASS`  
2. `git log --oneline -20`  
3. Manus 同步 Publish  
4. 手机打开 `/zh` 与 `/en` 点一遍  

若 GATE 未 PASS：把 PROGRESS 最后 20 行 + gate 输出再贴回 CLI：`继续 SUPER，从第一个未 done Wave 修到 Gate PASS`。

---

*SUPER marathon goal · 2026-07-10 · for Grok Build CLI long runs*
