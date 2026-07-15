import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Footer, Header } from "@/components/SiteChrome";
import { Locale, PageKey, pagePath, siteConfig } from "@/config/site";
import { siteContent } from "@/content/site-content";

export function SitePage({ locale, page }: { locale: Locale; page: PageKey }) {
  const content = siteContent[locale];

  return (
    <div lang={content.htmlLang} className="site-frame">
      <Header locale={locale} page={page} content={content} />
      <main>
        {page === "home" && <HomePage locale={locale} />}
        {page === "about" && <AboutPage locale={locale} />}
        {page === "services" && <ServicesPage locale={locale} />}
        {page === "capabilities" && <CapabilitiesPage locale={locale} />}
        {page === "contact" && <ContactPage locale={locale} />}
        {page === "privacy" && <LegalPage locale={locale} kind="privacy" />}
        {page === "terms" && <LegalPage locale={locale} kind="terms" />}
      </main>
      <Footer locale={locale} content={content} />
    </div>
  );
}

function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`text-link ${light ? "text-link-light" : ""}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="page-hero shell">
      <p className="eyebrow hero-enter delay-1">{eyebrow}</p>
      <h1 className="page-title hero-enter delay-2">{title}</h1>
      <p className="page-intro hero-enter delay-3">{intro}</p>
    </section>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const home = content.home;
  const services = content.services.items;

  return (
    <>
      <section className="home-hero shell">
        <div className="home-hero-copy">
          <p className="eyebrow hero-enter delay-1">{home.eyebrow}</p>
          <h1 className="display-title hero-enter delay-2">{home.title}</h1>
          <p className="hero-intro hero-enter delay-3">{home.intro}</p>
          <div className="hero-actions hero-enter delay-4">
            <Link className="button button-dark" href={pagePath(locale, "contact")}>
              {content.common.contactCta}<span aria-hidden="true">↗</span>
            </Link>
            <ArrowLink href={pagePath(locale, "services")}>{content.common.explore}</ArrowLink>
          </div>
        </div>
        <div className="hero-art hero-enter delay-3">
          <div className="hero-art-number" aria-hidden="true">01</div>
          <img src="/media-craft-hero.png" alt={home.artAlt} />
          <span className="art-tab art-tab-cyan" aria-hidden="true" />
          <span className="art-tab art-tab-lime" aria-hidden="true" />
          <p>STRATEGY / DESIGN / MEDIA</p>
        </div>
      </section>

      <Reveal>
        <section className="statement-section">
          <div className="shell statement-grid">
            <p className="eyebrow eyebrow-light">{home.statementKicker}</p>
            <p className="statement-copy">{home.statement}</p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section shell">
          <div className="section-heading split-heading">
            <h2>{home.coreTitle}</h2>
            <p>{home.coreIntro}</p>
          </div>
          <div className="core-grid">
            {home.cores.map((item) => (
              <article className="core-card" key={item.no}>
                <span>{item.no}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section services-section">
          <div className="shell">
            <div className="section-heading split-heading">
              <h2>{home.servicesTitle}</h2>
              <div>
                <p>{home.servicesIntro}</p>
                <ArrowLink href={pagePath(locale, "services")}>{content.common.learnMore}</ArrowLink>
              </div>
            </div>
            <div className="service-list">
              {services.map((service) => (
                <Link href={pagePath(locale, "services")} className="service-row" key={service.no}>
                  <span className="service-no">{service.no}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="service-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section shell">
          <div className="section-heading">
            <p className="eyebrow">PROCESS</p>
            <h2>{home.processTitle}</h2>
          </div>
          <div className="process-grid">
            {home.process.map((step) => (
              <article key={step.no}>
                <span>{step.no}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="why-section">
          <div className="why-collage" aria-hidden="true">
            <span className="shape shape-coral" />
            <span className="shape shape-cyan" />
            <span className="shape shape-lime" />
            <span className="shape shape-grid" />
            <span className="shape shape-black" />
          </div>
          <div className="why-content">
            <p className="eyebrow eyebrow-light">{home.whyKicker}</p>
            <h2>{home.whyTitle}</h2>
            <p>{home.whyText}</p>
            <ul>
              {home.reasons.map((reason) => <li key={reason}>{reason}</li>)}
            </ul>
            <ArrowLink href={pagePath(locale, "capabilities")} light>{content.common.viewCapabilities}</ArrowLink>
          </div>
        </section>
      </Reveal>

      <CallToAction locale={locale} title={home.ctaTitle} text={home.ctaText} />
    </>
  );
}

function AboutPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const page = content.about;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Reveal>
        <section className="editorial-feature">
          <div className="editorial-art" aria-hidden="true">
            <span className="feature-word">CRAFT</span>
            <span className="feature-block" />
            <span className="feature-circle" />
          </div>
          <div className="editorial-copy">
            <p className="eyebrow">OUR APPROACH</p>
            <h2>{page.storyTitle}</h2>
            <p>{page.storyText}</p>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="section shell">
          <div className="section-heading"><h2>{page.valuesTitle}</h2></div>
          <div className="value-grid">
            {page.values.map((value, index) => (
              <article key={value.title}>
                <span>0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
          <blockquote className="truth-statement">“{page.promise}”</blockquote>
        </section>
      </Reveal>
      <CallToAction locale={locale} title={content.home.ctaTitle} text={content.home.ctaText} />
    </>
  );
}

function ServicesPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const page = content.services;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Reveal>
        <section className="section shell service-detail-grid">
          {page.items.map((item) => (
            <article className="service-detail-card" key={item.no}>
              <div className="card-index">{item.no}</div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <span className="card-line" aria-hidden="true" />
            </article>
          ))}
        </section>
      </Reveal>
      <Reveal>
        <section className="split-note shell">
          <h2>{page.noteTitle}</h2>
          <div>
            <p>{page.noteText}</p>
            <ArrowLink href={pagePath(locale, "contact")}>{content.common.contactCta}</ArrowLink>
          </div>
        </section>
      </Reveal>
    </>
  );
}

function CapabilitiesPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const page = content.capabilities;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Reveal>
        <section className="capability-board shell">
          {page.groups.map((group, index) => (
            <article className={`capability-group capability-${index + 1}`} key={group.title}>
              <span className="capability-index">0{index + 1}</span>
              <h2>{group.title}</h2>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </section>
      </Reveal>
      <Reveal>
        <section className="capability-note">
          <div className="shell">
            <p className="eyebrow eyebrow-light">MEDIA CRAFT MODEL</p>
            <h2>{page.footerTitle}</h2>
            <p>{page.footerText}</p>
          </div>
        </section>
      </Reveal>
      <CallToAction locale={locale} title={content.home.ctaTitle} text={content.home.ctaText} />
    </>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  const content = siteContent[locale];
  const page = content.contact;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <section className="contact-section shell">
        <aside className="contact-aside">
          <div>
            <p className="eyebrow">{page.detailsTitle}</p>
            <p className="contact-guidance">{page.detailsText}</p>
          </div>
          <div className="contact-meta">
            <p className="meta-label">{content.common.emailLabel}</p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="contact-meta">
            <p className="meta-label">{content.common.addressLabel}</p>
            <address>{siteConfig.address}</address>
          </div>
        </aside>
        <ContactForm copy={page.form} />
      </section>
    </>
  );
}

function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const page = siteContent[locale][kind];
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.updated} />
      <section className="legal-content shell">
        {page.sections.map((section, index) => (
          <article key={section.title}>
            <span>0{index + 1}</span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function CallToAction({ locale, title, text }: { locale: Locale; title: string; text: string }) {
  const content = siteContent[locale];
  return (
    <Reveal>
      <section className="cta-section">
        <div className="shell cta-inner">
          <p>{text}</p>
          <h2>{title}</h2>
          <Link className="button button-light" href={pagePath(locale, "contact")}>
            {content.common.contactCta}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
