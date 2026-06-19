# Context Discipline & Anti-Context Pollution

To ensure maximum model performance, conserve token quota, and prevent token noise/hallucinations (e.g., "lost in the middle" effect), agents must strictly adhere to the following context management rules:

## 1. Targeted File Reading
- **Limit Full File Reads:** Do not read entire large files (>150 lines) if you only need a specific class, method, or section.
- **Utilize Line Ranges:** Always specify precise `StartLine` and `EndLine` parameters when calling `view_file` to keep the context footprint small.
- **No Redundant Reads:** Do not read the same file multiple times within the same session. Keep active details in memory.

## 2. Smart Search & Directory Exclusions
- **Exclusion Filters:** Never run global searches (`grep_search`) without defining directory boundaries or using the `Includes` / `Excludes` parameters.
- **Ignore Build Artifacts:** Ensure search commands bypass heavy directories such as `node_modules/`, `.git/`, `.next/`, `build/`, `dist/`, `.cache/`, and local DBs (e.g., `.codegraph/`).
- **Targeted Paths:** Run search and analysis tools on specific subdirectories (e.g., `src/components/` instead of the root folder) whenever possible.

## 3. Minimalist Skill & Rule Loading
- **Load Only What is Needed:** Only reference or load skills and rules directly relevant to the current task. Do not bulk-load unrelated guidelines.
- **Declarative Actions:** State the goal and target files clearly before launching tools to maintain a clean logic path and prevent unnecessary tool runs.

## 4. Efficient Code Modification (Diff-Only)
- **Avoid Overwriting Large Files:** Do not replace the entire content of a file. Use `replace_file_content` or `multi_replace_file_content` targeting small, exact chunks.
- **Concise Reporting:** When code is updated, only output a brief summary (1-2 lines) pointing to the file links. Do not print large chunks of code back into the chat window.

## 5. Subagent Lifecycle & Temporary Assets
- **Reuse Subagents:** Use `ReusedSubagentId` when initiating browser subagents to retain existing cookies/state, instead of launching fresh subagents that bloat history.
- **Clean Temporary Files:** Save test scripts and experimental assets in the `<appDataDir>\brain\<conversation-id>/scratch/` folder. Delete them or ensure they are excluded via `.gitignore` before concluding the task.
