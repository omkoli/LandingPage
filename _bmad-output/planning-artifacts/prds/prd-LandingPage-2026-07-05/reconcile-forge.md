# Forge → PRD Reconciliation — Dropped / Under-Specified Content

**PRD:** `prd-LandingPage-2026-07-05/prd.md`
**Sources:** `forged-idea.md`, `taxonomy-v0.md`, `guidelines-wizard-v0.md`
**Date:** 2026-07-05

This reconciliation lists content present in the source documents that was **dropped, weakened, or under-specified** in the PRD and is **not** one of the pre-agreed deliberate divergences (open bug-bounty, CVSS rubric, flat-fee revenue, dropped founder-provisioning, deferred reputation/spam-filter/kill-switch/redaction). Deliberate divergences are excluded per instruction.

---

## A. High-impact drops (should be carried into the PRD)

### A1. The "10-minute wizard ceiling" as a validated success gate / aha-moment insight
- **Source:** `forged-idea.md` §"What has to be true before writing code" — *"Five vibe-coded MVP founders sit down with the wizard. Three or more complete it end-to-end within 10 minutes and produce guidelines that are testable. If that fails, the model needs a rethink, not another design cycle."* Also `guidelines-wizard-v0.md` principle 1.
- **PRD state:** The PRD mentions "a 10-minute ceiling" once (FR/§2 prose) as a design principle, but **does not carry it as a measurable acceptance criterion or a pre-code validation gate.** The forge treats this as a business-make-or-break test.
- **Gap:** The single most load-bearing kill-criterion in the forge — "3 of 5 founders complete in ≤10 min producing testable guidelines, else rethink the model" — is absent from Success Metrics and NFRs. There is no NFR on wizard completion time, no target completion rate, and no funnel/drop-off metric for wizard abandonment (which the forge calls a business-failure condition).
- **Recommendation:** Add an NFR/success-metric for wizard completion rate and median completion time; add "wizard completion / abandonment" to Success Metrics (currently absent despite being the top load-bearing dependency).

### A2. Wizard save/resume, LLM-drafted aha moment, one-click confirm-per-claim
- **Source:** `forged-idea.md` §"Load-bearing dependencies": *"Save/resume, LLM-drafted aha moment, and one-click confirm on auto-extracted claims are all required."* Also `guidelines-wizard-v0.md` principle 2 ("Founder edits, doesn't compose from scratch") and Cracks-parked: *"Auto-extraction hallucination — source snippets + confirm-per-claim."*
- **PRD state:** PRD FR9 covers auto-extraction/pre-fill generically. It **does not** require: (a) **save/resume** of a partially completed wizard, (b) **LLM-drafting** of the aha moment specifically, or (c) **confirm-per-claim with source snippets** as the hallucination guard.
- **Gap:** Three explicitly "required" mechanisms are collapsed into one generic pre-fill FR. Save/resume is entirely missing. The anti-hallucination pattern (show source snippet, confirm each extracted claim) is missing — the forge parked it as a *design requirement*, not a deferral.
- **Recommendation:** Add FRs for save/resume, per-claim confirmation UI with source-snippet display, and LLM-drafted aha moment.

### A3. Cold-start / concierge strategy and founder-demand distribution
- **Source:** `forged-idea.md` §Locked: *"Cold start: hybrid — manual concierge on tester supply (Plan A) + AI-tool platform distribution partnership on founder demand (Plan C). Friends seed the demo cohort, not the economics."*
- **PRD state:** **Entirely absent.** The PRD has no go-to-market, cold-start, or supply-seeding section.
- **Gap:** The cold-start plan is a locked decision in the forge. While a PRD is functional-scope, the concierge-on-supply model has product implications (the manual tester-approval queue in FR2 *is* the concierge lever, but the PRD never names it as the cold-start mechanism). The "friends seed the demo cohort, not the economics" nuance — a guard against fooling yourself with friendly early users — is lost.
- **Recommendation:** At minimum note the cold-start strategy as an assumption/dependency; the approval-queue-as-concierge and "friends ≠ economics" nuance should be preserved as context.

### A4. Cross-border payment ops workstream — partially carried, one nuance dropped
- **Source:** `forged-idea.md` Cracks-parked: *"Cross-border payment ops (Payoneer/Wise, TDS, W-8BEN, entity) — legal + finance workstream."*
- **PRD state:** Carried as an **[ASSUMPTION]** in §Open Questions (UPI payout compliance, TDS, W-8BEN, entity structure). **Good — mostly preserved.**
- **Gap (minor):** The forge listed **Payoneer/Wise** as tester payout rails; the PRD narrowed the v1 rail to **UPI/INR only** (FR54, FR6 mentions Payoneer/Wise as examples but §7 locks to UPI). This is a reasonable v1 simplification but is a *narrowing* not flagged as a deliberate divergence — worth an explicit note that multi-rail (Payoneer/Wise) was dropped for v1.

---

## B. Taxonomy mechanisms dropped or weakened

### B1. The ≥30-minute session-time rule (report-quality checklist item #1)
- **Source:** `taxonomy-v0.md` §Report quality checklist item 1: *"≥ 30 min actual session time (tracked via BetaCheck browser extension or screen-record)."*
- **PRD state:** The PRD's report-quality gate (§4, FR30) lists template-completeness, one-artifact-per-finding, session evidence attached, and fresh-browser attestation — but **drops the concrete ≥30-min session-time threshold.** It appears only obliquely in an [OPEN] item ("≥30-min effort signal") rather than as a gate rule.
- **Gap:** The specific ≥30-min minimum is a substantive quality-gate criterion that was demoted from a rule to an open question. This weakens the base-pay gate.
- **Recommendation:** Restore ≥30-min (or an explicit configurable minimum) as a named report-quality-gate criterion, not just an open tooling question.

### B2. "Trivial section exists so testers don't inflate" — rationale dropped
- **Source:** `taxonomy-v0.md` §Trivial-tier catch-all: *"They exist so testers don't feel obligated to inflate them into false Minor findings."*
- **PRD state:** The PRD keeps the Trivial category (pays $0, counts toward completeness) but **drops the anti-inflation rationale.**
- **Gap:** The *why* — a deliberate anti-gaming mechanism against severity inflation — is lost. This rationale matters because it justifies keeping a $0 category and connects to the PRD's own "finding validity rate" counter-metric. Under-specified, not just cosmetic.
- **Recommendation:** Preserve the anti-inflation rationale as design intent behind the Trivial category.

### B3. Per-category default-tier heuristics dropped
- **Source:** `taxonomy-v0.md` — each category (A–E) carries a **"Default tier"** rule mapping the bug shape to Minor/Major/Critical (e.g., Broken Path: *Minor if workaround · Major if blocks core flow · Critical if blocks signup/payment*; Task-Blocker: *Major if workaround · Critical if core promise fails*; etc.).
- **PRD state:** The PRD replaces fixed tiers with the CVSS-style 4-dimension score (a **deliberate divergence** — excluded). **However**, the per-category default-tier heuristics also encoded *guidance for scoring* (e.g., "billing/payment broken = Critical") that maps directly onto the new rubric's Impact dimension (3 = "Data loss / billing / payment broken"). The mapping is preserved in spirit in the rubric, so this is **largely covered** — noted here only for completeness. **Not a true gap.**

### B4. Valid/Invalid worked examples per category dropped
- **Source:** `taxonomy-v0.md` — each category has explicit **Valid example / Invalid example** pairs (e.g., B: "Pro users get unlimited exports" still shows "3 remaining" = valid; "I thought it should work like Notion" = invalid) and **Evidence requirements** (e.g., E requires *fresh browser + fresh account video*).
- **PRD state:** The PRD's category table (§4) gives short definitions and citation rules but **drops the valid/invalid boundary examples and the per-category evidence specifics.**
- **Gap:** These examples are the adjudication boundary conditions that make "matching not judgment" actually work for mediators. Category E's *fresh-browser/fresh-account* evidence requirement is only generically referenced ("fresh-browser/account attestation where required") and not tied to E specifically. Under-specified for the mediation tooling.
- **Recommendation:** Carry the per-category evidence requirements (esp. E's fresh-browser/account) and retain the valid/invalid examples as mediator guidance / acceptance criteria.

### B5. "Un-guided programs break Categories B and C entirely" — minimum-guidelines rationale
- **Source:** `taxonomy-v0.md` Open questions: *"What's the minimum guidelines quality bar before a program can go live? (Un-guided programs = all UX findings become subjective, which breaks Category B and C entirely.)"*
- **PRD state:** The PRD states the guidelines doc is "load-bearing" and has a testability score (FR13) that **warns but does not block.** The forge's open question asked whether there should be a **minimum quality bar to go live** — the PRD answered "soft warn, no hard block" but **did not surface the underlying risk** (low-score programs make B/C findings subjective, undermining the whole adjudication model).
- **Gap:** The decision to make testability a soft-warn (not a hard gate) is defensible, but the forge's explicit warning that this directly risks collapsing Categories B/C into subjectivity is dropped. This is a risk the PRD should carry, especially given admin program-approval (FR58) could enforce a floor.
- **Recommendation:** Note the B/C-collapse risk of low-testability programs and clarify whether admin approval (FR58) enforces a de-facto quality floor.

---

## C. Wizard anti-patterns table — preservation check

`guidelines-wizard-v0.md` §"Anti-patterns the wizard must actively prevent":

| Anti-pattern | Wizard countermeasure (source) | Preserved in PRD? |
|---|---|---|
| **Vague claims** ("intuitive", "fast") | Adjective-density regex/LLM check → force rewrite | **Yes** — FR10 (rejects unfalsifiable claims, prompts rewrite). |
| **Over-claiming** (features not built) | "Verify this feature works in the URL" — wizard tries to reach it | **Partial** — FR9/FR10 imply extraction/validation, but the *"only include LIVE features / wizard tries to reach the feature"* check (wizard Step 4 warning) is **not** an explicit FR. Under-specified. |
| **Under-specifying** (2 actions when app has 20) | Suggest actions from app-nav crawl; min 3 / max 8 core actions | **Dropped** — the **3–8 core-actions bound**, the "min 3 / max 8, >8 = over-scoping v1" rule, and "suggest additional actions from crawl" are **not in any FR.** This is a concrete, testable wizard rule that was lost. |
| **Guidelines drift** (live app changes) | Every 30 days: re-crawl, flag stale claims, prompt re-publish | **Deferred** — PRD defers "guidelines drift re-crawl" to v1.1 (Deferred list). **BUT** the forge/wizard specified *passive 30-day re-crawl* as a v1-ish mechanism (forge parked "7-day passive re-crawl … active per-report re-crawl in v1.1"). The PRD deferred **both** passive and active to v1.1. Passive re-crawl being pushed to v1.1 is a **narrowing not listed among the agreed deferrals** — flag it. |
| **Founder ghosts disputes** | Auto-decision after 96h → default rules apply | **Yes** — FR43 + ghost-SLA (96h). Preserved. |

**Key wizard gaps from this table:**
- **C1. The 3–8 core-actions bound and over-scoping nudge (Step 2)** — dropped entirely. Concrete, testable, load-bearing for Category C generation.
- **C2. Over-claiming "verify feature reachable at URL" + "only LIVE features" warning (Step 4)** — under-specified.
- **C3. Passive 30-day drift re-crawl** — deferred to v1.1, but this was arguably a v1 mechanism in the sources; the deferral of the *passive* variant is not in the agreed-divergence list.

---

## D. Wizard step-detail drops (Steps 1–7 granularity)

The PRD lists the 7 step titles but drops per-step validation detail that the wizard v0 specified:

- **D1. Step 1 field validations** — one-line description **6–20 words**, app URL must **return 200 / be reachable**. Not in PRD FRs.
- **D2. Step 3 aha-moment nuances** — the fixed prompt template *"A new user has succeeded when they ___"*, and the **"signup is a proxy, not the moment" warning**. Also Sally's insight: *"the highest-value question the wizard asks — many founders learn something about their own product just answering it."* This qualitative founder-experience insight (aha-moment step as a product-clarity moment) is dropped.
- **D3. Step 5 skip-warning** — *"90% of founders find at least one out-of-scope area. Skipping this often costs you 1–2 wasted reports."* — the nudge copy/behavior is dropped.
- **D4. Step 7 testability-score composition** — the PRD says a score is computed (FR13) but drops **what it's computed from** (vagueness density, % core actions covered by test-credentials, aha-moment specificity) and the **<60% warning threshold** (`<60%` in wizard; the PRD gives no threshold).
- **D5. The compiled guidelines doc format** — the wizard v0 specifies the exact **compiled doc structure testers see** (WHAT IT IS / CORE ACTIONS / AHA MOMENT / BEHAVIORAL CLAIMS / OUT OF SCOPE / HOW TO GET IN / BOUNTY TIERS) and the **citation-by-section mechanism** ("violates BEHAVIORAL CLAIMS bullet 2" / "core action 3 blocked"). The PRD references citing "a specific line of the guidelines snapshot" (FR28) but **drops the structured-section citation format** that makes line-citation machine-checkable. Under-specified for the intake gate.

---

## E. Forge "Killed" list — narrowing rationale worth preserving

Not gaps per se, but the forge's **Killed** decisions carry guard-rails the PRD should not silently reverse:
- *"Freeform 'business logic flaws' — narrowed to spec-conformance to dodge Hackerone territory."* — The PRD's out-of-scope (security → HackerOne) preserves the boundary, but the **rationale** (spec-conformance is deliberately narrow to avoid Hackerone overlap) is worth keeping as design intent.
- *"'AI-generated app' as a segment — trend ≠ moat."* — PRD targets vibe-coded MVP founders as the customer (correct) without over-indexing on the trend. Preserved in spirit.

---

## F. Summary — most important dropped / under-specified items

1. **10-minute wizard completion as a validated kill-gate / success metric** — the forge's top make-or-break test (3-of-5 founders, ≤10 min, testable output) is not a PRD metric or NFR. **(A1)**
2. **Wizard save/resume + confirm-per-claim-with-source-snippet + LLM-drafted aha moment** — three explicitly "required" mechanisms collapsed into one generic pre-fill FR; save/resume and the hallucination-guard confirm-per-claim are missing. **(A2)**
3. **≥30-minute session-time rule** demoted from a report-quality-gate criterion to an open tooling question, weakening the base-pay gate. **(B1)**
4. **3–8 core-actions bound + over-scoping nudge (wizard Step 2)** and the **structured compiled-guidelines-doc / section-citation format** — dropped; both are load-bearing for Category C generation and machine-checkable intake citation. **(C1, D5)**
5. **Passive 30-day guidelines-drift re-crawl** deferred to v1.1 — a narrowing not in the agreed-divergence list. **(C3)**
6. **Cold-start / concierge + "friends seed the cohort, not the economics"** strategy entirely absent; anti-inflation rationale for the Trivial tier and the "un-guided programs break Categories B/C" risk also dropped. **(A3, B2, B5)**
