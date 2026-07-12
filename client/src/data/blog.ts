export type LocalizedText = {
  title: string;
  desc: string;
  content: string[];
  category: string;
};

export type BlogPost = {
  slug: string;
  date: string;
  en: LocalizedText;
  zh: LocalizedText;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-classic-patterns",
    date: "2026.02.03",
    en: {
      category: "TRADING_SYSTEMS",
      title: "Why I Chose Classic Patterns Over Pure ML for Trading",
      desc: "Machine learning is powerful, but in low-signal environments, interpretability and engineering safety factors matter more than a black-box peak score.",
      content: [
        "Machine learning is powerful, but markets are adversarial and non-stationary. A model that fits last quarter can fail the moment the regime shifts.",
        "Civil and water-resources engineering taught me to design for failure modes, not just average-case performance. Safety factors, redundancy, and inspectable load paths matter.",
        "Classic patterns are imperfect, but interpretable. When a signal fires, I can answer which gate opened, which closed, and what would falsify the trade.",
        "That is why QuantRadar uses a top-down stack — Market → Sector → Stock — before pattern recognition runs.",
        "ML still has a place: feature screening, regime clustering, post-trade review. It is a tool inside constraints, not a replacement for judgment.",
      ],
    },
    zh: {
      category: "交易系统",
      title: "为什么交易系统我优先经典形态，而不是纯 ML",
      desc: "机器学习很强，但在低信噪比市场里，可解释性与工程安全系数，往往比黑箱峰值分数更重要。",
      content: [
        "机器学习很强，但市场是对抗且非平稳的。拟合上个季度的模型，可能在体制一切换就失效。",
        "给排水与水资源方向的训练让我更习惯为失效模式设计：安全系数、冗余、可检查的传力路径。",
        "经典形态不完美，但可解释。信号触发时我能回答：哪道门开了、哪道关了、什么会证伪这笔交易。",
        "所以 QuantRadar 用自上而下门控：大盘 → 板块 → 个股，再进入形态识别。",
        "ML 仍有位置：特征筛选、体制聚类、复盘。它是约束内的工具，不是判断的替代品。",
      ],
    },
  },
  {
    slug: "building-quantradar",
    date: "2026.01.15",
    en: {
      category: "BUILD_LOG",
      title: "Building QuantRadar: From First Principles",
      desc: "How a top-down gating stack filters most false signals before pattern recognition runs.",
      content: [
        "Most retail signals fail because context is wrong, not because the shape on the chart is wrong.",
        "Market regime first, sector relative strength second, stock pattern scoring last.",
        "Each gate can hard-stop a candidate. I would rather miss a trade than force a weak setup into options sizing.",
        "Stack: decision UI + Python scanners/stats + history for auditability.",
        "The hard part is honesty when data is late, incomplete, or regime-shifted.",
      ],
    },
    zh: {
      category: "构建日志",
      title: "构建 QuantRadar：从第一性原理出发",
      desc: "自上而下门控如何在形态识别前滤掉大量假信号。",
      content: [
        "多数零售信号失败，是因为上下文错了，不是因为图上形状错了。",
        "先市场体制，再板块相对强度，最后才是个股形态打分。",
        "每道门都可以硬停。我宁愿错过，也不把弱 setup 硬塞进期权仓位。",
        "实现：决策 UI + Python 扫描/统计 + 可审计历史。",
        "难点是数据延迟、缺失或体制切换时，管线仍保持诚实。",
      ],
    },
  },
  {
    slug: "llm-first-workflow",
    date: "2025.12.20",
    en: {
      category: "PRODUCTIVITY",
      title: "LLM-First Workflow: Generalizing Capability",
      desc: "How I use agents and tools to move from idea to verified implementation across domains.",
      content: [
        "LLMs multiply execution speed; they do not replace taste or responsibility.",
        "Workflow: capture intent → verifiable steps → tight feedback → write down what worked.",
        "Custom tools (MCP skills, chart helpers, local RAG) matter more than prompt poetry.",
        "Same agentic loop can ship a trading UI or debug a scaling controller — with human review on irreversible steps.",
        "If it cannot be checked, it does not ship.",
      ],
    },
    zh: {
      category: "生产力",
      title: "LLM 优先工作流：把能力一般化",
      desc: "如何用 Agent 与工具，在多领域把想法落到可验证实现。",
      content: [
        "LLM 放大执行速度，但不替代品味与责任。",
        "流程：抓住意图 → 可验证步骤 → 紧反馈 → 写下真正有效的路径。",
        "自定义工具（MCP skill、图表助手、本地 RAG）比堆形容词重要。",
        "同一套 agent 循环可以交付交易 UI，也可以排查扩缩容——不可逆步骤必须人审。",
        "无法检查的东西，不交付。",
      ],
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
