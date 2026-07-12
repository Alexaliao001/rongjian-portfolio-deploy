import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import {
  isPublicRepo,
  type ProjectFact,
  type ProjectStatus,
} from "@/data/projects";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";

export type ProjectDrawerModel = {
  fact: ProjectFact;
  title: string;
  blurb: string;
  role: string;
  details: readonly string[];
};

export default function ProjectDrawer({
  open,
  onOpenChange,
  project,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDrawerModel | null;
}) {
  const { locale } = useLocale();
  const common = getDictionary(locale).common;
  const drawer = common.projectDrawer;

  if (!project) return null;

  const statusLabel = (s: ProjectStatus) => common.status[s];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md border-l border-border bg-card p-0 rounded-none gap-0"
      >
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary/30" />
        <SheetHeader className="p-6 border-b border-border text-left space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] px-2 py-0.5 border border-border text-muted-foreground">
              {statusLabel(project.fact.status)}
            </span>
            <span className="font-mono text-[10px] text-secondary">
              {project.role}
            </span>
          </div>
          <SheetTitle className="font-mono text-2xl text-primary">
            {project.title}
          </SheetTitle>
          <SheetDescription className="text-muted-foreground text-sm leading-relaxed">
            {project.blurb}
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div>
            <h3 className="font-mono text-xs text-primary mb-3 tracking-wider">
              {drawer.evidence}
            </h3>
            <ul className="space-y-3">
              {project.details.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="font-mono text-primary/80 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs text-primary mb-3 tracking-wider">
              {drawer.stack}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.fact.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="font-mono text-xs rounded-none"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mini architecture sketch */}
          <div className="border border-border p-4 bg-background/50 font-mono text-[10px] text-muted-foreground leading-relaxed">
            <div className="text-primary mb-2">{drawer.sketch}</div>
            <pre className="whitespace-pre overflow-x-auto">{`┌─────────┐   ┌─────────┐   ┌─────────┐
│  INPUT  │──▶│  GATES  │──▶│ OUTPUT  │
└─────────┘   └─────────┘   └─────────┘
     │              │             │
  data/api      rules/llm     ui/api`}</pre>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {project.fact.demoUrl && (
              <Button asChild className="rounded-none font-mono w-full">
                <a
                  href={project.fact.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  {drawer.demo}
                </a>
              </Button>
            )}
            {isPublicRepo(project.fact) && project.fact.repoUrl && (
              <Button
                asChild
                variant="outline"
                className="rounded-none font-mono w-full"
              >
                <a
                  href={project.fact.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                  {drawer.repo}
                </a>
              </Button>
            )}
            {!project.fact.demoUrl && !isPublicRepo(project.fact) && (
              <p className="text-xs font-mono text-muted-foreground">
                {drawer.privateNote}
              </p>
            )}
            {project.fact.demoUrl &&
              project.fact.repoUrl &&
              !isPublicRepo(project.fact) && (
                <p className="text-xs font-mono text-muted-foreground">
                  {drawer.privateNote}
                </p>
              )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
