# BetaCheck — forged idea

**A bug-bounty-shaped marketplace for pre-launch MVPs.** Founders publish a program describing what their app does; India-based testers hunt against that spec; findings are paid as a per-report base plus severity-weighted bonuses; adjudication is mechanical because every finding must cite the founder's own guidelines.

## Locked

- **Customer:** solo founders with a shipped-but-unlaunched MVP, mostly vibe-coded (Lovable, v0, Bolt, Cursor), budget-sensitive.
- **Wedge:** INR-paid India tester supply, USD-billed founder revenue, overnight turnaround from time-zone offset.
- **Scope:** functional bugs, spec-conformance failures, task-blockers, data-integrity issues, first-run failures. **Not security** — that's Hackerone's job.
- **Payment:** ~$8 base per completed report + per-finding bonuses ($3 minor / $10 major / $25 critical), per-report bonus cap $60, founders buy report packs.
- **Adjudication:** every finding in Categories B/C/E must cite a specific line of the founder's guidelines document. Triage is matching, not judgment.
- **Programs:** public + private toggle; private deferred to v1.1 after tester ranking exists.
- **Cold start:** hybrid — manual concierge on tester supply (Plan A) + AI-tool platform distribution partnership on founder demand (Plan C). Friends seed the demo cohort, not the economics.
- **AI:** filters spam and duplicates; humans triage disputes.

## Killed

- "AI-generated app" as a segment justified by trend timing — trend ≠ moat.
- Pure per-bug bounty at MVP-founder budgets — economics don't math, cold-start impossible.
- Pure per-report Maze-clone — collapses differentiation, Maze wins on scale.
- Synack-shaped enterprise pivot — customer mismatch, wrong budget.
- "AI + HITL validation" as adjudicator — kept as filter only.
- Freeform "business logic flaws" — narrowed to spec-conformance to dodge Hackerone territory.

## Load-bearing dependencies

- **Guidelines Wizard** (see `guidelines-wizard-v0.md`) — if founders bounce at wizard completion, business fails. Save/resume, LLM-drafted aha moment, and one-click confirm on auto-extracted claims are all required.
- **Finding taxonomy** (see `taxonomy-v0.md`) — 5 categories + Trivial catch-all, tiered bonuses, citation-based adjudication.

## Cracks parked, not killed

- Pre-launch trust & IP paranoia (NDA click-through, screenshot redaction, kill-switch access revoke) — handle as wizard step 8 in planning.
- Auto-extraction hallucination — source snippets + confirm-per-claim.
- Guidelines drift — 7-day passive re-crawl, active per-report re-crawl in v1.1.
- Tester ranking/reputation system — needed before private programs unlock.
- Cross-border payment ops (Payoneer/Wise, TDS, W-8BEN, entity) — legal + finance workstream.

## What has to be true before writing code

Five vibe-coded MVP founders sit down with the wizard. Three or more complete it end-to-end within 10 minutes and produce guidelines that are testable. If that fails, the model needs a rethink, not another design cycle.

## Downstream

Can feed `bmad-spec`, `bmad-prd`, or `bmad-prfaq`.
