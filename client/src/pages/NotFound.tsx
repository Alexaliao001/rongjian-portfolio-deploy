import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import Layout from "@/components/Layout";

export default function NotFound() {
  const { locale, href } = useLocale();
  const t = getDictionary(locale).notFound;

  return (
    <Layout>
      <div className="w-full flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg tech-border bg-card p-8 md:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-destructive" />
            </div>
          </div>

          <h1 className="text-4xl font-bold font-mono text-foreground mb-2">
            {t.title}
          </h1>
          <h2 className="text-xl font-semibold font-mono text-muted-foreground mb-4">
            {t.subtitle}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">{t.body}</p>

          <Button asChild className="font-mono rounded-none">
            <Link href={href("/")}>
              <Home className="w-4 h-4" />
              {t.cta}
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
