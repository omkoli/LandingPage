# BetaCheck Finding Taxonomy — v0

*A draft. Meant to be attacked, not admired.*

## Scope

**In scope:** functional bugs, spec-conformance failures, task-blockers, data-integrity issues, first-run failures in a founder's shipped MVP.

**Out of scope (v1):**
- Security vulnerabilities → route to Hackerone/Bugcrowd, not BetaCheck
- Design/aesthetic preferences ("I don't like the color")
- Performance benchmarking
- Browser edge cases unless founder specifies supported browsers
- Anything requiring admin/backend access

## Payment structure

- **Base:** ~$8 (₹700) per completed report meeting the quality checklist
- **Bonus per validated finding:** Trivial $0 · Minor $3 · Major $10 · Critical $25
- **Per-report bonus cap:** $60 (protects founder from runaway spend)
- **Founder buys reports in packs:** e.g., 5-pack = $75 base + up to $300 bonuses

## Report quality checklist (base pay gate)

1. ≥ 30 min actual session time (tracked via BetaCheck browser extension or screen-record)
2. Report template fully filled — all sections addressed even if "no finding"
3. At least one artifact (screenshot, clip, or console log) per claimed finding
4. Tester attests to fresh browser/account where required

If any check fails → base pay held pending triage. No bonuses paid on a failed base.

## The five finding categories

### A. Broken Path
**Definition:** A user action produces a hard failure — 404, 500, blank screen, uncaught JS error, infinite loading > 30s.
**Evidence:** Video of repro + browser console screenshot showing error.
**Valid example:** Clicking "Export CSV" throws `TypeError: undefined is not a function`, blocking the export.
**Invalid example:** "The page took 3 seconds to load, that's slow." → Performance ≠ broken path.
**Default tier:** Minor ($3) if workaround exists · Major ($10) if it blocks a core flow · Critical ($25) if it blocks signup or payment.

### B. Spec-Conformance Failure
**Definition:** App behavior contradicts a specific claim in the founder's guidelines document.
**Evidence:** Quoted line from guidelines + video showing contradictory behavior.
**Valid example:** Guidelines say *"Pro users get unlimited exports."* App still shows "3 exports remaining" after Pro upgrade.
**Invalid example:** "I thought it should work like Notion." → Not a spec violation if founder never claimed Notion parity.
**Default tier:** Minor ($3) for cosmetic mismatch · Major ($10) for functional mismatch · Critical ($25) for paid-feature mismatch (billing/access).

### C. Task-Blocker
**Definition:** A user following the intended flow cannot complete a core action listed in the guidelines, despite reasonable attempts.
**Evidence:** Full-flow video showing intent, attempts, and where the flow dies.
**Valid example:** Guidelines list "Create a project" as a core action. Clicking "New Project" opens a modal with a disabled Submit button; no visible way to enable it.
**Invalid example:** "I couldn't figure out how to invite a teammate" — when the guidelines don't mention teammate invites as a v1 feature.
**Default tier:** Major ($10) if workaround exists · Critical ($25) if the core promise fails.

### D. Data Integrity Issue
**Definition:** Data is lost, duplicated, or silently corrupted through normal use.
**Evidence:** Before/after video with visible data + description of the action that caused the change.
**Valid example:** Editing a project name, hitting save, seeing "Saved!", refreshing — the name reverts to old value.
**Invalid example:** "I don't like that it doesn't autosave." → UX preference, not integrity.
**Default tier:** Major ($10) if recoverable · Critical ($25) if data is silently lost or duplicated in ways affecting billing/records.

### E. First-Run Failure
**Definition:** A new user following the intended onboarding cannot reach the "aha moment" defined in the guidelines.
**Evidence:** Fresh browser + fresh account video, from signup through the intended activation event.
**Valid example:** Guidelines define aha moment as "user runs their first AI query." Onboarding funnels user into an empty dashboard with no prompt or CTA to run a query.
**Invalid example:** "Onboarding felt long." → Perception, not failure. Needs a concrete step where user stalls.
**Default tier:** Major ($10) if user reaches aha but confused · Critical ($25) if the aha moment is never reachable.

## Trivial-tier catch-all

Testers may flag typos, minor copy issues, and small cosmetic misalignments in a **Trivial** section of the report. These count toward report completeness but pay $0 bonus. They exist so testers don't feel obligated to inflate them into false Minor findings.

## Adjudication rules

1. **First-submit wins on duplicates.** Later reports mentioning the same finding get base pay but no bonus for that finding.
2. **Dispute window:** Founder has 72h to dispute a validated finding. BetaCheck triager reviews evidence against the definition. Decision is final.
3. **Tester dispute:** Tester has 72h to escalate a rejected finding to a second triager. Second decision is final.
4. **BetaCheck fee:** Take 25% of bonuses paid, plus a flat platform fee on base pay ($2 of the $8 base is platform).

## Open questions to resolve before v1

- Extension vs. screen-recording for session-time tracking — build vs. buy?
- How does the founder submit their "guidelines" document — freeform Markdown, structured template, or a wizard?
- What's the minimum guidelines quality bar before a program can go live? (Un-guided programs = all UX findings become subjective, which breaks Category B and C entirely.)
- Tester ranking / reputation system — needed by launch or deferred?
