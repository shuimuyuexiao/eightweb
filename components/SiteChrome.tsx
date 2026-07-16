import Link from "next/link";
import { Locale, PageKey, pagePath, siteConfig } from "@/config/site";
import { SiteContent } from "@/content/site-content";

const primaryPages: PageKey[] = ["about", "services", "capabilities", "contact"];
const footerPages: PageKey[] = ["home", ...primaryPages];

export function Header({
  locale,
  page,
  content,
}: {
  locale: Locale;
  page: PageKey;
  content: SiteContent;
}) {
  const navItems = primaryPages.map((key) => ({
    key,
    label: content.nav[key],
    href: pagePath(locale, key),
  }));

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href={pagePath(locale, "home")}>
          <span className="wordmark-copy">
            <span>CREATIVE BRAND</span>
            <span>INTERACTIVE</span>
          </span>
          <span className="wordmark-dot" aria-hidden="true" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={page === item.key ? "is-active" : ""}
              aria-current={page === item.key ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="language-switch" aria-label="Language">
          <Link className={locale === "en" ? "is-active" : ""} href={pagePath("en", page)} lang="en">EN</Link>
          <span>/</span>
          <Link className={locale === "zh-hk" ? "is-active" : ""} href={pagePath("zh-hk", page)} lang="zh-Hant">繁</Link>
          <span>/</span>
          <Link className={locale === "zh-cn" ? "is-active" : ""} href={pagePath("zh-cn", page)} lang="zh-Hans">简</Link>
        </div>

        <details className="mobile-menu">
          <summary>{content.common.menu}</summary>
          <div className="mobile-menu-panel">
            <div className="mobile-menu-top">
              <span>{siteConfig.shortName}</span>
              <span className="mobile-close">{content.common.close}</span>
            </div>
            <nav aria-label="Mobile navigation">
              {["home", ...primaryPages].map((key) => {
                const pageKey = key as PageKey;
                return (
                  <Link key={key} href={pagePath(locale, pageKey)}>
                    <span>{content.nav[pageKey]}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mobile-languages">
              <Link href={pagePath("en", page)}>EN</Link>
              <Link href={pagePath("zh-hk", page)}>繁體中文</Link>
              <Link href={pagePath("zh-cn", page)}>简体中文</Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer({
  locale,
  content,
}: {
  locale: Locale;
  content: SiteContent;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="footer-wordmark">CREATIVE<br />BRAND<br /><span>INTERACTIVE.</span></p>
          <p className="footer-tagline">{content.common.footerTagline}</p>
        </div>
        <div className="footer-quick-links">
          <p className="meta-label">{content.common.quickLinksLabel}</p>
          <nav aria-label={content.common.quickLinksLabel}>
            {footerPages.map((page) => (
              <Link key={page} href={pagePath(locale, page)}>{content.nav[page]}</Link>
            ))}
          </nav>
        </div>
        <div className="footer-contact">
          <p className="meta-label">{content.common.emailLabel}</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        {siteConfig.address && (
          <div className="footer-address">
            <p className="meta-label">{content.common.addressLabel}</p>
            <address>{siteConfig.address}</address>
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.name}. {content.common.rights}</p>
        <nav aria-label={content.common.legalLabel}>
          <Link href={pagePath(locale, "privacy")}>{content.nav.privacy}</Link>
          <Link href={pagePath(locale, "terms")}>{content.nav.terms}</Link>
        </nav>
      </div>
    </footer>
  );
}
