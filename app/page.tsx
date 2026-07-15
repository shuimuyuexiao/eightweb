import type { Metadata } from "next";
import { SitePage } from "@/components/SitePage";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "MEDIA CRAFT — Creative Advertising & Digital Media",
  description: siteContent.en.home.intro,
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-Hant": "/zh-hk", "zh-Hans": "/zh-cn" },
  },
  openGraph: {
    title: "MEDIA CRAFT — Creative Advertising & Digital Media",
    description: siteContent.en.home.intro,
    url: siteConfig.siteUrl,
  },
};

export default function Home() {
  return <SitePage locale="en" page="home" />;
}
