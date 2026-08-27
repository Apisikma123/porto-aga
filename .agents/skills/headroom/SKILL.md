---
name: headroom
description: >
  Context Compression and Retrieval (CCR) optimization layer. Reduces LLM input token usage
  by 60-90% by optimizing context footprint: surgical file reads, targeted searches,
  compact error log extraction, and preventing repetitive re-fetching.
  Use when user says "headroom", "save input tokens", "compress context", "context optimization",
  "hemat token", or when managing large codebases and long sessions.
argument-hint: "[status|optimize|check]"
license: MIT
---

# Headroom (Context Compression & Retrieval Layer)

Optimize context window efficiency and prevent context rot.

## Core Principles

1. **Surgical Inspection over Full Sweeps:**
   - Always read specific line slices (`StartLine`/`EndLine`) instead of dumping 800+ lines into context when only a small section is needed.
   - Use tight, scoped search queries in ripgrep with file filters rather than broad unbounded directory scans.

2. **Decisive Error Extraction:**
   - When command or build output fails, extract only the decisive error snippet and stack trace. Never dump megabytes of redundant log lines into context.

3. **Trust Kept Summaries (CCR Literacy):**
   - If an artifact, previous tool result, or file summary already contains the needed state, do NOT re-read or re-query the same content redundantly.
   - Re-fetch only when a concrete missing gap is identified.

4. **Batch & Multi-Replace Operations:**
   - Prefer single multi-chunk modifications over multiple consecutive roundtrips for non-contiguous edits in the same file.

5. **No Redundant Repetition:**
   - When updating artifacts or files, do not re-paste full file contents in chat output. Point to the artifact / diff directly.
