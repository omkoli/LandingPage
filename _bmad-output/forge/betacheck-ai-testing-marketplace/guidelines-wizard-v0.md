# BetaCheck Guidelines Wizard — v0 Flow

*A draft. The wizard is the load-bearing input for taxonomy categories B, C, and E — if this fails, half the finding categories collapse to subjective UX.*

## Design principles

1. **Ceiling of 10 minutes.** MVP founders bounce past this. Every step must justify its friction.
2. **Auto-extract, then edit.** Wizard scrapes the founder's landing page and (optionally) crawls the app, prefills every field. Founder edits, doesn't compose from scratch.
3. **Reject unfalsifiable inputs.** "The app should feel intuitive" is not a testable claim. Wizard flags vague adjectives and forces rewrite.
4. **Versioned snapshots.** Every program run gets a frozen guidelines snapshot. When the founder ships an update, they publish a new guidelines version — old reports triaged against their own version.

---

## The 7 steps

### Step 1 — Product Basics *(auto-prefilled from landing page)*

| Field | Example | Validation |
|---|---|---|
| Product name | BetaCheck | Non-empty |
| One-line description | "Marketplace for pre-launch usability testing" | 6–20 words |
| Target user | "Solo founders shipping AI-generated MVPs" | Non-empty |
| Live app URL | https://betacheck.app | Reachable, returns 200 |

### Step 2 — Core Actions *(auto-prefilled by crawling app nav + CTAs)*

Founder lists **3–8 core actions** a user should be able to complete. Each is a testable job.

| Founder input | Wizard check |
|---|---|
| "Create a new project" | ✅ verb + object, concrete |
| "Manage projects" | ❌ too vague — ask: create? edit? delete? share? |
| "Have a great experience" | ❌ unfalsifiable — reject |

Minimum 3, maximum 8. Anything above 8 = wizard suggests founder is over-scoping v1.

**This list directly generates Category C (Task-Blocker) test cases.**

### Step 3 — The Aha Moment *(one sentence, hardest step)*

Founder completes: *"A new user has succeeded when they ___."*

| Founder input | Wizard check |
|---|---|
| "…run their first AI query and see a result." | ✅ concrete, observable |
| "…understand the product's value." | ❌ unobservable — reject |
| "…complete signup." | ⚠️ warn: signup is usually a proxy, not the moment |

**This defines Category E (First-Run Failure) success criterion.** Sally 🎨 called this the highest-value question the wizard asks — many founders learn something about their own product just answering it.

### Step 4 — Feature Claims *(auto-prefilled from landing page pricing/features section)*

Founder lists specific behavioral claims the app makes, especially tier-gated ones.

| Founder input | Category B validity |
|---|---|
| "Pro users get unlimited exports" | ✅ testable (upgrade → try >N exports) |
| "Data is saved automatically" | ✅ testable (edit → refresh → verify) |
| "Fast and reliable" | ❌ unfalsifiable — reject |
| "Works on mobile" | ✅ but flags scope (add mobile to supported devices) |

Wizard warns: *"Only include features that are LIVE in the current build. Under-construction features cause false Spec-Conformance flags."*

### Step 5 — Out-of-Scope Declarations

Founder declares what testers should **not** flag. Prevents wasted reports on known issues.

Examples:
- "Mobile responsive design — known issue, coming in v2"
- "Admin panel at /admin — do not test"
- "Payment integration is in Stripe test mode — do not report failed real cards"
- "Dark mode is intentional-only, not in this scope"

No minimum. But if founder skips → wizard warns: *"90% of founders find at least one out-of-scope area. Skipping this often costs you 1–2 wasted reports."*

### Step 6 — Test Account Provisioning

How do testers get in?

| Option | Wizard action |
|---|---|
| Magic invite link | Founder pastes URL, wizard verifies it works |
| Shared test credentials | Founder enters creds, wizard attempts login, warns if MFA blocks |
| Public signup allowed | Wizard confirms signup completes, notes if email verification breaks flow |
| Founder-provisioned per tester | BetaCheck queues a "provisioning task" for founder per accepted hunt (adds friction — warn) |

**Wizard hard-blocks publish until at least one method verifies successfully.** Nothing kills a program faster than testers signing up and being unable to log in.

### Step 7 — Review & Publish

Founder sees the compiled guidelines doc (see next section) as testers will see it. Can edit any field inline. Publishes with a version tag (`v1.0.0`).

Wizard auto-generates a **testability score** based on:
- Vagueness density in claims (higher = worse)
- Number of core actions covered by test-credentials (all covered = green)
- Aha moment specificity

Score < 60% → wizard warns "your guidelines may generate low-quality reports." Founder can still publish, but they've been told.

---

## The compiled guidelines doc (what testers see)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BETACHECK PROGRAM · [Product Name]  v1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT IT IS
  [One-line description]
  For: [Target user]
  Live at: [URL]

CORE ACTIONS TO TEST
  1. [Action 1]
  2. [Action 2]
  ...

THE AHA MOMENT
  A new user has succeeded when they
  [completion sentence].

BEHAVIORAL CLAIMS
  • [Claim 1]
  • [Claim 2]
  ...

OUT OF SCOPE — DO NOT REPORT
  • [Exclusion 1]
  • [Exclusion 2]
  ...

HOW TO GET IN
  [Method + credentials/link]

BOUNTY TIERS (from BetaCheck taxonomy)
  Trivial  $0   Minor  $3   Major  $10   Critical $25
  Per-report cap: $60 in bonuses

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Every finding submitted must cite a specific line of this document ("violates BEHAVIORAL CLAIMS bullet 2" or "core action 3 blocked"). **Findings that can't cite a line are rejected at intake, before a triager sees them.** This is what turns adjudication from judgment into matching.

---

## Anti-patterns the wizard must actively prevent

| Anti-pattern | Wizard countermeasure |
|---|---|
| Vague claims ("intuitive", "fast", "great UX") | Regex/LLM check on adjective density — force rewrite |
| Over-claiming (listing features not built) | "Verify this feature works in the URL you provided" — wizard tries to reach it |
| Under-specifying (2 actions when app has 20) | Suggest additional actions based on crawl of app nav |
| Guidelines drift from live app | Every 30 days: wizard re-crawls, flags claims that no longer match, prompts re-publish |
| Founder ghosts triage disputes | Auto-decision after 96h → BetaCheck default rules apply |

---

## Open questions before v1 ships

1. **Auto-extraction — build vs. buy?** LLM-based extraction from marketing sites (OpenAI/Anthropic API) is cheap but hallucinates specifics. A custom crawler + heuristics is more accurate but a bigger build. Recommend LLM first, refine with heuristics as data accumulates.
2. **How structured is the "core actions" input?** Free-text is fastest for the founder but harder for testers to match against. Structured (verb + object + expected outcome) is testable but slower to author. Recommend free-text with LLM validation nudging structure.
3. **Do we need a "guidelines review" service** for founders who can't self-author? BetaCheck-as-a-service tier where a human helps write the doc for $50. May become a real revenue line — or a distraction from marketplace focus.
4. **What happens when a tester finds a real bug that isn't cited in guidelines?** (E.g., broken path — Category A doesn't need a citation.) Rule: Categories A + D don't need citations; B/C/E do.
