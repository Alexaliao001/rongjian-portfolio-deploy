/**
 * Language-agnostic facts only (SSOT-aligned).
 * Narrative strings live in locales/en|zh.
 * Source: ~/career-model/profile/facts.json
 */

export const PROFILE = {
  name: {
    en: "Rongjian Liao",
    zh: "廖荣剑",
    full: "廖荣剑 / Rongjian Liao",
  },
  email: "liaorongjian@outlook.com",
  github: "https://github.com/Alexaliao001",
  githubHandle: "Alexaliao001",
  location: {
    current: "Chengdu",
    temporary: true,
    openTo: ["remote", "relocation_for_right_role"] as const,
  },
  titles: {
    en: "Full-stack AI Application & Data Systems Engineer",
    zh: "全栈 AI 应用与数据系统工程师",
  },
  education: [
    {
      id: "asu",
      school: "Arizona State University (ASU)",
      schoolZh: "亚利桑那州立大学 (ASU)",
      degree: "M.Eng.",
      officialTitle: "Master of Engineering, Engineering",
      track: "MECT online — Computing and Technology",
      trackZh: "计算与技术（MECT 在线轨道）",
      honor: "With Distinction",
      gpaLabel: "4.0/4.0",
      gpaNote: "graduate computing coursework GPA",
      period: "2023 – 2025",
      focusEn: "Cloud computing, distributed systems, statistical ML, AI applications",
      focusZh: "云计算、分布式系统、统计机器学习、AI 应用",
    },
    {
      id: "usf",
      school: "University of South Florida (USF)",
      schoolZh: "南佛罗里达大学 (USF)",
      degree: "M.S.",
      officialTitle: "Master of Science in Civil Engineering (Water Resources)",
      track: "Water Resources",
      trackZh: "水资源工程",
      honor: null as string | null,
      gpaLabel: "3.75/4.0",
      gpaNote: "program GPA",
      period: "2018 – 2020",
      focusEn: "Hydrologic modeling, hydrodynamics, quantitative simulation",
      focusZh: "水文模型、水动力学与定量仿真（建模路径，非施工现场）",
    },
  ],
  /** Primary timeline only — WSP intentionally omitted */
  experience: [
    {
      id: "indie",
      roleEn: "Independent Full-stack AI & Quant Systems Engineer",
      roleZh: "独立全栈 AI / 量化系统工程师",
      companyEn: "Self-employed",
      companyZh: "自由职业 / 个体",
      period: "2022.05 – Present",
    },
    {
      id: "cswadi",
      roleEn: "Assistant Engineer (Water Supply & Drainage)",
      roleZh: "给排水助理工程师",
      companyEn: "China Southwest Architectural Design and Research Institute",
      companyZh: "中国建筑西南勘察设计研究院",
      period: "2021.07 – 2022.04",
    },
  ],
  /** Public skill chips — honest strengths */
  skills: [
    "Python",
    "TypeScript",
    "React",
    "LLM / Agents",
    "Data pipelines",
    "AWS",
    "Docker",
    "SQL",
    "Bayesian calibration",
    "Prompt engineering",
  ] as const,
} as const;

export type EducationItem = (typeof PROFILE.education)[number];
export type ExperienceItem = (typeof PROFILE.experience)[number];
