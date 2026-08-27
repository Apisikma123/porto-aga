---
name: rtk
description: >
  Terminal Output Compression engine based on RTK (Rust Token Killer) principles.
  Strips boilerplate, groups repeated output, truncates verbose logs, and formats
  command results for minimal token footprint. Works both as CLI proxy (if RTK binary
  is installed) and as agent-level output compression rules.
  Use when running shell commands, reading build logs, processing test output,
  or any terminal-heavy workflow.
argument-hint: "[proxy|rules|both|status]"
license: MIT
---

# RTK — Terminal Output Compression Engine

Reduces token waste from verbose CLI/terminal output by 60-90%.

## Core Principles (Always Active)

### 1. Boilerplate Removal
- Strip ASCII art banners, decorative borders, progress bars, and spinner output.
- Remove "hint:" and "help:" lines from git, npm, cargo, and other CLI tools.
- Remove installation suggestions ("run `npm install ...`" when already installed).
- Remove version update notices and deprecation nag banners.
- Strip ANSI color codes and escape sequences from raw output.

### 2. Semantic Grouping
- Collapse repeated identical lines into count notation: `[ERROR] Connection timeout (×47)`.
- Group similar warnings: `⚠ 12 warnings (3 unused imports, 9 unused variables)`.
- Aggregate test results: `✓ 142 passed, ✗ 3 failed, ○ 2 skipped` instead of listing each.
- Summarize file listings when >20 files: show pattern + count, not every filename.

### 3. Deductive Truncation
- Stack traces: keep first frame + last 3 frames + error message. Skip middle frames.
- Build logs: keep first error, last 5 lines of output, skip successful compilation lines.
- `npm install` / `yarn install`: report only errors/warnings, skip "added N packages" detail.
- `git log`: summarize as `N commits, latest: <hash> <subject>` unless full log requested.
- `git diff`: keep only changed hunks, strip unchanged context beyond ±2 lines.

### 4. Command-Specific Compression Rules

| Command Pattern | Compression Strategy |
|---|---|
| `npm install/ci` | Only errors + final summary line |
| `npm run build` | Only errors + "Build successful" or failure details |
| `npm test/vitest/jest` | Pass/fail summary + failed test details only |
| `git status` | Compact: `M:3 A:1 D:0 ?:2` format |
| `git log` | `N commits` + latest 3 one-liners |
| `git diff` | Hunks only, ±2 context lines |
| `cargo build/test` | Errors + warnings summary, skip "Compiling" lines |
| `tsc` | Error list only, skip "Found N errors" if errors are listed |
| `eslint/prettier` | Error count + top 5 unique issues |
| `docker build` | Layer summary + errors only |
| `pip install` | Errors only, skip "Collecting/Installing" lines |
| `ls/dir` (>20 items) | Pattern summary: `48 files (32 .ts, 10 .css, 6 .json)` |

## Modes

### `/rtk proxy`
Use RTK binary as CLI proxy (requires `rtk` binary installed):
```
rtk <command>  # e.g., rtk git status, rtk npm test
```

### `/rtk rules`
Apply RTK compression principles as agent instructions (no binary needed).
Agent internally filters and compresses command output before processing.

### `/rtk both`
Use RTK binary when available, fall back to agent-level rules.

### `/rtk status`
Check if RTK binary is installed, show version and savings stats (`rtk gain`).

## Integration with /hemat

When used as part of `/hemat`, RTK rules are always active. The agent:
1. Applies compression rules BEFORE processing any command output.
2. Summarizes verbose output instead of quoting it verbatim.
3. Uses `StartLine`/`EndLine` on command logs to read only relevant sections.
4. Never dumps raw multi-KB terminal output into responses.

## Persistence
Active every response across whole session once triggered until `/rtk off` or `/hemat off`.
