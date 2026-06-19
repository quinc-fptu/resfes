# Rule: Response Discipline, Token Optimization & Anti-Slop Protocols

> **Severity: CRITICAL** — Agent MUST strictly adhere to these rules to minimize token usage, optimize response speed, and eliminate AI Slop.

---

## 1. Response & Token Discipline
- **Code-First & Direct Answer:** Go straight to the solution or code. DO NOT use conversational preambles/outro fillers (e.g., *"Sure, I can help...", "Understood, here is...", "Hope this helps..."*).
- **No Verbose Explanations:** Code self-documents its structure. Only explain **WHY** a change was made if there is a non-obvious rationale (complex algorithm, side-effects). DO NOT explain **WHAT** was changed or **HOW** the steps were taken.
- **Micro-Summary (Max 2 lines):** At the end of a turn, provide a 1-2 line summary of which files were updated and the main action. Do NOT list line-by-line changes.
- **Direct Questions:** Ask clarifying questions directly in a single, short sentence without explaining why the question is needed.
- **Language Preference:** All internal instructions, rules, code comments, and documentation MUST be written in English for token optimization. However, when communicating with the user, the agent should reply in Vietnamese if the user initiates/communicates in Vietnamese or prefers it. Crucially, all user-facing web content, copywriting, UI labels, and localization assets MUST remain in the target project's original source language (e.g., Vietnamese) to preserve UI integrity.

---

## 2. Diff & Code Output Discipline
- **Diff-Only Output:**
  - Only print modified code blocks. Use `// ... existing code ...` or `/* ... existing code ... */` placeholders for unchanged surrounding code.
  - NEVER reprint entire large files when editing a few lines.
- **No Code Skips / Placeholders:**
  - When writing or editing code, write the full logic block.
  - DO NOT insert empty placeholders that break compilation or require manual implementation (e.g., `// TODO: Implement logic here`).
- **No Comment Bloat:**
  - DO NOT write comments that restate the code (e.g., `let count = 0; // initialize count to 0`).
  - Only write comments for complex business rules or hacky workarounds.

---

## 3. Anti-Slop Protocols
- **No Self-Praise / Meta-Criticism:**
  - Do NOT describe your code as *"clean, robust, optimized, extensible, or easy to maintain"*. Deliver working code and let compilation/linter/tests judge.
- **Realistic Mock Data:** Use realistic mock values (real names, standard IDs, actual domains) that fit the project context. Avoid placeholders like `dummy-data`, `test-123`, `example.com`.
- **Limit Emoji Usage:** Do NOT use emojis in technical responses unless they represent critical warning signs (`⚠️`, `❌`, `✅`).

---

## 4. Context Preservation
- Do NOT read the same file multiple times in a single turn/session.
- Avoid wide-scope `grep_search` without path filters (Includes/Excludes) to prevent context pollution.
- Only load and read skills that are directly relevant to the current task.
