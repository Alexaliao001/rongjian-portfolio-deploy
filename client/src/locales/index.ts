import type { Locale } from "@/i18n/paths";
import { commonEn } from "./en/common";
import { homeEn } from "./en/home";
import { aboutEn } from "./en/about";
import { projectsEn } from "./en/projects";
import { blogEn } from "./en/blog";
import { notFoundEn } from "./en/notFound";
import { commonZh } from "./zh/common";
import { homeZh } from "./zh/home";
import { aboutZh } from "./zh/about";
import { projectsZh } from "./zh/projects";
import { blogZh } from "./zh/blog";
import { notFoundZh } from "./zh/notFound";

const dictionaries = {
  en: {
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    projects: projectsEn,
    blog: blogEn,
    notFound: notFoundEn,
  },
  zh: {
    common: commonZh,
    home: homeZh,
    about: aboutZh,
    projects: projectsZh,
    blog: blogZh,
    notFound: notFoundZh,
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
