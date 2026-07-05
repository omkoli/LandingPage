---
title: "BetaCheck — AI-Testing Marketplace PRD"
status: final
created: 2026-07-05
updated: 2026-07-05
---

# BetaCheck — Product Requirements Document

## Overview

**BetaCheck is an open bug-bounty marketplace for pre-launch MVPs.** Founders publish a program describing what their app does and the rules of engagement; a pool of approved, India-based testers hunts against that spec; findings are scored on a CVSS-style severity rubric and paid per validated finding. Adjudication leans on the founder's own guidelines document, so triage is closer to matching than to judgment.

The marketplace is two-sided: **founders/companies** bring demand (MVPs that need testing), **testers** bring supply (bug-hunting effort), and a **mediation layer** (mediators + platform admins) keeps findings honest and payouts fair.

### Product goals

1. Let a founder host a testable program end-to-end in minutes and receive high-signal findings.
2. Let an approved tester discover programs, hunt freely, and get paid + recognized for validated findings.
3. Make severity scoring and adjudication predictable enough that disputes are rare and cheap to resolve.

### Actors (roles)

| Role | Description |
|---|---|
| **Tester (bug hunter)** | Applies, is approved, browses programs, hunts, submits findings, proposes a CVSS-style score, earns bounties + recognition. |
| **Founder / Company** | Creates a company account, hosts one or many programs, authors guidelines/scope, reviews findings, disputes, funds bounties. |
| **Mediator / Triager** | Confirms finding validity and severity score; resolves founder/tester disputes. First-class role with dedicated tooling. |
| **Platform Admin** | BetaCheck staff — approves tester applications and programs to go live, manages payouts, handles escalations, oversees marketplace health. |

### Scope (v1)

Full marketplace MVP, launch-grade: both-side onboarding, program hosting with a guidelines wizard, program discovery and hunting, finding submission, CVSS-style severity scoring, mediation and disputes, payments and payouts, plus the trust surfaces (testivity feed, hall-of-fame recognition).

**Explicitly out of scope (v1):** security-vulnerability hunting (routes to HackerOne/Bugcrowd, not BetaCheck), design/aesthetic preference reports, performance benchmarking, and anything requiring admin/backend access to the founder's app.

---

## Features & Requirements

### 1. Onboarding & Accounts

Covers how testers and companies get into the system and become able to transact.

**Tester onboarding** is quality-gated: sign up, apply, and a Platform Admin manually approves before the tester can hunt. This trades supply-growth speed for a higher baseline of report quality — the admin approval queue is therefore a throughput dependency the marketplace must staff.

**Founders** create a company account once and host one or many programs under it (supporting multiple MVPs and versioned reruns). Billing and any future team access live at the company level.

**Payment setup is deferred** until money actually moves: a tester provides payout details when they earn their first bounty; a founder provides a payment method when they first fund a program. This keeps signup friction low and defers identity/KYC checks to the transaction moment.

**Functional Requirements**

- **FR1.** A prospective tester can sign up (email or OAuth) and submit an application to become an active tester.
- **FR2.** A Platform Admin can review, approve, or reject a tester application; only approved testers can start a hunt.
- **FR3.** A rejected or pending tester sees their status and any reason/next steps; approval unlocks hunting.
- **FR4.** A founder can create a company account and manage a company profile.
- **FR5.** A company account can host multiple programs, including versioned reruns of the same product.
- **FR6.** A tester can complete payout details (e.g., Payoneer / Wise / UPI) at or before their first earned bounty; payout is blocked until valid details + any required identity verification exist.
- **FR7.** A founder can add a payment method at or before first program funding; funding is blocked until a valid method exists.
- **FR8.** Each account carries a role (Tester, Founder, Mediator, Admin) that governs what surfaces and actions are available.

### 2. Program Hosting & Guidelines

A program is the founder's testable brief plus its rules of engagement. Hosting is driven by the **Guidelines Wizard** — the load-bearing input, because finding categories that depend on citations (spec-conformance, task-blocker, first-run) collapse into subjective UX without a good guidelines document.

**Guidelines Wizard (7 steps).** Carried forward as specified in the forge draft: (1) Product basics, (2) Core actions to test, (3) The aha moment, (4) Feature/behavioral claims, (5) Out-of-scope declarations, (6) Test-account provisioning, (7) Review & publish. Principles: a 10-minute ceiling, auto-extract-then-edit (scrape the founder's landing page/app and prefill), rejection of unfalsifiable claims, and versioned snapshots so each program run is triaged against a frozen guidelines version. Publishing produces a **testability score**; a low score warns the founder but does not hard-block (except where a step's own hard-block applies, e.g. no working test-account method).

**Program lifecycle & spend control.** Going live requires a paid **hosting fee** (BetaCheck's revenue; see §7). Because the marketplace is open-bounty (unlimited approved hunters), the founder controls tester-payout cost through a separately-funded **bounty budget** (100% pass-through to testers). A program is live while the bounty budget remains and **auto-pauses when it is exhausted**; the founder can top up to resume. This is the primary founder-spend-control mechanism.

**Testivity feed (redacted public).** Each program page shows a public, redacted feed of prior activity: the count of validated findings, the severity distribution, and tester credits — but **not** the finding details. This signals an active, rewarding program and helps testers gauge opportunity without leaking the founder's unfixed weaknesses.

**Recognition — hall-of-fame & thanks.** Each program carries a founder-facing "thanks" hall-of-fame crediting its top hunters (definition #2), and BetaCheck maintains a **global tester leaderboard**. Recognition is **opt-in**: a tester may hunt and be paid while remaining anonymous in public credits.

> Note: NDA / IP protection / screenshot redaction / access kill-switch are handled in **§8 Trust, Safety & IP**, not as a wizard step.

**Functional Requirements**

- **FR9.** A founder can create a program and complete the 7-step Guidelines Wizard.
- **FR9a.** The wizard auto-extracts and pre-fills fields from the founder's landing page/app URL; each auto-extracted claim is shown with its source snippet and requires one-click per-claim confirmation before it is accepted (hallucination guard).
- **FR9b.** The wizard supports save and resume, so a founder can complete it across sessions without losing work.
- **FR9c.** The wizard offers an LLM-drafted suggestion for the aha-moment step, which the founder edits or replaces.
- **FR9d.** Step 2 enforces the 3–8 core-actions bound; more than 8 triggers an over-scoping nudge.
- **FR10.** The wizard flags claims containing vague/unfalsifiable language (per a maintained vague-term list plus an LLM check) and requires a rewrite before they can be published.
- **FR11.** The wizard hard-blocks publishing until at least one test-account access method is verified as working.
- **FR12.** On publish, the system generates a versioned guidelines snapshot (e.g. `v1.0.0`); findings are always adjudicated against the snapshot version in force when the hunt occurred.
- **FR13.** The wizard computes and displays a testability score (0–100, from vagueness density, core-action/test-credential coverage, and aha-moment specificity); a score below a configurable threshold warns but does not block publishing.
- **FR14.** A founder can set and fund a bounty budget for a program; the program goes live only while budget remains.
- **FR15.** A program auto-pauses when its remaining bounty budget is less than the maximum possible single payout (Severe band); the founder can top up to resume.
- **FR16.** Each program page displays a redacted-public testivity feed: validated-finding count, severity distribution, and (opt-in) tester credits — without finding details.
- **FR17.** Each program displays a per-program hall-of-fame ("thanks") crediting its top hunters; the platform maintains a global tester leaderboard.
- **FR18.** A tester can opt out of public credit/leaderboard visibility while still earning and being paid.
- **FR19.** A founder can publish a new guidelines version when the app changes; prior reports remain tied to their original version.

### 3. Discovery & Hunting

Approved testers browse the marketplace and freely choose any live program to hunt (definition #3). Hunting is **tracked**: a tester explicitly starts a hunt, which creates a session bound to the program's current guidelines version, grants access, and begins session tracking. Tracking is what makes the report-quality gate, testivity feed, and duplicate handling possible.

**Concurrency** is capped (default ~3 active hunts per tester, admin-configurable) to keep effort focused and reduce abandoned reports. **Access is always immediate**: v1 supports only self-serve access methods (magic link, shared test credentials, public signup), so no hunt ever waits on a founder action. Founder-per-tester provisioning is deferred beyond v1. **Session-time evidence** is captured via an attached screen recording rather than a custom browser extension — a buy-not-build choice for launch.

**Functional Requirements**

- **FR20.** An approved tester can browse and search all live programs, seeing each program's public guidelines summary, severity/bounty info, and redacted testivity.
- **FR21.** A tester can start a hunt on any live program with remaining budget; starting creates a session bound to the current guidelines version.
- **FR22.** Starting a hunt grants test-account access immediately via the program's self-serve method (magic link / shared credentials / public signup).
- **FR23.** A tester's number of concurrently active hunts is capped (default ~3, admin-configurable); starting beyond the cap is blocked with a clear message.
- **FR24.** A tester can attach a screen recording to a hunt/finding as session evidence; the report-quality gate uses it to assess session effort.
- **FR25.** A founder can see the count of active hunters on their program (aggregate; identities subject to tester anonymity settings).
- **FR26.** A tester can abandon or close an active hunt, freeing a concurrency slot.

### 4. Finding Submission

Findings are submitted against a structured report bound to the hunt's guidelines version. Each finding is classified into one of five **categories** (carried from the forge taxonomy) plus a Trivial catch-all. Category is orthogonal to severity score (§5): the category governs *what kind* of bug it is and its **citation rules**; the score governs *how severe* it is and its payout.

**Finding categories**

| Cat | Name | Definition (short) | Citation required? |
|---|---|---|---|
| **A** | Broken Path | A user action produces a hard failure (404, 500, blank screen, uncaught error, infinite load). | No — self-evident |
| **B** | Spec-Conformance Failure | App behavior contradicts a specific claim in the founder's guidelines. | **Yes** — quote the claim |
| **C** | Task-Blocker | A user cannot complete a core action listed in the guidelines despite reasonable attempts. | **Yes** — cite the core action |
| **D** | Data-Integrity Issue | Data is lost, duplicated, or silently corrupted through normal use. | No — evidence-based |
| **E** | First-Run Failure | A new user cannot reach the guidelines-defined aha moment via intended onboarding. | **Yes** — cite the aha moment |
| **T** | Trivial | Typos, minor copy, small cosmetic misalignment. Counts toward completeness; pays $0. | No |

**Citation-based adjudication.** Findings in categories B/C/E must cite a specific line of the compiled guidelines document; a finding that cannot cite a required line is rejected at intake before a mediator sees it. This is what turns adjudication from judgment into matching. Categories A and D are evidence-based and need no citation.

**Report-quality gate (base pay).** Base pay is gated on report completeness: the report template fully addressed, at least one artifact (screenshot / clip / console log) per claimed finding, session evidence (screen recording) indicating **≥ 30 minutes of actual session activity**, and a fresh-browser/account attestation where required. A failed gate holds base pay pending mediation; no bonuses pay on a failed base.

**Finding lifecycle.** Every finding moves through an explicit state machine:

`submitted` → `intake-check` → (fails citation/spam gate) `intake-rejected` | (passes) `in-triage` → `needs-clarification` ⇄ `in-triage` → `validated` (with confirmed score) | `rejected` → (dispute) `in-dispute` → `resolved-final`.

A `validated` finding may later be marked `fixed` by the founder; a non-first `validated` finding is marked `duplicate`. Payout triggers only on `validated` or a `resolved-final` state in the tester's favor.

**Functional Requirements**

- **FR27.** A tester can submit a finding within an active hunt, choosing a category (A–E or Trivial) and attaching required evidence.
- **FR28.** For categories B/C/E, the system requires a citation to a specific line of the program's guidelines snapshot; submission without a valid citation is blocked at intake.
- **FR29.** For categories A/D, the tester submits evidence without a citation requirement.
- **FR30.** A tester can submit multiple findings within one hunt/report; the report enforces the completeness checklist before base-pay eligibility.
- **FR30a.** The report-quality (base-pay) gate requires session evidence indicating ≥ 30 minutes of actual session activity (inferred from the attached screen recording), the completeness checklist, and at least one artifact per finding.
- **FR31.** Each finding records the guidelines version it was adjudicated against.
- **FR31a.** Every finding carries an explicit status from the defined lifecycle; each status transition is recorded with actor, timestamp, and reason.
- **FR32.** Duplicate findings on the same program are handled by first-submit-wins (see §7); later identical findings are flagged as duplicates.

### 5. CVSS-Style Severity Scoring

Severity is scored on a BetaCheck-flavored rubric inspired by CVSS's *structure* (not its security metrics). Four dimensions, each scored 0–3, produce a composite of **0–12**, which maps to a severity band and a fixed payout. The **tester proposes** a score at submission; a **mediator confirms or overrides** it, and the mediator's score is binding and determines payout. A founder may dispute the score (§6).

**Severity rubric**

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **Impact** (consequence) | None / cosmetic | Annoyance, easy workaround | Functional loss, no workaround | Data loss / billing / payment broken |
| **Scope** (reach) | Rare edge case | Some users / one flow | Many users / several flows | Every user / core flow |
| **Reproducibility** | Could not reproduce | Intermittent | Usually reproduces | Reproduces every time |
| **User-Blocking** | Not blocking | Slows the user | Blocks a secondary action | Blocks a core action entirely |

**Composite → band → payout**

| Composite (0–12) | Band | Payout (bonus) |
|---|---|---|
| 0–1 | Trivial | $0 |
| 2–4 | Minor | $3 |
| 5–7 | Major | $10 |
| 8–10 | Critical | $25 |
| 11–12 | Severe | $50 |

Payout amounts inherit the forge taxonomy's tier values, extended with a top **Severe** band for the rare maximum-severity finding. Bands (not a continuous function) keep payouts predictable and disputes cheap. Per-program bonus behavior and budget interaction are defined in §7.

**Functional Requirements**

- **FR33.** A tester proposes a severity score by rating each of the four rubric dimensions (0–3) when submitting a finding; the system computes the composite and previews the resulting band/payout.
- **FR34.** A mediator reviews each finding and confirms or overrides each dimension score; the mediator's composite is binding and determines the payout band.
- **FR35.** The system maps a confirmed composite to its severity band and fixed payout per the band table.
- **FR36.** Score changes by a mediator are recorded with a reason, visible to the tester and founder, and are disputable per §6.
- **FR37.** The rubric, band cutoffs, and payout values are configurable by Platform Admin (versioned) without a code change.

### 6. Mediation & Disputes

Mediation keeps findings honest and payouts fair. Findings that pass intake land in a **shared triage queue**; any available mediator pulls the next finding, subject to a conflict-of-interest guard (a mediator cannot triage a hunt they participated in or are otherwise related to). A mediator decides two things per finding: **validity** (is this a real, in-scope finding?) and **severity score** (§5).

**Two dispute axes.** A founder can dispute a finding's *validity* or its *severity score*. A tester can escalate a *rejection*. Escalation is bounded at **two levels**: the first mediator decides; a dispute routes to a **second mediator whose decision is final** (no admin appeal in v1).

**Founder participation.** Beyond disputing, a founder can **acknowledge / mark a finding fixed** (feeding fix-rate stats and closing the loop), **award a discretionary bonus or public thanks** (feeding the hall-of-fame), and **comment / request clarification** from the tester via the mediator before validity is decided.

**SLAs.** Two configurable SLAs protect the marketplace: a **triage SLA** (findings should be triaged within a target window — this protects the overnight-turnaround wedge that is BetaCheck's core value promise), and a **ghost auto-resolution SLA** (if a founder does not respond to a dispute within the window, e.g. 96h, platform default rules auto-apply so testers are not left unpaid).

**Functional Requirements**

- **FR38.** Findings passing intake enter a shared triage queue; any available mediator can pull the next finding, blocked by a conflict-of-interest check.
- **FR39.** A mediator can set a finding's validity (valid / rejected / needs-clarification) and confirm/override its severity score, recording a reason.
- **FR40.** A founder can dispute a validated finding's validity and/or its severity score within the dispute window.
- **FR41.** A tester can escalate a rejected finding within the escalation window.
- **FR42.** A disputed or escalated finding routes to a second mediator; the second mediator's decision is final.
- **FR43.** If a founder does not act on a dispute within the ghost-SLA window, platform default rules auto-resolve it.
- **FR44.** A founder can acknowledge a finding and mark it fixed; fix status is recorded and feeds program stats.
- **FR45.** A founder can award a discretionary bonus and/or public thanks to a tester for a finding (subject to program budget; feeds the hall-of-fame).
- **FR46.** A founder can comment on / request clarification for a finding; the tester can respond via the mediation thread before validity is finalized.
- **FR47.** Triage-speed and ghost-resolution SLAs are configurable by Platform Admin; breaches are surfaced to admins.

### 7. Payments & Payouts

**Revenue model.** BetaCheck monetizes through a **flat hosting fee** the founder pays to host a program. That fee is BetaCheck's revenue. Separately, the founder funds a **bounty budget** (and base-pay pool) that flows **100% to testers** — the platform takes no cut of bounties, so a tester receives the full band amount for a validated finding. (This supersedes the forge's 25%-of-bonuses take model.)

**What the founder pays**

| Founder pays | Goes to | Notes |
|---|---|---|
| Flat hosting fee (per program) | BetaCheck | Platform revenue; charged to list a program |
| Base-pay pool | Testers (100%) | Funds the capped base pay (below) |
| Bounty budget | Testers (100%) | Funds severity-band payouts; program auto-pauses when exhausted |

**Base pay (hybrid, capped).** The first **N** quality-gate-passing reports on a program earn a small base (~$8), funded by the founder's base-pay pool. Beyond N, hunting is **bounty-only** — testers earn only from validated findings. This seeds early tester effort without exposing the founder to unbounded base cost in the open-bounty model. N is configurable per program.

**Bounty payout.** Each validated finding pays the fixed band amount (§5), drawn from the bounty budget. **Duplicates:** the first tester to validly submit a given finding is paid in full; later identical findings are marked duplicate and pay **$0**.

**Currency & rails.** Founders are billed in **USD**; testers are paid in **INR** via **UPI** (instant, low-cost, familiar for India-based testers) as the single v1 payout rail. The structural wedge is a cost-and-timing advantage, not an FX margin BetaCheck captures: INR-denominated tester supply serves USD-paying founders economically, and the time-zone offset delivers overnight turnaround. (Conversion is applied transparently at payout per NFR6; BetaCheck's only revenue is the hosting fee.)

**Functional Requirements**

- **FR48.** A founder pays a flat hosting fee (USD) to host a program; the fee is required before the program can go live.
- **FR49.** A founder funds a base-pay pool and a bounty budget for a program; both are 100% pass-through to testers.
- **FR50.** The first N quality-gate-passing reports per program earn base pay from the base-pay pool; beyond N, reports are bounty-only. N is configurable per program.
- **FR51.** A validated finding pays its fixed severity-band amount in full to the first valid submitter, drawn from the bounty budget.
- **FR52.** A duplicate finding (not first-submitted) pays $0 and is marked as a duplicate.
- **FR53.** The program auto-pauses when remaining bounty budget is less than the maximum possible single payout (Severe band); the founder can top up to resume (ref FR15).
- **FR54.** Testers are paid in INR via UPI; a tester provides UPI payout details before their first payout, subject to any required identity verification.
- **FR55.** A tester and founder can each see a transaction history (earnings / charges) with per-finding and per-program breakdowns.
- **FR56.** Discretionary founder bonuses/tips (FR45) draw from the founder's funded pools and pass 100% to the tester.
- **FR56a.** If a founder's payment method is declined (hosting fee or funding), the dependent action is blocked with a clear error and retry path; a program never goes live on an unpaid hosting fee.
- **FR56b.** If a tester's UPI payout fails, the payout is retried and the tester is notified; funds are never lost — they are held in the ledger pending resolution.
- **FR56c.** If a Platform Admin rejects a program before go-live (FR58/FR59), the hosting fee is refunded per policy; unspent base-pay pool and bounty budget are returnable to the founder when a program is closed.

### 8. Trust, Safety & IP

Pre-launch founders expose an unlaunched app to strangers, and the open-bounty model invites low-effort submissions — so trust controls are load-bearing, not optional.

**IP protection (v1).** A tester must accept the program's **NDA / confidentiality terms** before starting a hunt. Richer safeguards the forge raised — an access kill-switch, evidence redaction tooling, and platform-known-but-founder-masked tester identity — are **deferred to v1.1** and tracked as open items (see "Deferred to v1.1"); the forge flagged founder IP paranoia as a real churn risk, so these are candidates to pull forward if founder onboarding stalls.

**Program approval.** A hosted program requires **Platform Admin approval before it goes live** and becomes visible to testers. The admin reviews guidelines quality, scope legitimacy, and that the hosting fee is paid. This mirrors the manual-approval stance taken for testers and protects marketplace quality.

**Spam & duplicate control (v1).** Two levers ship in v1: the **citation-required intake gate** (§4 — B/C/E findings without a valid guideline citation are rejected before mediation) and **basic rate-limiting** (a per-tester submission cap and flagging of testers with high reject rates). A **richer AI spam/duplicate filter and a full tester-reputation/ranking system are deferred to v1.1** (see "Deferred to v1.1") — v1 leans on citations, rate-limiting, and human mediation.

**Functional Requirements**

- **FR57.** A tester must accept the program's NDA / confidentiality terms before starting a hunt; acceptance is recorded per tester per program version.
- **FR58.** A hosted program cannot go live until a Platform Admin approves it (guidelines quality, scope, hosting-fee paid).
- **FR59.** A Platform Admin can reject or request changes to a program before go-live, with reasons surfaced to the founder.
- **FR60.** The system rate-limits tester submissions (per-tester cap, admin-configurable) and flags testers with high reject rates for admin review.
- **FR61.** A Platform Admin can suspend a tester, founder, or program in response to abuse.

### 9. Cross-Cutting Concerns

**Form-factor.** BetaCheck is a **responsive web application, desktop-first**. Hunting realistically requires a desktop (browser dev tools, screen recording, multi-window work), and founders host from desktop. The app is mobile-usable for browsing programs and receiving notifications, but is not optimized for mobile hunting in v1. Native mobile is deferred.

### 10. Notifications

Every core loop in this PRD — the overnight-turnaround wedge, dispute ghost-timers, payout confirmations, budget exhaustion — depends on actors being told when something changes. Notifications are a first-class capability, not an afterthought.

**Functional Requirements**

- **FR62.** The system notifies each actor of state changes relevant to their role: **tester** (finding validated / rejected / scored, clarification requested, payout sent or failed), **founder** (new finding, dispute outcome, budget low / exhausted, program approved / rejected), **mediator** (new item in queue, escalation assigned), **admin** (SLA breach, flagged tester, pending approvals).
- **FR63.** Notifications are delivered in-app and by email; a user can manage notification preferences, except for transactional and legal notices (payouts, disputes, NDA), which are always delivered.
- **FR64.** SLA-tied, time-sensitive events (dispute ghost-timer, triage-SLA-at-risk, budget exhaustion) generate escalating notifications to the responsible actor until acted upon or auto-resolved.

## Success Metrics

**North-star metric: validated findings delivered per week.** This single number captures both sides transacting — testers hunting *and* founders funding — and is the truest proxy for marketplace liquidity.

**Wizard activation (make-or-break):** ≥ 60% of founders who start the Guidelines Wizard complete it end-to-end in **≤ 10 minutes**, producing a guidelines doc above the testability threshold. This is the forge's "what has to be true before writing code" test elevated to a launch-critical metric. Track **wizard start→complete rate** and **median completion time**; wizard abandonment is a launch-critical counter-metric.

**Supporting metrics:** approved-tester count and active-hunter rate (supply health); programs going live per week and rerun rate (demand health); median triage-to-payout time (wedge health); founder cost per validated finding (value delivered).

**Counter-metrics (guard against gaming the north-star):**
- **Finding validity rate** — validated ÷ submitted. If findings/week rises while validity falls, we're rewarding noise, not signal.
- **Dispute rate & dispute-loss rate** — rising disputes mean scoring or adjudication is eroding trust even as volume grows.
- **Duplicate ratio** — a spike means hunters are dogpiling obvious bugs, not covering the app.
- **Founder churn / non-payment** — findings delivered but founders not returning or not funding means we're generating volume without value.

## Non-Functional Requirements

**Turnaround speed (the wedge).** The overnight-turnaround promise is BetaCheck's core differentiator and is protected by explicit SLAs.
- **NFR1.** The median time from finding submission to mediator decision must meet the triage SLA target (configurable; sized to deliver overnight turnaround given the India/founder time-zone offset).
- **NFR2.** From validated finding to tester payout initiation must complete within a defined window; SLA breaches are surfaced to admins.
- **NFR3.** Mediation queue depth and oldest-item age must stay within admin-configured thresholds; breaching either triggers alerting (mediation-throughput is a known scaling concern).

**Payment reliability & correctness.**
- **NFR4.** Payouts must be accurate and idempotent — no double-pays, no lost funds; every payout is traceable to a validated finding and its confirmed band.
- **NFR5.** All financial events (fees, funding, payouts, disputes) are recorded in an auditable ledger reconcilable end-to-end.
- **NFR6.** Currency handling (USD billing, INR payout) applies a transparent, recorded conversion at payout time.

**Security & data isolation.**
- **NFR7.** Tester access to a founder's app is scoped to the program's declared access method and revocable; BetaCheck stores no more app access than necessary.
- **NFR8.** PII, payment/payout details, and program secrets (credentials, private guidelines) are encrypted at rest and in transit, and access is role-scoped.
- **NFR9.** Role boundaries are enforced server-side: testers, founders, mediators, and admins can only perform their role's actions and see their permitted data (e.g. mediators cannot triage conflicted hunts; founders see tester handles subject to anonymity settings).

---

## Deferred to v1.1

- **Tester reputation & ranking system** — validated-rate, accuracy, dispute-loss scoring that unlocks private programs and weights the leaderboard. (v1 ships only basic rate-limiting.)
- **Private programs** — public/private toggle; depends on the reputation system above.
- **AI spam & duplicate filter** — AI-assisted intake filtering and duplicate clustering. (v1 relies on the citation gate, rate-limiting, and human mediation.)
- **Richer IP safeguards** — access kill-switch, evidence-redaction tooling, platform-known-but-founder-masked tester identity. Candidates to pull forward if founder IP paranoia stalls onboarding.
- **Founder-per-tester access provisioning** — dropped from wizard Step 6 in v1 (access must be self-serve/immediate).
- **Native mobile apps** and mobile-optimized hunting.
- **Admin-level dispute appeal** (3rd escalation level) — v1 stops at second-mediator-final.
- **Guidelines drift re-crawl** — both the passive periodic (30-day) and active per-report re-crawl are deferred to v1.1; v1 relies on versioned snapshots and founder manual re-publish on change.

## Dropped (not planned)

- **Guidelines-review-as-a-service** — a paid human-assisted guidelines-authoring tier ($50 in the forge). Dropped to keep v1 marketplace-focused; the bad-guidelines risk is instead mitigated by the wizard's testability score and vague-claim rejection.

## Open Questions & Assumptions

- **[TENSION]** Open bug-bounty (maximize hunter supply) coexists with manual tester approval (throttles supply). Coherent as "quality-gated supply, open competition among the approved," but the admin approval queue is a real throughput dependency that must be staffed.
- **[OPEN]** Hosting-fee exact pricing (flat fee amount) — model locked (flat per-program), amount deferred to a pricing decision.
- **[OPEN]** Base-pay cap `N` (how many quality reports earn base before bounty-only) — needs a starting value.
- **[OPEN]** Session-time evidence tooling — the ≥30-min activity requirement is firm (FR30a); the exact screen-record verification tooling to buy/build is an implementation decision.
- **[ASSUMPTION]** Founder funds hosting fee, base-pay pool, and bounty budget as three distinct payments; the base-pay pool and bounty budget are 100% pass-through, only the hosting fee is BetaCheck revenue.
- **[ASSUMPTION]** Cross-border payment operations (UPI payout compliance, TDS, W-8BEN, entity structure) are a legal/finance workstream outside this PRD's functional scope but gating real launch.

## Decision Log (summary)

- **Access model:** open bug-bounty — unlimited *approved* hunters per program; free choice among live programs.
- **Severity:** CVSS-style scored rubric (4 dims: Impact, Scope, Reproducibility, User-Blocking → 0–12 → banded payout); tester proposes, mediator confirms.
- **Money model (changed from forge):** flat hosting fee = BetaCheck revenue; bounty budget + base-pay pool funded separately by founder, 100% pass-through to testers.
- **Base pay:** hybrid — first N quality reports earn base, beyond that bounty-only. Dupes pay $0 (first-submit-wins).
- **Roles:** Tester, Founder/Company, Mediator/Triager, Platform Admin.
- **Onboarding:** tester = application + manual approval; founder = company→many programs; payment deferred to first transaction.
- **Program lifecycle:** admin-approved go-live; bounty-budget auto-pause; versioned guidelines snapshots.
- **Mediation:** shared queue, 2-level escalation (2nd mediator final), triage + ghost-resolution SLAs.
- **Form-factor:** responsive web, desktop-first. **North star:** validated findings/week.
