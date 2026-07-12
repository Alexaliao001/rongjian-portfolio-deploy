import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  FileText,
  FolderKanban,
  Github,
  Home,
  Languages,
  Mail,
  User,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useLocale } from "@/i18n/locale";
import { SOCIAL, mailto } from "@/data/social";
import { getDictionary } from "@/locales";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { locale, setLocale, href } = useLocale();
  const t = getDictionary(locale).common;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    const onCustom = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("portfolio:open-cmdk", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("portfolio:open-cmdk", onCustom);
    };
  }, []);

  const go = (path: string) => {
    setLocation(href(path));
    setOpen(false);
  };

  const cp = t.commandPalette;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] border border-border px-2 py-1.5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
        aria-label={cp.open}
      >
        <span>{cp.openShort}</span>
        <kbd className="border border-border px-1 text-[9px] opacity-70">
          ⌘K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={cp.title}
        description={cp.desc}
        className="rounded-none border-border bg-card font-mono sm:max-w-lg"
        showCloseButton={false}
      >
        <CommandInput
          placeholder={cp.placeholder}
          className="font-mono text-sm"
        />
        <CommandList className="max-h-[320px]">
          <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
            {cp.empty}
          </CommandEmpty>
          <CommandGroup heading={cp.nav}>
            <CommandItem onSelect={() => go("/")} className="rounded-none gap-2">
              <Home className="size-4" />
              {t.nav.home}
            </CommandItem>
            <CommandItem
              onSelect={() => go("/about")}
              className="rounded-none gap-2"
            >
              <User className="size-4" />
              {t.nav.about}
            </CommandItem>
            <CommandItem
              onSelect={() => go("/projects")}
              className="rounded-none gap-2"
            >
              <FolderKanban className="size-4" />
              {t.nav.projects}
            </CommandItem>
            <CommandItem
              onSelect={() => go("/blog")}
              className="rounded-none gap-2"
            >
              <FileText className="size-4" />
              {t.nav.blog}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={cp.actions}>
            <CommandItem
              onSelect={() => {
                window.location.href = mailto(
                  locale === "zh" ? "来自作品集" : "From portfolio"
                );
                setOpen(false);
              }}
              className="rounded-none gap-2"
            >
              <Mail className="size-4" />
              {cp.email}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                window.open(SOCIAL.github, "_blank", "noopener,noreferrer");
                setOpen(false);
              }}
              className="rounded-none gap-2"
            >
              <Github className="size-4" />
              {cp.github}
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setLocale(locale === "en" ? "zh" : "en");
                setOpen(false);
              }}
              className="rounded-none gap-2"
            >
              <Languages className="size-4" />
              {locale === "en" ? cp.toZh : cp.toEn}
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div className="border-t border-border px-3 py-2 text-[10px] text-muted-foreground font-mono">
          {cp.hint}
        </div>
      </CommandDialog>
    </>
  );
}
