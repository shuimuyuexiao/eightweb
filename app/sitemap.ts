import type { MetadataRoute } from "next";
import { locales, pageKeys, pagePath, siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    pageKeys.map((page) => {
      const path = pagePath(locale, page);
      return {
        url: `${siteConfig.siteUrl}${path === "/" ? "" : path}`,
        lastModified: now,
        changeFrequency: page === "home" ? "monthly" : "yearly",
        priority: page === "home" ? 1 : page === "contact" ? 0.8 : 0.7,
      } as const;
    }),
  );
}
