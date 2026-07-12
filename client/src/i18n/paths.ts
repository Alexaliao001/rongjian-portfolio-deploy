export type Locale = "en" | "zh";

export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "portfolio_locale";

/** Paths without locale prefix (always start with / or empty for home). */
export type AppPath =
  | "/"
  | "/about"
  | "/projects"
  | "/blog"
  | `/blog/${string}`;

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "zh";
}

/**
 * Join locale prefix with an app path.
 * withLocale("en", "/") => "/en"
 * withLocale("zh", "/about") => "/zh/about"
 */
export function withLocale(locale: Locale, path: string): string {
  const normalized =
    !path || path === "/"
      ? ""
      : path.startsWith("/")
        ? path
        : `/${path}`;
  return `/${locale}${normalized}`;
}

/**
 * Parse "/en/about" → { locale: "en", path: "/about" }
 * Parse "/foo" without locale → { locale: null, path: "/foo" }
 */
export function stripLocale(pathname: string): {
  locale: Locale | null;
  path: string;
} {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) {
    return { locale: null, path: "/" };
  }
  const head = parts[0];
  if (isLocale(head)) {
    const rest = parts.slice(1);
    return {
      locale: head,
      path: rest.length === 0 ? "/" : `/${rest.join("/")}`,
    };
  }
  return { locale: null, path: clean === "" ? "/" : clean };
}

/** Swap locale keeping the same logical path. */
export function switchLocalePath(
  pathname: string,
  nextLocale: Locale
): string {
  const { path } = stripLocale(pathname);
  return withLocale(nextLocale, path);
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("zh")) return "zh";
  return "en";
}

export function readStoredLocale(): Locale | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(v) ? v : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

/**
 * Locale for catch-all 404: prefer path prefix so /zh/* unknown routes
 * stay Chinese and do not clobber stored preference to en.
 */
export function resolveNotFoundLocale(pathname: string): Locale {
  const { locale } = stripLocale(pathname);
  if (locale) return locale;
  return readStoredLocale() ?? detectBrowserLocale() ?? DEFAULT_LOCALE;
}
