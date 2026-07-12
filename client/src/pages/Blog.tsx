import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/data/blog";
import { Link } from "wouter";
import { useLocale } from "@/i18n/locale";
import { getDictionary } from "@/locales";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export default function Blog() {
  const { locale, href } = useLocale();
  const t = getDictionary(locale).blog;
  useDocumentMeta(t.metaTitle, t.metaDescription);

  return (
    <Layout>
      <section className="container py-12 md:py-20">
        <div className="max-w-3xl">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-8 flex items-center gap-4">
              <span className="text-primary">/</span> {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-16">{t.intro}</p>
          </Reveal>

          <Stagger className="flex flex-col">
            {BLOG_POSTS.map(post => {
              const loc = post[locale];
              return (
                <StaggerItem key={post.slug}>
                  <Link
                    href={href(`/blog/${post.slug}`)}
                    className="block group"
                  >
                    <div className="py-8 border-b border-border/50 group-hover:border-primary/50 transition-all duration-300 group-hover:bg-primary/[0.03] group-hover:px-3 -mx-0 group-hover:mx-[-0.75rem]">
                      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-2">
                        <span className="text-xs font-mono text-muted-foreground min-w-[100px]">
                          {post.date}
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold font-mono group-hover:text-primary transition-colors">
                          {loc.title}
                        </h2>
                      </div>
                      <div className="md:pl-[132px]">
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {loc.desc}
                        </p>
                        <Badge
                          variant="secondary"
                          className="font-mono text-[10px] rounded-none px-2"
                        >
                          {loc.category}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </Layout>
  );
}
