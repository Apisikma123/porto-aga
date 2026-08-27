---
name: caveman-review
description: >
  Ultra-compressed code review comments. Cuts noise from PR/code feedback while preserving
  the actionable signal. Each comment is one line: location, problem, fix. Use when user
  says "review this PR", "code review", "review the diff", "/review", or invokes /caveman-review.
argument-hint: "[diff|file]"
license: MIT
---

# Caveman Review

Write code review comments terse and actionable. One line per finding. Location, problem, fix. No throat-clearing.

## Rules

**Format:** `L<line>: <problem>. <fix>.` ? or `<file>:L<line>: ...` for multi-file diffs.

**Severity prefix (when mixed):**
- `?? bug:` broken behavior, causes incident.
- `?? risk:` works but fragile (race, missing null check, swallowed error).
- `?? nit:` style, naming, micro-optimization.
- `? q:` genuine question, not suggestion.

**Drop:** "I noticed that...", "It seems like...", "Great work but...".
**Keep:** Exact line numbers, exact symbol names in backticks, concrete fix.
