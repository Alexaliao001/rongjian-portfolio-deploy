import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Switch, useLocation } from "wouter";
import type { ComponentType } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./i18n/locale";
import {
  type Locale,
  DEFAULT_LOCALE,
  detectBrowserLocale,
  readStoredLocale,
  resolveNotFoundLocale,
  withLocale,
} from "./i18n/paths";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";

function resolveInitialLocale(): Locale {
  return readStoredLocale() ?? detectBrowserLocale() ?? DEFAULT_LOCALE;
}

// wouter may pass params; pages ignore them
function withLoc(locale: Locale, Page: ComponentType<any>) {
  return function LocalizedPage(props: any) {
    return (
      <LocaleProvider locale={locale}>
        <Page {...props} />
      </LocaleProvider>
    );
  };
}

const EnHome = withLoc("en", Home);
const EnAbout = withLoc("en", About);
const EnProjects = withLoc("en", Projects);
const EnBlog = withLoc("en", Blog);
const EnBlogPost = withLoc("en", BlogPost);
const EnNotFound = withLoc("en", NotFound);

const ZhHome = withLoc("zh", Home);
const ZhAbout = withLoc("zh", About);
const ZhProjects = withLoc("zh", Projects);
const ZhBlog = withLoc("zh", Blog);
const ZhBlogPost = withLoc("zh", BlogPost);
const ZhNotFound = withLoc("zh", NotFound);

/**
 * Catch-all: derive locale from URL so /zh/nope uses zh 404 copy
 * and LocaleProvider does not force-write portfolio_locale=en.
 */
function LocaleAwareNotFound() {
  const [location] = useLocation();
  const locale = resolveNotFoundLocale(location);
  return (
    <LocaleProvider locale={locale}>
      <NotFound />
    </LocaleProvider>
  );
}

function RootRedirect() {
  return <Redirect to={withLocale(resolveInitialLocale(), "/")} />;
}

function LegacyRedirect({ path }: { path: string }) {
  return <Redirect to={withLocale(resolveInitialLocale(), path)} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={RootRedirect} />

      <Route path="/en" component={EnHome} />
      <Route path="/en/about" component={EnAbout} />
      <Route path="/en/projects" component={EnProjects} />
      <Route path="/en/blog/:slug" component={EnBlogPost} />
      <Route path="/en/blog" component={EnBlog} />

      <Route path="/zh" component={ZhHome} />
      <Route path="/zh/about" component={ZhAbout} />
      <Route path="/zh/projects" component={ZhProjects} />
      <Route path="/zh/blog/:slug" component={ZhBlogPost} />
      <Route path="/zh/blog" component={ZhBlog} />

      {/* Explicit locale 404s (also listed for Manus route discovery) */}
      <Route path="/en/*" component={EnNotFound} />
      <Route path="/zh/*" component={ZhNotFound} />

      <Route path="/about">
        {() => <LegacyRedirect path="/about" />}
      </Route>
      <Route path="/projects">
        {() => <LegacyRedirect path="/projects" />}
      </Route>
      <Route path="/blog/:slug">
        {(params: { slug?: string }) => (
          <LegacyRedirect path={`/blog/${params?.slug ?? ""}`} />
        )}
      </Route>
      <Route path="/blog">{() => <LegacyRedirect path="/blog" />}</Route>

      <Route component={LocaleAwareNotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
