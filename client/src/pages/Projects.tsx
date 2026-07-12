import { useState } from "react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PROJECTS,
  isPublicRepo,
  type ProjectStatus,
} from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Reveal, Stagger, StaggerItem, TechCard } from "@/components/motion";
import ProjectDrawer, {
  type ProjectDrawerModel,
} from "@/components/flash/ProjectDrawer";

export default function Projects() {
  const { locale } = useLocale();
  const dict = getDictionary(locale);
  const t = dict.projects;
  const common = dict.common;
  useDocumentMeta(t.metaTitle, t.metaDescription);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ProjectDrawerModel | null>(null);

  const statusLabel = (s: ProjectStatus) => common.status[s];

  const openProject = (id: string) => {
    const fact = PROJECTS.find(p => p.id === id);
    if (!fact) return;
    const copy = t.items[id as keyof typeof t.items];
    setActive({
      fact,
      title: copy.title,
      blurb: copy.blurb,
      role: copy.role,
      details: copy.details,
    });
    setOpen(true);
  };

  return (
    <Layout>
      <section className="container py-12 md:py-20">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-8 flex items-center gap-4">
              <span className="text-primary">/</span> {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-16 max-w-2xl">
              {t.intro}
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map(p => {
              const copy = t.items[p.id as keyof typeof t.items];
              const featured = p.featured;
              return (
                <StaggerItem
                  key={p.id}
                  className={featured ? "md:col-span-2" : ""}
                >
                  <TechCard className="bg-card p-6 md:p-8 flex flex-col h-full">
                    <button
                      type="button"
                      onClick={() => openProject(p.id)}
                      className="text-left flex flex-col flex-1 w-full group/card"
                    >
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-2xl font-bold font-mono text-primary group-hover/card:drop-shadow-[0_0_10px_rgba(59,130,246,0.35)] transition-[filter]">
                          {copy.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-1 border border-border text-muted-foreground shrink-0">
                          {statusLabel(p.status)}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-secondary mb-4">
                        {copy.role}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                        {copy.blurb}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="font-mono text-xs border-border text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="font-mono text-xs text-primary">
                        {common.cta.openDetails} →
                      </span>
                    </button>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-border/40">
                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${copy.title} demo`}
                          onClick={e => e.stopPropagation()}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-none hover:bg-primary/20 hover:text-primary"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {isPublicRepo(p) && p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${copy.title} repository`}
                          onClick={e => e.stopPropagation()}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-none hover:bg-primary/20 hover:text-primary"
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </TechCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ProjectDrawer open={open} onOpenChange={setOpen} project={active} />
    </Layout>
  );
}
