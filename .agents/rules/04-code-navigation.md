# Rule: CRITICAL — Codegraph-First Navigation (No Blind Grepping)

> **Violation = Wasted context tokens. No exceptions except those listed below.**

## Mandatory Priority Order
```
codegraph_* → view_file(narrow range) → NEVER grep search the entire project
```

## Quick Reference Table

| Information Needed | Tool |
|---|---|
| Where a component/symbol is used | `codegraph_callers` |
| What components/symbols are called | `codegraph_callees` |
| Impact range of modifying a file | `codegraph_impact` |
| Find component/hook/type by name | `codegraph_search` |
| Folder/module structure | `codegraph_explore` |
| Flat file list | `codegraph_files` |
| Signature and deps of a node | `codegraph_node` |
| Index status | `codegraph_status` |

## Forbidden Behaviors

```
❌ grep_search("ComponentName", "/src")         → ✅ codegraph_search("ComponentName")
❌ grep_search("component-file", "/src")        → ✅ codegraph_callers("path/to/file.tsx")
❌ list_dir("/src/components")                  → ✅ codegraph_explore("src/components")
❌ view_file("page.tsx") — without line range   → ✅ codegraph_node → determine lines → view_file(range)
```

## Valid Exceptions (Must Try Codegraph First)

| Condition | Allowed Tool |
|---|---|
| Config/data files (`.json`, `.env`, `.md`) | ✅ grep |
| Codegraph fails after multiple attempts | ✅ Narrow grep on 1 file |
| Find JSX string literal in a known file | ✅ Grep 1 file |

## Token Overhead Comparison
- Global project `grep_search` ≈ 1,000–5,000 output tokens.
- `codegraph_*` calls ≈ 50–200 tokens — highly targeted and faster.

---

## 4. Codegraph Optimization for Split-File Components
When UI or logic is separated across files (e.g., main component `ProductCard.tsx`, custom hook `useProductFilter.ts`, sub-component `ProductItem.tsx`, and `helpers.ts`):
- **DO NOT read each file separately using `view_file` multiple times or loop grep calls.** This wastes context tokens.
- **Use Unified `codegraph_explore` (Single-call Explore):** Invoke `codegraph_explore` once, passing in all related symbols (e.g., query `"ProductCard useProductFilter ProductItem"`). The tool returns the source code of these files grouped in a single response payload.
- **Check Overall Impact with `codegraph_impact`:** When modifying an API or types of a hook/sub-component, run `codegraph_impact` on the parent component or main hook to audit the impact range across all files in one go.
