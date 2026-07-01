/**
 * Central content + configuration for the BetaCheck landing page.
 * Keeping copy here makes the marketing surface easy to iterate on.
 */

export const site = {
  name: "BetaCheck",
  tagline: "AI App Usability Testing Marketplace",
  description:
    "Connect your AI-generated MVP with product-minded testers. Receive structured reports uncovering bugs, UX issues, friction points, and actionable recommendations — before you launch.",
  url: "https://betacheck.app",
  // App subdomain used inside the product mockups.
  appDomain: "app.betacheck.app",
};

export const navLinks = [
  { label: "Product", href: "#solution" },
  { label: "Workflow", href: "#workflow" },
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "FAQ", href: "#faq" },
];

// Honest positioning for a pre-launch product — no fabricated traction metrics.
export const trustBadges = [
  {
    title: "Founding pilot",
    body: "We're onboarding the first cohort of founders and testers now.",
  },
  {
    title: "Shape the product",
    body: "Early members help define the workflows, reports and pricing.",
  },
  {
    title: "Lock in pilot rates",
    body: "Founding members keep early-access pricing after launch.",
  },
];

// The AI build tools our target founders ship with — describes who BetaCheck is
// for, not customers we claim to have.
export const builtWith = [
  "Cursor",
  "v0",
  "Bolt",
  "Lovable",
  "Replit",
  "Claude",
  "Windsurf",
  "Vercel",
  "Supabase",
  "Framer",
];

export const painPoints = [
  {
    title: "Shipping blind",
    body: "AI builds fast, but founders launch without ever watching a real human try the product.",
  },
  {
    title: "Generic freelancers",
    body: "Upwork and Fiverr testers hunt for typos — not the UX friction that kills activation.",
  },
  {
    title: "No structure",
    body: "Feedback arrives as scattered DMs and voice notes. Nothing is comparable or actionable.",
  },
  {
    title: "Silent churn",
    body: "Users bounce on confusing onboarding and you never learn why. The signal is lost.",
  },
];

export const founderFeatures = [
  {
    title: "Submit in minutes",
    body: "Drop a prototype URL, define your validation goals, and the marketplace does the rest.",
    icon: "Rocket",
  },
  {
    title: "Track your testers",
    body: "Watch assignments, progress, and completion in a live founder dashboard.",
    icon: "Users",
  },
  {
    title: "Structured reports",
    body: "Standardized, comparable reports — not scattered opinions across five inboxes.",
    icon: "FileText",
  },
  {
    title: "UX recommendations",
    body: "Prioritized fixes with severity, effort, and expected impact on activation.",
    icon: "Lightbulb",
  },
  {
    title: "Bug summaries",
    body: "Reproducible issues with steps, screenshots, and device context attached.",
    icon: "Bug",
  },
  {
    title: "Launch readiness",
    body: "A single confidence score that tells you if your MVP is ready for real users.",
    icon: "ShieldCheck",
  },
];

export const testerFeatures = [
  {
    title: "Choose your projects",
    body: "Pick the AI products you actually want to evaluate and get matched instantly.",
    icon: "MousePointerClick",
  },
  {
    title: "Guided workflow",
    body: "Structured evaluation flows keep every session focused and complete.",
    icon: "Route",
  },
  {
    title: "Build credibility",
    body: "Earn a public reputation score and rise through founder-rated tiers.",
    icon: "Award",
  },
  {
    title: "Structured evaluations",
    body: "Standardized rubrics mean your insight is measured, valued, and paid fairly.",
    icon: "ClipboardCheck",
  },
];

export const marketplaceFeatures = [
  {
    title: "Smart matching",
    body: "We route each app to testers with the right domain and product instincts.",
    icon: "Sparkles",
  },
  {
    title: "Guided validation",
    body: "Every test follows a repeatable brief tied to your validation goals.",
    icon: "Compass",
  },
  {
    title: "Standardized reports",
    body: "One report format across every tester so results are always comparable.",
    icon: "LayoutTemplate",
  },
  {
    title: "Built for AI startups",
    body: "Purpose-built for AI-generated MVPs, not legacy enterprise QA cycles.",
    icon: "Cpu",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Founder uploads app",
    body: "Share your prototype URL and describe the validation challenge you care about.",
  },
  {
    step: "02",
    title: "Platform creates a brief",
    body: "BetaCheck generates a structured testing brief from your goals automatically.",
  },
  {
    step: "03",
    title: "Testers evaluate",
    body: "Matched, product-minded testers run guided sessions across devices.",
  },
  {
    step: "04",
    title: "Reports generated",
    body: "Findings are compiled into a standardized, prioritized report.",
  },
  {
    step: "05",
    title: "Founder improves MVP",
    body: "Ship high-impact fixes with clear severity and effort estimates.",
  },
  {
    step: "06",
    title: "Launch confidently",
    body: "Go live with a validated experience and a launch-readiness score.",
  },
];

export const comparison = {
  columns: ["Generic freelancers", "Traditional QA", "BetaCheck"],
  rows: [
    { label: "Structured UX testing", values: [false, "partial", true] },
    { label: "Built for AI MVPs", values: [false, false, true] },
    { label: "Guided workflows", values: [false, "partial", true] },
    { label: "Standardized reports", values: [false, "partial", true] },
    { label: "Fast turnaround", values: ["partial", false, true] },
    { label: "Product feedback, not just bugs", values: [false, false, true] },
    { label: "Launch-readiness score", values: [false, false, true] },
  ],
};

// Real, verifiable benefits of joining the pilot — used in place of testimonials
// while the product is pre-launch.
export const foundingBenefits = [
  {
    title: "Founding-member pricing",
    body: "Join during the pilot and keep early-access rates once we open to everyone.",
    icon: "Tag",
  },
  {
    title: "Priority matching",
    body: "Founding founders get first access to our most experienced testers.",
    icon: "Zap",
  },
  {
    title: "A direct line to the team",
    body: "Work with us as we build. Your feedback shapes the workflows and reports.",
    icon: "MessagesSquare",
  },
  {
    title: "Shape the standard",
    body: "Help define what a great usability report for AI apps actually looks like.",
    icon: "PenTool",
  },
];

export const faqs = [
  {
    q: "What apps can I submit?",
    a: "Any AI-generated or AI-powered web app or prototype with a shareable URL — from no-code MVPs to production betas. If a tester can open it in a browser, we can validate it.",
  },
  {
    q: "How long does testing take?",
    a: "Most guided evaluations are completed within 24–72 hours of assignment. You'll see live progress in your founder dashboard and get notified the moment a report lands.",
  },
  {
    q: "Will testers sign an NDA?",
    a: "Yes. Every tester agrees to confidentiality terms before accessing your app, and you can require a custom NDA on sensitive projects during the pilot program.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing is being finalized with our founding members. Waitlist founders lock in early-access pilot rates well below traditional QA agencies.",
  },
  {
    q: "How are reports delivered?",
    a: "As standardized, interactive reports in your dashboard — with prioritized UX recommendations, reproducible bug summaries, and a single launch-readiness score you can export.",
  },
];

export const footerLinks = {
  Product: [
    { label: "How it works", href: "#workflow" },
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Comparison", href: "#comparison" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Founder waitlist", href: "#waitlist" },
    { label: "Tester waitlist", href: "#waitlist" },
    { label: "Pilot program", href: "#waitlist" },
  ],
};
