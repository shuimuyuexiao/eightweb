export const locales = ["zh-hk", "en", "zh-cn"] as const;
export type Locale = (typeof locales)[number];

export const pageKeys = [
  "home",
  "about",
  "services",
  "capabilities",
  "contact",
  "privacy",
  "terms",
] as const;
export type PageKey = (typeof pageKeys)[number];

export const siteConfig = {
  name: "CREATIVE BRAND INTERACTIVE LIMITED",
  shortName: "CREATIVE BRAND INTERACTIVE",
  email: "contact@creativebrandinteractive.com",
  address: process.env.NEXT_PUBLIC_REGISTERED_OFFICE?.trim() ?? "",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.creativebrandinteractive.com",
} as const;

const localePrefix: Record<Locale, string> = {
  en: "/en",
  "zh-hk": "",
  "zh-cn": "/zh-cn",
};

export function pagePath(locale: Locale, page: PageKey) {
  const prefix = localePrefix[locale];
  return page === "home" ? prefix || "/" : `${prefix}/${page}`;
}

export function parseSlug(slug: string[] = []): {
  locale: Locale;
  page: PageKey;
} | null {
  let locale: Locale = "zh-hk";
  let pagePart = slug[0];

  if (pagePart === "en" || pagePart === "zh-hk" || pagePart === "zh-cn") {
    locale = pagePart;
    pagePart = slug[1];
    if (slug.length > 2) return null;
  } else if (slug.length > 1) {
    return null;
  }

  const page = (pagePart ?? "home") as PageKey;
  return pageKeys.includes(page) ? { locale, page } : null;
}
