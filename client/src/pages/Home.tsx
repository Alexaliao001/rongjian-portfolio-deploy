import { lazy, Suspense, useState } from "react";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import { BLOG_POSTS } from "@/data/blog";
import { FEATURED_IDS, PROJECTS, type ProjectStatus } from "@/data/projects";
import { ArrowUpRight, Terminal } from "lucide-react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { SOCIAL, mailto } from "@/data/social";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import ProjectDrawer, {
  type ProjectDrawerModel,
} from "@/components/flash/ProjectDrawer";

const SignalPanel = lazy(() => import("@/components/flash/SignalPanel"));

function ProjectCard({
  title,
  blurb,
  tags,
  statusLabel,
  onOpen,
  hasLink,
}: {
  title: string;
  blurb: string;
  tags: string[];
  statusLabel: string;
  onOpen: () => void;
  hasLink: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block h-full w-full text-left"
    >
      <div
        className={cn(
          "tech-border tech-card p-6 md:p-8 bg-card/50 transition-colors h-full flex flex-col",
          "group-hover:bg-card"
        )}
      >
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="text-xl font-bold font-mono flex items-center gap-2 group-hover:text-primary transition-colors">
            {title}
            {hasLink && (
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            )}
          </h3>
          <span className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground border border-border shrink-0">
            {statusLabel}
          </span>
        </div>
        <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
          {blurb}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 transition-colors group-hover:bg-primary/15"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  const { locale, href } = useLocale();
  const dict = getDictionary(locale);
  const t = dict.home;
  const common = dict.common;
  const projectsT = dict.projects;
  const reduce = useReducedMotion();

  useDocumentMeta(t.metaTitle, t.metaDescription);

  const latestLogs = BLOG_POSTS.slice(0, 2);
  const featured = FEATURED_IDS.map(
    id => PROJECTS.find(p => p.id === id)!
  ).filter(Boolean);

  const statusLabel = (s: ProjectStatus) => common.status[s];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState<ProjectDrawerModel | null>(null);

  const openProject = (id: string) => {
    const fact = PROJECTS.find(p => p.id === id);
    if (!fact) return;
    const copy = projectsT.items[id as keyof typeof projectsT.items];
    setActive({
      fact,
      title: copy.title,
      blurb: copy.blurb,
      role: copy.role,
      details: copy.details,
    });
    setDrawerOpen(true);
  };

  return (
    <Layout>
      <Hero />

      <section className="container pb-8">
        <Reveal>
          <Suspense
            fallback={
              <div className="tech-border h-[220px] bg-card/40 animate-pulse" />
            }
          >
            <SignalPanel locale={locale} />
          </Suspense>
        </Reveal>
      </section>

      <section className="container py-20 border-t border-border/40">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-2xl font-bold font-mono mb-2 flex items-center gap-2">
                <span className="section-index">{t.featured.index}</span>
                {t.featured.title}
              </h2>
              <p className="text-muted-foreground max-w-md">
                {t.featured.subtitle}
              </p>
            </div>
            <Link
              href={href("/projects")}
              className="font-mono text-sm text-primary hover:underline decoration-1 underline-offset-4 inline-flex items-center gap-1 group"
            >
              {t.featured.viewAll}{" "}
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map(p => {
            const copy = projectsT.items[p.id as keyof typeof projectsT.items];
            return (
              <StaggerItem key={p.id}>
                <ProjectCard
                  title={copy.title}
                  blurb={copy.blurb}
                  tags={[...p.tags]}
                  statusLabel={statusLabel(p.status)}
                  onOpen={() => openProject(p.id)}
                  hasLink={Boolean(p.demoUrl || p.repoUrl)}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="container py-20 border-t border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal>
            <h2 className="text-2xl font-bold font-mono mb-6 flex items-center gap-2">
              <span className="section-index">{t.logs.index}</span>
              {t.logs.title}
            </h2>
            <div className="space-y-6">
              {latestLogs.map((post, i) => {
                const loc = post[locale];
                return (
                  <Reveal key={post.slug} delay={0.08 * i} y={12}>
                    <Link
                      href={href(`/blog/${post.slug}`)}
                      className="group block border-l-2 border-transparent hover:border-primary pl-0 hover:pl-3 transition-all duration-300"
                    >
                      <article>
                        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-2">
                          <span>{post.date}</span>
                          <span className="w-px h-3 bg-border" />
                          <span>{loc.category}</span>
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2">
                          {loc.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {loc.desc}
                        </p>
                      </article>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div
              className="bg-muted/10 p-8 border border-border relative overflow-hidden tech-border"
              whileHover={
                reduce ? undefined : { borderColor: "rgba(59,130,246,0.45)" }
              }
            >
              <motion.div
                className="absolute top-0 right-0 p-4 opacity-15"
                animate={
                  reduce
                    ? undefined
                    : { rotate: [0, 4, -3, 0], opacity: [0.12, 0.22, 0.12] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Terminal className="w-24 h-24" />
              </motion.div>
              <h2 className="text-2xl font-bold font-mono mb-4 relative">
                {t.openTo.title}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed relative">
                {t.openTo.body}
              </p>
              <p className="text-muted-foreground mb-6 text-sm relative">
                {t.openTo.body2}
              </p>
              <div className="flex flex-col gap-3 relative">
                <Button
                  asChild
                  className="w-full font-mono rounded-none btn-press hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)]"
                >
                  <Link href={href("/about")}>{t.openTo.cta}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-mono rounded-none btn-press"
                >
                  <a
                    href={mailto(
                      locale === "zh"
                        ? "简历索取 / 合作咨询"
                        : "Resume request / collaboration"
                    )}
                  >
                    {common.cta.resumeEmail}
                  </a>
                </Button>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground mt-4 relative">
                {SOCIAL.email}
              </p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <ProjectDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        project={active}
      />
    </Layout>
  );
}
