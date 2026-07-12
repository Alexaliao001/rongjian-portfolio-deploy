/**
 * Project facts (URLs, status, tags). Blurbs live in locales.
 *
 * Link policy (verified 2026-07-10 against GitHub API + live HTTP):
 * - demoUrl: must be anonymously reachable (200)
 * - repoUrl + repoPublic:true → public GitHub only (no visitor 404)
 * - private source repos documented in comments / repoUrl with repoPublic:false
 *   (not rendered as public GitHub buttons)
 *
 * Evidence:
 * - Fortune app: Alexaliao001/fortune-insight- (private), live https://fortunesite.one/
 * - Moyu: Alexaliao001/moyu-fortune (private), live https://chillworks.ai
 * - QuantRadar app: Alexaliao001/quantradar (private); public site: quantradar-site
 * - Grok sessions under ~/.grok/sessions/.../fortune-insight- used fortunesite.one
 */

export type ProjectStatus = "live" | "beta" | "private" | "open_source";

export type ProjectFact = {
  id: string;
  /** i18n key under projects.items[id] */
  demoUrl?: string;
  /** Canonical GitHub URL (may be private) */
  repoUrl?: string;
  /**
   * When false, do not render a public GitHub button (anonymous visitors get 404).
   * Default true when repoUrl is set.
   */
  repoPublic?: boolean;
  status: ProjectStatus;
  tags: string[];
  featured?: boolean;
};

export const PROJECTS: ProjectFact[] = [
  {
    id: "quantradar",
    demoUrl: "https://quantradar.one",
    // Full app: private https://github.com/Alexaliao001/quantradar
    // Public launch/marketing site (visitor-safe):
    repoUrl: "https://github.com/Alexaliao001/quantradar-site",
    repoPublic: true,
    status: "beta",
    tags: ["Next.js", "Python", "FastAPI", "Technical Analysis"],
    featured: true,
  },
  {
    id: "quant_framework",
    repoUrl: "https://github.com/Alexaliao001/quant-analytics-framework",
    repoPublic: true,
    status: "open_source",
    tags: ["Python", "Bayesian", "APIs", "153 tests"],
    featured: true,
  },
  {
    id: "stock_skills",
    // Private: https://github.com/Alexaliao001/stock-skills
    status: "private",
    tags: ["Claude MCP", "Agents", "Trading tools", "Production"],
    featured: true,
  },
  {
    id: "fortune_insight",
    demoUrl: "https://fortunesite.one/",
    // Manus app source (private). NOT Alexaliao001.github.io (that is a separate public pages repo).
    repoUrl: "https://github.com/Alexaliao001/fortune-insight-",
    repoPublic: false,
    status: "live",
    tags: ["Product", "AI UX", "Full-stack"],
    featured: true,
  },
  {
    id: "moyu",
    demoUrl: "https://chillworks.ai",
    // Private Manus H5 source
    repoUrl: "https://github.com/Alexaliao001/moyu-fortune",
    repoPublic: false,
    status: "live",
    tags: ["H5", "Product", "AI copy"],
  },
  {
    id: "gzh_pipeline",
    // Private: https://github.com/Alexaliao001/gzh-pipeline
    status: "private",
    tags: ["Content factory", "Agents", "Automation"],
  },
];

export const FEATURED_IDS = [
  "quantradar",
  "quant_framework",
  "stock_skills",
  "fortune_insight",
] as const;

export function getProject(id: string): ProjectFact | undefined {
  return PROJECTS.find(p => p.id === id);
}

/** Whether to show an external GitHub button for visitors */
export function isPublicRepo(p: ProjectFact): boolean {
  return Boolean(p.repoUrl && p.repoPublic !== false);
}
