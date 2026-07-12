import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import {
  type Locale,
  DEFAULT_LOCALE,
  stripLocale,
  switchLocalePath,
  writeStoredLocale,
  withLocale,
} from "./paths";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Build a localized href for an app path like "/about" */
  href: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    writeStoredLocale(locale);
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      writeStoredLocale(next);
      const nextPath = switchLocalePath(
        typeof window !== "undefined" ? window.location.pathname : `/${locale}`,
        next
      );
      setLocation(nextPath);
    },
    [locale, setLocation]
  );

  const href = useCallback(
    (path: string) => withLocale(locale, path),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, href }),
    [locale, setLocale, href]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

/** Read locale from current location path (for route wrappers). */
export function usePathLocale(): Locale {
  const [location] = useLocation();
  const { locale } = stripLocale(location);
  return locale ?? DEFAULT_LOCALE;
}
