# Proofly — AI App Usability Testing Marketplace

A premium, animation-driven landing page for **Proofly**, a marketplace that
connects founders building AI-generated apps with product-minded testers who run
structured usability evaluations. The page is conversion-focused: every section
drives toward the **Founder** or **Tester** waitlist.

> Proofly is pre-launch, so the page makes **no fabricated traction claims** —
> no invented user counts, logos, or testimonials. Social proof is honest
> founding-member positioning.

Built to feel like a 2026 flagship AI-startup homepage — dark-mode first, glassy,
motion-rich, and fast.

## ✨ Highlights

- **Dark, premium design system** — near-black canvas, layered aurora gradients,
  glassmorphism, gradient borders, noise texture, and gradient typography.
- **Motion everywhere** — Framer Motion scroll reveals, Lenis smooth scroll,
  magnetic buttons, cursor glow, a canvas particle/constellation field,
  scroll-linked timeline, animated counters, and a confetti success state.
- **Conversion tooling** — sticky navbar, scroll-progress bar, idle-pulsing
  sticky CTA, and an exit-intent waitlist modal.
- **Fully responsive** and **accessible** (keyboard focus states, reduced-motion
  support, semantic landmarks).
- **SEO-ready** — metadata, Open Graph/Twitter cards, JSON-LD, `robots` and
  `sitemap` routes.

## 🧱 Tech stack

| Concern         | Choice                                   |
| --------------- | ---------------------------------------- |
| Framework       | Next.js 15 (App Router) + React 19       |
| Language        | TypeScript                               |
| Styling         | Tailwind CSS (custom design tokens)      |
| Animation       | Framer Motion                            |
| Smooth scroll   | Lenis                                    |
| Icons           | lucide-react                             |
| Particles / FX  | Custom lightweight `<canvas>` (60fps)    |

> Heavy 3D was intentionally replaced with a GPU-friendly canvas particle system
> and CSS/SVG-driven aurora + mesh gradients to keep the page fast while still
> feeling three-dimensional.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## 🗂 Project structure

```
app/
  layout.tsx        # fonts, metadata, providers (smooth scroll, cursor glow)
  page.tsx          # section composition + JSON-LD
  globals.css       # design tokens, utilities, keyframes
  robots.ts, sitemap.ts
components/
  background/       # AuroraBackground, ParticleField, CursorGlow
  layout/           # Navbar, Footer, ScrollProgress, StickyCTA, ExitIntentModal
  providers/        # SmoothScroll (Lenis)
  sections/         # Hero, Problem, Solution, Features, Workflow, Comparison,
                    # DashboardPreview, FoundingMembers, FAQ, Waitlist, FinalCTA …
  ui/               # MagneticButton, GlassCard, Reveal, Marquee, CountUp,
                    # Confetti, Gradient/Section headings, Logo
lib/
  site.ts           # all marketing copy & config in one place
  utils.ts          # cn() classname helper
  waitlist.ts       # form submission helper (Formspree / Web3Forms / etc.)
```

All copy lives in `lib/site.ts`, so marketing content can be iterated without
touching components.

## 📨 Wiring the waitlist (launch in minutes)

All four capture points — founder form, tester form, footer newsletter, and the
exit-intent modal — post through a single helper (`lib/waitlist.ts`). No backend
required. Pick one provider:

**Option A · Formspree (or Formcarry / Basin / Getform / Formspark)**

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy `.env.example` to `.env.local` and set the endpoint:

   ```bash
   NEXT_PUBLIC_WAITLIST_ENDPOINT=https://formspree.io/f/xxxxxxx
   ```

**Option B · Web3Forms (no account, just an email)**

1. Grab a free access key at [web3forms.com](https://web3forms.com).
2. In `.env.local`:

   ```bash
   NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key
   ```

Restart the dev server and submissions are captured — including a `source` tag
(`founder-waitlist`, `tester-waitlist`, `footer-newsletter`, `exit-intent`) so
you can tell leads apart. **With nothing configured the forms run in demo mode**
(they animate success but don't save), so the page works out of the box.

## 🎨 Customization

- **Brand name** — change `site.name` (and `site.url` / `site.appDomain`) in
  `lib/site.ts`; it propagates everywhere.
- **Colors / gradients** — `tailwind.config.ts` (`brand.*`, `ink.*`) and the
  utility classes in `app/globals.css`.
- **Content** — `lib/site.ts`.

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (animations and smooth scroll disable).
- Canvas effects pause when off-screen via `IntersectionObserver`.
- Keyboard-focusable controls with visible focus rings.
- Semantic headings, landmarks, and `aria` labels on icon-only controls.

---

Built for founders shipping the future. Validate before your users do.
