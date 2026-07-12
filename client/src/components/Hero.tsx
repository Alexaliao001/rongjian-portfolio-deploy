import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./ui/button";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import { PROFILE } from "@/data/profile";
import { staggerContainer } from "@/components/motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { locale, href } = useLocale();
  const t = getDictionary(locale).home;
  const name = locale === "zh" ? PROFILE.name.zh : PROFILE.name.en;
  const reduce = useReducedMotion();

  const container = reduce
    ? undefined
    : { ...staggerContainer, show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } } };

  const item = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeOut },
        },
      };

  return (
    <section className="container py-16 md:py-28 relative">
      <motion.div
        className="flex flex-col gap-8 max-w-3xl"
        variants={container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        <motion.div
          variants={item}
          className="flex items-center gap-2 text-primary font-mono text-sm tracking-wider"
        >
          <span className="signal-dot" />
          <span className="cursor-blink">{t.hero.status}</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
        >
          {t.hero.line1a}{" "}
          <span className="text-muted-foreground line-through decoration-primary decoration-2">
            {t.hero.line1strike}
          </span>{" "}
          <br />
          <span className="text-primary inline-block">
            {reduce ? (
              t.hero.line2a
            ) : (
              <motion.span
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.35, duration: 0.6, ease: easeOut }}
              >
                {t.hero.line2a}
              </motion.span>
            )}
          </span>{" "}
          {t.hero.line2b} <br />
          {t.hero.line3}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          {t.hero.introBefore}{" "}
          <span className="text-foreground font-semibold">{name}</span>{" "}
          {t.hero.introAfter}{" "}
          {t.hero.chips.map(chip => (
            <span
              key={chip}
              className="text-foreground font-mono text-sm mx-1 bg-muted px-1 py-0.5 rounded inline-block transition-colors hover:bg-primary/20 hover:text-primary"
            >
              {chip}
            </span>
          ))}{" "}
          {t.hero.introEnd}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-2">
          {t.proof.chips.map((chip, i) => (
            <motion.span
              key={chip}
              className="text-xs font-mono border border-primary/40 text-primary px-3 py-1 hover:bg-primary/10 transition-colors"
              whileHover={reduce ? undefined : { scale: 1.04, y: -1 }}
              transition={{ delay: i * 0.05 }}
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="text-sm font-mono text-muted-foreground"
        >
          {locale === "zh" ? PROFILE.titles.zh : PROFILE.titles.en}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
          <Button
            asChild
            size="lg"
            className="font-mono gap-2 rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all btn-press shadow-[0_0_0_0_rgba(59,130,246,0)] hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.55)]"
          >
            <Link href={href("/projects")}>
              <Terminal className="w-4 h-4" />
              {t.hero.ctaProjects}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-mono gap-2 rounded-none border-border hover:border-foreground transition-all btn-press group/btn"
          >
            <Link href={href("/about")}>
              {t.hero.ctaAbout}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {!reduce && (
        <motion.div
          className="absolute right-0 top-1/3 w-72 h-72 bg-primary/10 blur-[100px] -z-10 pointer-events-none"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </section>
  );
}
