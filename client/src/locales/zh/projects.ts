export const projectsZh = {
  metaTitle: "项目 — 廖荣剑",
  metaDescription:
    "QuantRadar、quant-analytics-framework、Agent skill 系统与已上线 AI 产品。",
  title: "项目",
  intro:
    "可检查结构的系统与产品——有 demo、仓库，或诚实标注的私有生产系统。点击卡片查看证据。",
  items: {
    quantradar: {
      title: "QuantRadar",
      blurb:
        "量化决策界面：自上而下门控（大盘 → 板块 → 个股），在形态与期权逻辑前先过滤上下文噪声。",
      role: "产品 + 全栈决策系统",
      details: [
        "门控：市场体制 → 板块强度 → 个股 setup。",
        "可检查信号的决策 UI，不是黑箱荐股。",
        "混合栈：Web 前端 + Python 扫描/统计。",
      ],
    },
    quant_framework: {
      title: "quant-analytics-framework",
      blurb:
        "面向生产的 Python 框架：多源 API 可靠性、贝叶斯信号校准、风险模块。公开仓库，含自动化测试。",
      role: "核心库作者 · 开源",
      details: [
        "多源 API：重试、降级与可靠性封装。",
        "贝叶斯/校准导向的信号工具。",
        "公开 153 项自动化测试作为诚实底线。",
      ],
    },
    stock_skills: {
      title: "stock-skills / 交易 Agent 栈",
      blurb:
        "私有生产级 skill 系统：技术分析、扫描与 Agent 工作流（MCP）。按日迭代的操作系统，不是演示页。",
      role: "架构 + Agent 编排 · 私有",
      details: [
        "MCP skill 图：分析、扫描与复盘闭环。",
        "按日迭代：交付 → 度量 → 收紧闸门。",
        "私有生产系统——架构本身即证据。",
      ],
    },
    fortune_insight: {
      title: "Fortune Insight",
      blurb:
        "面向用户的命理/疗愈向 AI 产品：塔罗、八字、星座、解梦等完整路径，支持会员与变现。线上 fortunesite.one。",
      role: "全栈产品构建",
      details: [
        "与线上产品一致：塔罗 / 八字 / 星座 / 解梦等能力。",
        "端到端负责体验、账号/会员链路与 Manus 部署。",
        "演示站 fortunesite.one · 源码私有仓 fortune-insight-。",
      ],
    },
    moyu: {
      title: "摸了么 MoYu",
      blurb:
        "每日摸鱼运势 H5：轻松玩法 + 文案 + 分享传播，线上 chillworks.ai。",
      role: "产品工程师",
      details: [
        "与线上标题一致：每日摸鱼/运势类 H5，强调可分享。",
        "已上线的产品实验，不是静态落地页。",
        "演示站 chillworks.ai · 源码私有仓 moyu-fortune。",
      ],
    },
    gzh_pipeline: {
      title: "gzh-pipeline",
      blurb:
        "私有自动化内容工厂：产业研究从选题到写作与合规链路。",
      role: "Agent 管线 · 私有",
      details: [
        "多阶段：选题 → 研究 → 写作 → 合规。",
        "面向稳定发稿的 Agent 编排。",
        "私有系统——重过程设计而非虚荣指标。",
      ],
    },
  },
} as const;
