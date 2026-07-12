import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SOCIAL, mailto } from "@/data/social";
import { PROFILE } from "@/data/profile";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useState } from "react";
import { Send, CheckCircle2, Mail } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { motion } from "framer-motion";

const ContactForm = () => {
  const { locale } = useLocale();
  const f = getDictionary(locale).about.form;
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      setError(f.errorFill);
      return;
    }
    const subject =
      locale === "zh"
        ? `作品集联系 — ${name}`
        : `Portfolio contact from ${name}`;
    const url = mailto(subject, `From: ${name} <${email}>\n\n${message}`);
    window.location.href = url;
    setStatus("ready");
    e.currentTarget.reset();
  };

  if (status === "ready") {
    return (
      <div className="bg-card border border-primary/20 p-8 text-center flex flex-col items-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold font-mono mb-2">{f.draftOpened}</h3>
        <p className="text-muted-foreground mb-6">
          {f.draftHint}{" "}
          <a
            href={`mailto:${SOCIAL.email}`}
            className="text-primary hover:underline"
          >
            {SOCIAL.email}
          </a>
          .
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="font-mono"
        >
          {f.another}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-mono text-muted-foreground">
            {f.name}
          </label>
          <Input
            id="name"
            name="name"
            placeholder={f.namePh}
            required
            autoComplete="name"
            className="bg-background border-input font-sans"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-mono text-muted-foreground">
            {f.email}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={f.emailPh}
            required
            autoComplete="email"
            className="bg-background border-input font-sans"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono text-muted-foreground">
          {f.message}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={f.messagePh}
          required
          className="min-h-[120px] bg-background border-input font-sans resize-none"
        />
      </div>
      {error && (
        <p className="text-sm text-destructive font-mono" role="alert">
          {error}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" className="w-full sm:w-auto font-mono gap-2">
          {f.submit}
          <Send className="w-4 h-4" />
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto font-mono gap-2">
          <a href={`mailto:${SOCIAL.email}`}>
            <Mail className="w-4 h-4" />
            {SOCIAL.email}
          </a>
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground font-mono pt-2">{f.note}</p>
    </form>
  );
};

export default function About() {
  const { locale } = useLocale();
  const t = getDictionary(locale).about;
  useDocumentMeta(t.metaTitle, t.metaDescription);

  return (
    <Layout>
      <section className="container py-12 md:py-20">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-8 flex items-center gap-4">
              <span className="text-primary">/</span> {t.title}
            </h1>
          </Reveal>

          <Reveal delay={0.06} className="max-w-none mb-16 space-y-6">
            <p className="text-xl text-foreground leading-relaxed">
              {t.lead}{" "}
              <span className="text-primary font-bold">{t.leadEm}</span>
              {t.leadEnd}
            </p>
            <p className="text-muted-foreground leading-relaxed">{t.p1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.p2}</p>
            <p className="text-muted-foreground leading-relaxed">
              {t.focusLabel}{" "}
              {t.focus.map((item, i) => (
                <strong key={item} className="text-foreground font-semibold">
                  {item}
                  {i < t.focus.length - 1 ? " · " : ""}
                </strong>
              ))}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <Reveal>
              <h2 className="text-2xl font-bold font-mono mb-6 flex items-center gap-2">
                <span className="section-index">01</span>
                {t.stackTitle}
              </h2>
              <Stagger fast className="flex flex-wrap gap-2">
                {PROFILE.skills.map(skill => (
                  <StaggerItem key={skill}>
                    <motion.div whileHover={{ y: -2, scale: 1.03 }}>
                      <Badge
                        variant="secondary"
                        className="font-mono rounded-none px-3 py-1 cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-2xl font-bold font-mono mb-6 flex items-center gap-2">
                <span className="section-index">02</span>
                {t.eduTitle}
              </h2>
              <div className="space-y-4">
                {PROFILE.education.map((edu, idx) => (
                  <div key={edu.id}>
                    {idx > 0 && <Separator className="bg-border/50 mb-4" />}
                    <div className="flex justify-between items-baseline mb-1 gap-2">
                      <h3 className="font-bold">
                        {locale === "zh" ? edu.schoolZh : edu.school}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree} · {edu.officialTitle}
                      {edu.honor ? ` · ${edu.honor}` : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {locale === "zh" ? edu.trackZh : edu.track}
                      {edu.gpaLabel
                        ? ` · GPA ${edu.gpaLabel} (${edu.gpaNote})`
                        : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale === "zh" ? edu.focusZh : edu.focusEn}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <h2 className="text-2xl font-bold font-mono mb-8 flex items-center gap-2">
              <span className="section-index">03</span>
              {t.expTitle}
            </h2>
            <div className="pl-2">
              {PROFILE.experience.map((exp, i) => (
                <Reveal
                  key={exp.id}
                  delay={0.06 * i}
                  className="relative pl-8 pb-12 border-l border-border last:pb-0"
                >
                  <motion.div
                    className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 bg-background border border-primary rounded-full"
                    whileInView={{ scale: [0.6, 1.15, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold font-mono text-foreground">
                      {locale === "zh" ? exp.roleZh : exp.roleEn}
                    </h3>
                    <span className="hidden sm:inline text-muted-foreground">@</span>
                    <span className="text-primary font-medium">
                      {locale === "zh" ? exp.companyZh : exp.companyEn}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 inline-block mb-4">
                    {exp.period}
                  </span>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {exp.id === "indie" ? t.expDesc.indie : t.expDesc.cswadi}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Separator className="my-16 bg-border/40" />

          <Reveal>
          <div id="contact" className="scroll-mt-24">
            <h2 className="text-2xl font-bold font-mono mb-8 flex items-center gap-2">
              <span className="section-index !border-primary !text-primary !bg-primary/20">
                04
              </span>
              {t.contactTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t.contactIntro}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold font-mono text-foreground mb-1">
                      {t.emailLabel}
                    </h3>
                    <a
                      href={`mailto:${SOCIAL.email}`}
                      className="text-primary hover:underline"
                    >
                      {SOCIAL.email}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-mono text-foreground mb-1">
                      {t.socialLabel}
                    </h3>
                    <a
                      href={SOCIAL.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t.githubLabel}
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-muted/5 border border-border p-6 md:p-8 tech-border">
                <ContactForm />
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
