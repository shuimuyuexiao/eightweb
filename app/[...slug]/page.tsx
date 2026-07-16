import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/SitePage";
import { locales, pageKeys, pagePath, parseSlug, siteConfig } from "@/config/site";
import { siteContent } from "@/content/site-content";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const canonicalParams = locales.flatMap((locale) => {
    const prefix = locale === "zh-hk" ? [] : [locale];
    return pageKeys
      .filter((page) => !(locale === "zh-hk" && page === "home"))
      .map((page) => ({
        slug: page === "home" ? prefix : [...prefix, page],
      }));
  });

  const legacyTraditionalChineseParams = pageKeys.map((page) => ({
    slug: page === "home" ? ["zh-hk"] : ["zh-hk", page],
  }));

  return [...canonicalParams, ...legacyTraditionalChineseParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const content = siteContent[parsed.locale];
  const pageCopy = parsed.page === "home" ? content.home : content[parsed.page];
  const title = "title" in pageCopy ? pageCopy.title : content.nav[parsed.page];
  const description = "intro" in pageCopy ? pageCopy.intro : content.common.footerTagline;
  const canonical = pagePath(parsed.locale, parsed.page);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: pagePath("en", parsed.page),
        "zh-Hant": pagePath("zh-hk", parsed.page),
        "zh-Hans": pagePath("zh-cn", parsed.page),
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.siteUrl}${canonical === "/" ? "" : canonical}`,
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  return <SitePage locale={parsed.locale} page={parsed.page} />;
}
