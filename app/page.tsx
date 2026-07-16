import type { Metadata } from "next";
import { SitePage } from "@/components/SitePage";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "CREATIVE BRAND INTERACTIVE — 創意廣告及互動媒體",
  description: siteContent["zh-hk"].home.intro,
  alternates: {
    canonical: "/",
    languages: { en: "/en", "zh-Hant": "/", "zh-Hans": "/zh-cn" },
  },
  openGraph: {
    title: "CREATIVE BRAND INTERACTIVE — 創意廣告及互動媒體",
    description: siteContent["zh-hk"].home.intro,
    url: siteConfig.siteUrl,
  },
};

export default function Home() {
  return <SitePage locale="zh-hk" page="home" />;
}
