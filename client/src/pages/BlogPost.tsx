import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/data/blog";
import { ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import NotFound from "./NotFound";

export default function BlogPostPage() {
  const { locale, href } = useLocale();
  const common = getDictionary(locale).common;
  const [, paramsEn] = useRoute("/en/blog/:slug");
  const [, paramsZh] = useRoute("/zh/blog/:slug");
  const slug = paramsEn?.slug ?? paramsZh?.slug;
  const post = slug ? getPostBySlug(slug) : undefined;
  const loc = post ? post[locale] : null;

  useDocumentMeta(
    loc?.title ?? "Blog",
    loc?.desc ?? undefined
  );

  if (!post || !loc) {
    return <NotFound />;
  }

  return (
    <Layout>
      <article className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <Link
            href={href("/blog")}
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {common.cta.backToLogs}
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
            <time dateTime={post.date.replace(/\./g, "-")}>{post.date}</time>
            <span className="w-px h-3 bg-border" />
            <Badge
              variant="secondary"
              className="font-mono text-[10px] rounded-none px-2"
            >
              {loc.category}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-mono mb-6 leading-tight">
            {loc.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-12 leading-relaxed border-l-2 border-primary/40 pl-4">
            {loc.desc}
          </p>

          <div className="space-y-6 text-foreground/90 leading-relaxed">
            {loc.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border/40">
            <Button asChild variant="outline" className="font-mono rounded-none">
              <Link href={href("/blog")}>← {common.cta.allLogs}</Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}
