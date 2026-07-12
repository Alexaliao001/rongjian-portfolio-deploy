import { describe, expect, it } from "vitest";
import {
  withLocale,
  stripLocale,
  switchLocalePath,
  isLocale,
  resolveNotFoundLocale,
} from "./paths";

describe("i18n paths (shipped helpers)", () => {
  it("withLocale joins prefix", () => {
    expect(withLocale("en", "/")).toBe("/en");
    expect(withLocale("zh", "/about")).toBe("/zh/about");
    expect(withLocale("en", "/blog/x")).toBe("/en/blog/x");
  });

  it("stripLocale parses locale and path", () => {
    expect(stripLocale("/en")).toEqual({ locale: "en", path: "/" });
    expect(stripLocale("/zh/about")).toEqual({ locale: "zh", path: "/about" });
    expect(stripLocale("/en/blog/foo")).toEqual({
      locale: "en",
      path: "/blog/foo",
    });
    expect(stripLocale("/projects")).toEqual({
      locale: null,
      path: "/projects",
    });
  });

  it("switchLocalePath preserves logical path", () => {
    expect(switchLocalePath("/en/about", "zh")).toBe("/zh/about");
    expect(switchLocalePath("/zh/blog/a", "en")).toBe("/en/blog/a");
  });

  it("isLocale", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("zh")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("resolveNotFoundLocale keeps zh for unknown /zh/* paths", () => {
    expect(resolveNotFoundLocale("/zh/nope")).toBe("zh");
    expect(resolveNotFoundLocale("/zh/missing/page")).toBe("zh");
    expect(resolveNotFoundLocale("/en/nope")).toBe("en");
    expect(resolveNotFoundLocale("/en/ghost")).toBe("en");
  });
});
