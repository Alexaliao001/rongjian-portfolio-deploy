export const projectsEn = {
  metaTitle: "Projects — Rongjian Liao",
  metaDescription:
    "QuantRadar, quant-analytics-framework, agent skill systems, and shipped AI products.",
  title: "PROJECTS",
  intro:
    "Systems and products with inspectable structure — demos, repos, or honest private production notes. Click a card for evidence.",
  items: {
    quantradar: {
      title: "QuantRadar",
      blurb:
        "Quantitative decision UI with top-down gating (Market → Sector → Stock). Filters context noise before pattern and options logic run.",
      role: "Product + full-stack decision system",
      details: [
        "Top-down gates: market regime → sector strength → stock setup.",
        "Decision UI for inspectable signals, not black-box tips.",
        "Hybrid stack: web frontend + Python scanners/stats.",
      ],
    },
    quant_framework: {
      title: "quant-analytics-framework",
      blurb:
        "Production-oriented Python framework: multi-source API reliability, Bayesian signal calibration, risk modules. Public repo with automated tests.",
      role: "Core library author · open source",
      details: [
        "Multi-source API reliability with retries and fallbacks.",
        "Bayesian / calibration-oriented signal utilities.",
        "Public suite: 153 automated tests as a honesty floor.",
      ],
    },
    stock_skills: {
      title: "stock-skills / trading agent stack",
      blurb:
        "Private production skill system for technical analysis, scans, and agent workflows (MCP). Iterated as a daily operating system — not a demo slide.",
      role: "Architecture + agent orchestration · private",
      details: [
        "MCP skill graph for analysis, scans, and review loops.",
        "Daily-ops iteration: ship, measure, tighten gates.",
        "Private production — architecture is the evidence.",
      ],
    },
    fortune_insight: {
      title: "Fortune Insight",
      blurb:
        "Consumer AI product for Tarot, BaZi, horoscope, and dream reading — full loop from onboarding to paid flows. Live at fortunesite.one.",
      role: "Full-stack product builder",
      details: [
        "Product surface matches live site: Tarot / BaZi / horoscope / dream reports.",
        "End-to-end ownership: UX, auth/membership paths, and Manus deploy.",
        "Demo: fortunesite.one · source: private repo fortune-insight-.",
      ],
    },
    moyu: {
      title: "摸了么 MoYu",
      blurb:
        "Daily slacking-fortune H5 (摸鱼运势) with playful copy and share loops — live at chillworks.ai.",
      role: "Product engineer",
      details: [
        "Matches live product title: daily 摸鱼/运势 H5, share-oriented UX.",
        "Shipped product experiment, not a static landing page.",
        "Demo: chillworks.ai · source: private repo moyu-fortune.",
      ],
    },
    gzh_pipeline: {
      title: "gzh-pipeline",
      blurb:
        "Private automated content factory for industry research publishing (scout → write → compliance paths).",
      role: "Agent pipeline · private",
      details: [
        "Multi-stage pipeline: scout → research → write → compliance.",
        "Agent orchestration for recurring publishing ops.",
        "Private system — process design over vanity metrics.",
      ],
    },
  },
} as const;
