import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2efe8",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const metadataBase = host
    ? new URL(`${protocol}://${host}`)
    : new URL(siteConfig.siteUrl);

  return {
    metadataBase,
    title: { default: "MEDIA CRAFT", template: "%s | MEDIA CRAFT" },
    description:
      "Creative advertising and digital media production, supported by practical creative technology and related technical services.",
    applicationName: "MEDIA CRAFT",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      siteName: "MEDIA CRAFT",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "MEDIA CRAFT — Creative Advertising & Digital Media",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
