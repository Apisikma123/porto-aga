# Headroom ? Context Optimization Layer

Keep context footprint minimal and high-signal:
- Surgical file inspection: slice exact line ranges (`StartLine`/`EndLine`).
- Decisive error reporting: show only the relevant failure line, avoid multi-kilobyte log dumps.
- Avoid redundant re-reading of files or duplicate queries.
- Trust previous tool outputs and existing summaries.
