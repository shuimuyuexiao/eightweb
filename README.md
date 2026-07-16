# CREATIVE BRAND INTERACTIVE LIMITED — Official Website

A responsive, trilingual corporate website for a creative advertising and digital media company. The visual direction is editorial, bold and brand-led, while the content keeps technology in a supporting role.

## Included

- English, Traditional Chinese and Simplified Chinese
- Home, About, Services, Capabilities, Contact, Privacy Policy and Terms of Use
- Responsive navigation and mobile menu
- Lightweight entry, hover and scroll-reveal motion
- Page metadata, Open Graph image, `sitemap.xml` and `robots.txt`
- Accessible contact form with validation and success/error feedback
- Centralised company details and independent localisation content

## Project structure

```text
app/
  [...slug]/page.tsx    Localised routes and page metadata
  layout.tsx            Global metadata and social preview
  page.tsx              English homepage
  robots.ts             Search crawler rules
  sitemap.ts            Multilingual sitemap
components/
  ContactForm.tsx       Validated enquiry form
  Reveal.tsx            Lightweight scroll reveal
  SiteChrome.tsx        Header, language switcher and footer
  SitePage.tsx          Page layouts and sections
config/site.ts          Company information, routes and site URL
content/site-content.ts All English, Traditional Chinese and Simplified Chinese copy
public/                 Website and social preview images
```

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal.

Production validation:

```bash
npm run build
npm test
```

## Configuration

Copy `.env.example` to `.env.local` and edit as needed:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_CONTACT_ENDPOINT=
```

- `NEXT_PUBLIC_SITE_URL` is used by canonical links, the sitemap and social metadata.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` is optional. When set, the form sends a JSON `POST` request to that endpoint. When omitted, it opens the visitor's email application with a prepared message.
- Change the company email or registered address once in `config/site.ts`.
- Change website copy in `content/site-content.ts`; page components do not contain localisation text.

## OpenAI Sites deployment

This project includes `.openai/hosting.json` and a Vinext/Cloudflare-compatible build. After `npm run build`, it can be published directly with OpenAI Sites.

## Vercel deployment

The app pages use standard Next.js App Router APIs. For Vercel:

1. Import the project into Vercel.
2. Set the framework preset to **Next.js**.
3. Set the build command to `npm run build:next`.
4. Add `NEXT_PUBLIC_SITE_URL` with the final public URL.
5. Add `NEXT_PUBLIC_CONTACT_ENDPOINT` if a form service is being used.
6. Deploy, then update `NEXT_PUBLIC_SITE_URL` if a custom domain is attached.

No database is required.
