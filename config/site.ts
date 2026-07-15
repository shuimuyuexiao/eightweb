export const locales = ["en", "zh-hk", "zh-cn"] as const;
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
  name: "MEDIA CRAFT TECHNOLOGY LIMITED",
  shortName: "MEDIA CRAFT",
  email: "contact@mediacrafttech.com",
  address:
    "UNIT 01, 13/F, THE GOLD & SILVER COMMERCIAL BUILDING, NOS. 12–18 MERCER STREET, SHEUNG WAN, HONG KONG",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://mediacrafttech.com",
} as const;

const localePrefix: Record<Locale, string> = {
  en: "",
  "zh-hk": "/zh-hk",
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
  let locale: Locale = "en";
  let pagePart = slug[0];

  if (pagePart === "zh-hk" || pagePart === "zh-cn") {
    locale = pagePart;
    pagePart = slug[1];
    if (slug.length > 2) return null;
  } else if (slug.length > 1) {
    return null;
  }

  const page = (pagePart ?? "home") as PageKey;
  return pageKeys.includes(page) ? { locale, page } : null;
}
