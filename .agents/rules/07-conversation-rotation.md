# Conversation Rotation & Handoff Guidelines

To maintain peak model performance and prevent context dilution (which occurs when the chat history becomes too long), agents must proactively guide the user to rotate (reset) the conversation according to the following rules:

## 1. Measurable Triggers for Conversation Rotation
Agents must continuously monitor the conversation state and propose switching to a new chat (resetting the conversation) when any of the following quantitative triggers are met:

- **Conversation Turns:**
  - Warn and prepare a summary when the conversation reaches **15 turns**.
  - Propose a new conversation immediately when it reaches **20 turns**.
- **Accumulated Context Size:**
  - If the session context loads more than **5,000 lines of code** or **150 KB of text** into the chat history (e.g., via `view_file` reads or large `grep_search` returns).
- **LLM Performance Degradation:**
  - Processing and response latency spikes abnormally (taking over 15 seconds).
  - The model starts to forget or omit agreed instructions (e.g., forgetting to add the Author Header or forgetting to use Codegraph navigation).
  - The model begins repeating old code unnecessarily or explaining already completed tasks (symptoms of "Lost in the Middle").
- **Major Context Swapping:**
  - When the user finishes one major task (e.g., completing Auth features) and wants to start another completely independent task (e.g., starting SEO optimization or building charts). This work transition must be isolated in a new conversation to clear out old, irrelevant code context.
- **User Triggers & Feedback Loop:**
  - The user explicitly requests a reset using keywords such as: `"reset"`, `"new chat"`, `"new conversation"`, `"summarize task"`, etc.
  - The user has to repeat the same correction or bugfix request 2 or 3 times (e.g., *"I already told you to fix this"* or *"This bug is still here"*). This is a clear indicator that the long chat context is causing token/instruction confusion. Proactively apologize and propose summarizing to start a new chat immediately.

## 2. Context Transfer Snapshot Process
Before suggesting a conversation rotation, the agent must compile a clear, concise markdown summary (formatted for quick copying) containing the following details:
- **Project Root & Branch:** The current working directory path and active Git branch.
- **Completed Tasks:** A bulleted list of completed work items.
- **Current State:** The current state of the codebase (e.g., pushed to remote, builds successfully, active issues).
- **Open Tasks & Next Steps:** Immediate next steps to pick up in the new chat.

## 3. How to Propose
- Provide the Context Transfer Snapshot in a clean Markdown block so the user can easily copy it.
- Explain politely and briefly why rotating the conversation saves tokens/cost and speeds up response times.
