import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2efe8",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "CREATIVE BRAND INTERACTIVE",
    template: "%s | CREATIVE BRAND INTERACTIVE",
  },
  description:
    "Creative advertising, digital media production and media placement, supported by practical creative technology and related technical services.",
  applicationName: "CREATIVE BRAND INTERACTIVE",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "CREATIVE BRAND INTERACTIVE",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CREATIVE BRAND INTERACTIVE — Creative Advertising & Interactive Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
