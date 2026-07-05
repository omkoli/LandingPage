---
title: "PRD Quality Review — BetaCheck AI-Testing Marketplace"
reviewer: PRD Quality Reviewer
date: 2026-07-05
subject: prd-LandingPage-2026-07-05/prd.md
verdict: PASS-WITH-FIXES
---

# PRD Quality Review — BetaCheck AI-Testing Marketplace

**Verdict: PASS-WITH-FIXES.** This is a strong, unusually coherent PRD. The scope is honestly bounded, the money model is clean, and the FRs are mostly written as verifiable statements. But there are real capability gaps a builder hits on day one (notifications, account/access recovery, empty/error states, the founder review UI), a handful of unfalsifiable requirements, one broken cross-reference repeated many times, and a couple of underspecified money-model edge cases. None of these are fatal; all are fixable before handoff. Details below.

---

## 1. Completeness — capability gaps

The FR set covers the happy-path marketplace loop well (onboard → host → hunt → submit → score → mediate → pay). The gaps are in the connective tissue a builder needs immediately.

**Notifications — entirely absent as requirements.** The prose in §9 (Cross-Cutting) says the app is "mobile-usable for browsing programs and **receiving notifications**," and §6/NFR2–NFR3 lean on SLAs and "surfaced to admins" — but there is **no FR** for a notification system. A two-sided, time-sensitive, money-moving marketplace with an "overnight turnaround" wedge (NFR1) is unbuildable without notifications: tester must learn a finding was validated/rejected/paid; founder must learn a dispute is waiting (and that the ghost-SLA clock in FR43 is running against them); mediator must learn the queue has work; admin must learn an SLA breach occurred (FR47, NFR2). "Surfaced to admins" appears three times (FR47, NFR2, NFR3) with no delivery channel specified. **This is the single largest completeness gap.**

**Account / access recovery — absent.** No FR for password reset, OAuth-account recovery, email change, or account closure. FR1 covers signup (email or OAuth) but not recovery. For a system holding payout details and money, account recovery and the security around it (see also NFR8) is table-stakes and will block the first real user who forgets a password.

**Founder "review findings" UI is asserted but not specified as FRs.** The Actors table says a founder "reviews findings," and §6 gives the founder dispute/acknowledge/bonus/comment actions (FR40, FR44–FR46). But there is **no FR for the founder simply *viewing* the stream of validated findings on their program** — the core deliverable the founder is paying for. FR55 covers transaction history; nothing covers the findings inbox/report itself. A builder would have to infer the founder's primary screen.

**Empty states and error handling are not stated as requirements.** No FRs for: a program with zero live hunters or zero findings yet; a tester's first-run empty dashboard; the marketplace with no live programs to browse (FR20); a payment/payout **failure** (UPI rejected, card declined, insufficient bounty budget mid-payout). FR53 handles budget *exhaustion* gracefully, but a **failed** UPI transfer, a chargeback, or a refund path is unaddressed. Payment rails fail in production; there is no FR describing what the system does when they do.

**Admin tooling is thin relative to how load-bearing admins are.** Admins are on the critical path for three throttles (tester approval FR2, program approval FR58–FR59, plus payouts and escalations per the Actors table). Yet admin FRs are scattered and shallow: there is no FR for an **admin dashboard / queue view** for the tester-approval backlog the PRD itself flags as "a throughput dependency the marketplace must staff" (§1, and the [TENSION] note). FR61 lets an admin suspend actors but there is no FR for reinstating them, no audit view, and no FR for the admin managing the **payout run** the Actors table says they "manage." Given the PRD repeatedly calls admin throughput the scaling risk, the admin console deserves its own FRs.

**Mediator supply / assignment.** FR38 says "any available mediator can pull the next finding," and FR42 routes disputes to "a second mediator" — but there is no FR covering **how a mediator becomes a mediator** (onboarding/approval, analogous to FR2 for testers), or what happens when **no second mediator is available** (deadlock on a small marketplace). FR8 assigns the role but nothing provisions it.

**Guidelines auto-extraction failure.** FR9 relies on "auto-extraction pre-filling fields from the app's landing page/URL where possible." There is no FR for the (common) case where extraction fails, returns garbage, or the founder has no public landing page. "Where possible" hand-waves the fallback.

**Test-account verification (FR11) mechanics undefined.** FR11 hard-blocks publish "until at least one test-account access method is **verified as working**." How the system verifies a magic link / shared credential / public signup actually works is not specified and is genuinely hard to build. This is flagged as an [OPEN] for *session evidence* but not for the FR11 verification gate itself.

---

## 2. Testability / clarity — are FRs verifiable?

Most FRs are commendably crisp and testable (e.g., FR23 concurrency cap, FR28 citation block at intake, FR52 duplicate pays $0, FR12 versioned snapshot). The weak spots:

- **FR10** — "The wizard **rejects or flags unfalsifiable claims** (vague adjectives, unobservable aha moments)." This is itself unfalsifiable as written: "unfalsifiable claim" is not machine-decidable, and "rejects **or** flags" leaves the actual behavior undefined. A tester writing this AC cannot say what input produces reject vs. flag. Needs a concrete rule (e.g., a banned-adjective lint + a human-review flag) to be verifiable.

- **FR13 / testability score** — "computes and displays a **testability score**." The score's formula, range, and the "low score" threshold that "warns" (FR13, and §2 prose) are undefined. Untestable until the scoring function is specified.

- **FR24** — "the report-quality gate uses it to **assess session effort**." "Assess session effort" is not verifiable; the [OPEN] item at line 289 admits the "≥30-min effort signal" tooling is undecided. As written, no one can test this FR.

- **NFR3** — "must **not become an unbounded backlog**." Aspirational, not measurable. Contrast with NFR1/NFR2 which correctly bind to a "configurable target" / "defined window." NFR3 needs a numeric queue-depth/age threshold to be an NFR rather than a wish.

- **FR15 / FR53 wording drift** — FR15 says auto-pause "when its bounty budget is exhausted (**or falls below the next possible payout**)"; FR53 says "when the bounty budget **can no longer cover the next possible payout**." Same intent, two phrasings. "Next *possible* payout" is ambiguous — is it the max band ($50, Severe) or the next *expected* payout? A builder needs to know whether a program with $40 left auto-pauses (can't cover a possible Severe) or stays live (can cover a Minor). This ambiguity directly affects founder spend and tester trust. Pin it down.

- **FR6 / FR54 "any required identity verification"** — both defer to "any required identity verification" without defining when it is required or what it checks. Untestable and, given cross-border payouts, non-trivial. (§1 prose calls this deferring "identity/KYC checks to the transaction moment," and the [ASSUMPTION] at line 291 parks KYC/TDS/W-8BEN as an out-of-PRD workstream — but FR6/FR54 still assert a gate whose trigger is undefined.)

---

## 3. Internal consistency

**Broken cross-reference — the "§11" problem (confirmed).** The PRD references **"§11"** for deferred items in **three places**: §8 IP-protection prose (line 224: "tracked as open items (see §11)") and §8 spam-control prose (line 228: "deferred to v1.1 (see §11)"). There is **no §11** in the document. The deferred items actually live under the unnumbered headings **"Deferred to v1.1"** (line 273) and **"Open Questions & Assumptions"** (line 284). Every "§11" reference is a dangling pointer. **Fix: renumber or replace "§11" with the actual heading names.** (Note: the section-number scheme itself is inconsistent — some sections are numbered 1–9 as `###` headings, but "Deferred to v1.1," "Open Questions," "Success Metrics," "NFRs," and "Decision Log" are all unnumbered `##` headings, so "§11" never had a referent.)

**Other cross-references check out.** §7 (revenue), §5 (severity), §6 (disputes), §4 (categories), §8 (trust) all resolve correctly. FR32→§7 and FR15↔FR53 back-references are valid.

**Minor prose/FR tension — "validated finding" dispute.** FR40 lets a founder dispute "a **validated** finding's validity." Once a mediator has marked a finding *valid* (FR39), calling the founder's challenge a dispute of a "validated" finding is fine — but §6 prose says a founder can dispute "a finding's *validity*," implying it can be challenged before/around validation. The state machine (submitted → intake → triaged/valid → disputed → 2nd-mediator-final) is implied but never drawn. A builder would benefit from an explicit finding **status lifecycle**; its absence lets FRs like FR40 (dispute), FR44 (mark fixed), FR46 (request clarification "before validity is finalized") reference states that are never formally enumerated.

**FR25 vs FR18/anonymity — consistent but tight.** FR25 (founder sees active-hunter count) is correctly qualified "aggregate; identities subject to tester anonymity settings," matching FR18 and NFR9. Good — no contradiction, worth noting it was handled.

---

## 4. Traceability of the money model

**This is the strongest part of the PRD, and it is coherent.** The flat-hosting-fee-is-the-only-revenue / bounties-100%-pass-through model is stated consistently and repeatedly, with the old model explicitly retired:

- §7 prose (line 192): "the platform takes no cut of bounties... **(This supersedes the forge's 25%-of-bonuses take model.)**"
- Decision Log (line 297): "**Money model (changed from forge):** flat hosting fee = BetaCheck revenue... 100% pass-through."
- [ASSUMPTION] (line 290): reinforces three distinct payments, only the hosting fee is revenue.
- FR48 (hosting fee → BetaCheck), FR49 (base-pay + bounty 100% pass-through), FR51 (full band amount to tester), FR56 (bonuses/tips 100% pass-through). The "What the founder pays" table (lines 196–200) maps every founder payment to its destination cleanly.

**No leak of the old "platform takes a cut" model was found.** The one place it appears (line 192) is an explicit callout that it is *superseded*. Good.

**Gaps in the money model (specification completeness, not model leakage):**

- **Hosting-fee refund / program cancellation.** If a founder pays the hosting fee, the program is admin-**rejected** (FR59) or the founder cancels before go-live, is the hosting fee refunded? Unspecified. Since the fee is charged to *list* (line 198) and admin approval can *reject* (FR58–FR59), the refund-on-rejection path is a real, immediate question with money attached.
- **Leftover bounty/base-pay budget.** When a program ends or is suspended (FR61), what happens to unspent, founder-funded, 100%-pass-through budget? Refund to founder? The pass-through framing implies it is not BetaCheck's — but no FR says it returns to the founder. Money left in limbo is an audit and trust problem (and interacts with NFR5's "reconcilable end-to-end" ledger).
- **Currency spread ownership.** §7 (line 206) says the "USD-billed / INR-paid spread ... remain[s] the marketplace's structural wedge," implying BetaCheck captures the FX spread as economics — but the revenue model says the *only* revenue is the hosting fee, and NFR6 says conversion is "transparent, recorded ... at payout time" (i.e., pass-through). **These are in mild tension:** is the FX spread BetaCheck revenue (contradicting "hosting fee is the only revenue") or fully passed through (then it is not a "wedge" BetaCheck monetizes)? Clarify whether the spread is captured, passed through, or merely a cost-advantage narrative.
- **Discretionary bonus funding (FR45/FR56).** FR45 says a discretionary bonus is "subject to program budget"; FR56 says it "draws from the founder's funded pools." Which pool — bounty budget, base-pay pool, or a separate tip top-up? If it draws from the bounty budget, a generous founder tip could auto-pause the program (FR15/FR53). This interaction is unspecified.

---

## 5. NFR coverage

**Well-covered and measurable:** NFR1 (triage SLA, configurable target), NFR2 (payout window, breaches surfaced), NFR4 (idempotent payouts, no double-pay — exactly right for money), NFR5 (auditable, reconcilable ledger), NFR6 (recorded FX at payout), NFR7–NFR9 (access scoping, encryption at rest/in transit, server-side role enforcement). NFR4 and NFR5 in particular are the correct instincts for a money-moving system.

**Unmeasurable:** NFR3 (see §2 above — "unbounded backlog" needs a number).

**Missing non-functional concerns for a real-launch two-sided money marketplace:**

- **Availability / uptime.** No availability SLO at all. A marketplace whose entire pitch is "overnight turnaround" (NFR1) needs a stated uptime target and a degraded-mode expectation. Absent.
- **Notifications as an NFR** (delivery reliability / latency). Tied to §1 gap — even beyond the missing *functional* notification requirement, there is no NFR for notification deliverability, which the SLA machinery silently assumes.
- **Observability / monitoring.** NFR3 mentions "monitored... with alerting" for the queue, but there is no general observability NFR (logging, tracing, financial-event monitoring, fraud/abuse signals). For a system with money and adversarial low-effort submitters (§8), this is a notable hole.
- **Compliance / legal / data-residency.** The [ASSUMPTION] at line 291 explicitly parks UPI compliance, TDS, W-8BEN, and entity structure as "outside this PRD's functional scope but **gating real launch**." That is an honest deferral, but it means the PRD, as handed to an architect, contains **no NFR** for data residency (India tester PII), GDPR-style data-subject rights, NDA/IP legal enforceability (FR57 records acceptance but no retention/exportability NFR), or KYC/AML for cross-border payout. For a "launch-grade" (§ Scope) product moving money India↔US, the absence of even a placeholder compliance NFR is a risk the architect must be told about, not left to discover.
- **Rate-limiting / abuse at the platform layer.** FR60 rate-limits *submissions*; there is no NFR for API/auth abuse, credential-stuffing on the payout-bearing accounts, or DoS. Given the app exposes founders' unlaunched apps to approved strangers, this matters.
- **Data retention / deletion.** No NFR on how long findings, recordings (FR24), guidelines snapshots, and PII are retained, or how deletion/account-closure propagates. Interacts with both compliance and NFR8.

---

## 6. Risks / holes a skeptic would flag — the single biggest thing

**The single biggest thing that makes this PRD unsafe to hand *as-is* to a UX designer or architect is the absence of a notification/communication system as a first-class requirement.**

Everything that makes this marketplace *work* — the overnight-turnaround wedge (NFR1), the ghost-SLA that auto-resolves against a non-responding founder (FR43), the dispute loop (FR40–FR42), payout confirmation (FR51/FR54), the mediation queue having work (FR38), admin SLA-breach response (FR47/NFR2/NFR3) — silently assumes that the right actor is told the right thing at the right time. The PRD says "surfaced to admins" and "receiving notifications" but never makes notifications a requirement. A **UX designer cannot design the tester dashboard, the founder inbox, or the dispute flow** without knowing the notification model (in-app? email? what triggers, what channels, what's real-time). An **architect cannot size the system** — notifications for a time-boxed SLA marketplace are an event-driven backbone, not a bolt-on. Handing this over without it guarantees a mid-build re-architecture.

**Runner-up holes a skeptic flags:**

1. **No finding-status state machine.** FRs reference states (submitted, intake-rejected, valid, rejected, needs-clarification, disputed, escalated, second-mediator-final, fixed, paid, duplicate) but never enumerate them or the legal transitions. This is the artifact both UX and architecture need first, and its absence lets subtle inconsistencies (e.g., FR40 "validated finding" dispute vs. §6 prose) hide.
2. **The "§11" dangling reference** (×3) — cosmetic but signals the deferral section was renumbered/moved after the body was written; any reader chasing an IP or spam deferral hits a dead link.
3. **Mediator supply is unspecified** — the entire trust/payout system routes through mediators (FR38, FR42) with no FR for how they are onboarded, assigned, paid, or what happens when a second mediator is unavailable. On a small early marketplace this is a live deadlock risk, and it is the mechanism the whole adjudication promise rests on.
4. **Payment-failure and refund paths are undefined** — success paths are specified; the production-reality failure paths (declined card, failed UPI, hosting-fee refund on admin rejection, leftover-budget return) are not, despite money being the product's core.

---

## Summary scorecard

| Dimension | Assessment |
|---|---|
| Completeness | **Fixes needed** — notifications, recovery, founder-view-findings, empty/error states, admin console, mediator supply |
| Testability / clarity | **Mostly good** — FR10, FR13, FR24, NFR3, FR15/FR53 wording need tightening |
| Internal consistency | **Good, one repeated broken ref** — "§11" ×3; add finding-status lifecycle |
| Money-model traceability | **Strong** — no old-model leak; specify refunds, leftover budget, FX-spread ownership, bonus funding source |
| NFR coverage | **Partial** — missing availability, observability, compliance placeholder, retention; NFR3 unmeasurable |
| Skeptic's biggest hole | **Missing notification system as a requirement** |

**Overall: PASS-WITH-FIXES.** Coherent, honest, well-scoped foundation; the money model is a highlight. Close the notification gap, add the finding-status lifecycle, fix the "§11" references, and specify the payment failure/refund paths before handing to design or architecture.
