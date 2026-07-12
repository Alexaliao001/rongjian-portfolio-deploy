import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SOCIAL } from "@/data/social";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import { PROFILE } from "@/data/profile";
import { PageEnter, SignalStrip } from "@/components/motion";
import CommandPalette from "@/components/flash/CommandPalette";

const AmbientBackdrop = lazy(() =>
  import("@/components/motion/Ambient").then(m => ({
    default: m.AmbientBackdrop,
  }))
);

const NAV_PATHS = [
  { path: "/", key: "home" as const },
  { path: "/about", key: "about" as const },
  { path: "/projects", key: "projects" as const },
  { path: "/blog", key: "blog" as const },
];

const NavLink = ({
  path,
  label,
  onNavigate,
}: {
  path: string;
  label: string;
  onNavigate?: () => void;
}) => {
  const [location] = useLocation();
  const { href } = useLocale();
  const to = href(path);
  const isActive =
    path === "/"
      ? location === to || location === `${to}/`
      : location === to || location.startsWith(`${to}/`);

  return (
    <Link
      href={to}
      onClick={onNavigate}
      className={cn(
        "font-mono text-sm px-4 py-2 transition-colors relative group block",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="nav-dot"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      )}
      {label}
      <span
        className={cn(
          "nav-underline w-full",
          isActive && "nav-underline-active"
        )}
      />
    </Link>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { locale, setLocale, href } = useLocale();
  const t = getDictionary(locale).common;
  const reduce = useReducedMotion();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      <Suspense fallback={null}>
        <AmbientBackdrop />
      </Suspense>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-md">
        <div className="container h-16 flex items-center justify-between gap-4">
          <Link
            href={href("/")}
            className="font-mono font-bold text-lg tracking-tighter hover:text-primary transition-colors shrink-0 group"
          >
            {t.brand}
            <span className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-[filter]">
              {t.brandDot}
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center space-x-1"
            aria-label="Main"
          >
            {NAV_PATHS.map(item => (
              <NavLink
                key={item.path}
                path={item.path}
                label={t.nav[item.key]}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <CommandPalette />

            <div
              className="relative flex items-center border border-border font-mono text-xs overflow-hidden"
              role="group"
              aria-label="Language"
            >
              {(["en", "zh"] as const).map(code => (
                <button
                  key={code}
                  type="button"
                  className={cn(
                    "relative z-10 px-2.5 py-1.5 transition-colors",
                    locale === code
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setLocale(code)}
                  aria-pressed={locale === code}
                >
                  {code === "en" ? t.langEn : t.langZh}
                  {locale === code && !reduce && (
                    <motion.span
                      layoutId="lang-pill"
                      className="absolute inset-0 -z-10 bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  {locale === code && reduce && (
                    <span className="absolute inset-0 -z-10 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="md:hidden font-mono text-xs text-muted-foreground hover:text-foreground border border-border px-3 py-2 inline-flex items-center gap-2 btn-press"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t.closeMenu : t.openMenu}
              onClick={() => setMenuOpen(open => !open)}
            >
              {menuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              {t.menu}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md overflow-hidden"
              aria-label="Mobile"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container py-4 flex flex-col gap-1">
                {NAV_PATHS.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <NavLink
                      path={item.path}
                      label={t.nav[item.key]}
                      onNavigate={() => setMenuOpen(false)}
                    />
                  </motion.div>
                ))}
                <button
                  type="button"
                  className="font-mono text-sm text-left px-4 py-2 text-muted-foreground hover:text-primary"
                  onClick={() => {
                    setMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("portfolio:open-cmdk"));
                  }}
                >
                  {t.commandPalette.openShort} · ⌘K
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        <SignalStrip />
      </header>

      <main className="flex-1 pt-[5.5rem] pb-16">
        <PageEnter key={location}>{children}</PageEnter>
      </main>

      <footer className="border-t border-border/40 py-8 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <div className="text-xs font-mono text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name.full}. {t.footer.rights}
          </div>
          <div className="flex items-center space-x-6">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]"
            >
              {t.footer.github}
            </a>
            <a
              href={`mailto:${SOCIAL.email}`}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]"
            >
              {t.footer.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
