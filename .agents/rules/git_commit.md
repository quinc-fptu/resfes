# Git Commit Rule

This document defines the rules and guidelines for Git commits to maintain a clean, readable, and automated version history.

## Conventional Commits Format
Every commit message must follow this structure:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### 1. Types
Only the following commit types are allowed:
- `feat`: A new feature or capability.
- `fix`: A bug fix.
- `docs`: Documentation updates.
- `style`: Formatting, semi-colons, white spaces (no logic changes).
- `refactor`: Restructuring code without changing behavior or adding features.
- `perf`: Code changes that improve performance.
- `test`: Adding or correcting tests.
- `build`: Changes that affect the build system or external dependencies (e.g., npm packages, NuGet packages, project configs).
- `ci`: Changes to CI configuration files and scripts (e.g., GitHub Actions, workflows).
- `chore`: Other changes that do not modify src or test files.

### 2. Scope
The scope is optional but recommended. It should specify the component or module being changed:
- Examples: `feat(auth): add google sign-in`, `fix(ui): resolve modal centering issue`.

### 3. Subject Line / Description
- Use the **imperative, present tense** mood: "change" instead of "changed" or "changes".
- Do not capitalize the first letter.
- Do not end the line with a period.
- Keep it under **50 characters**.

### 4. Body & Footers
- Separate the body from the subject line with a blank line.
- Wrap the body lines at **72 characters**.
- Use the body to explain what was changed and the reasoning behind it, not how.
- Mention breaking changes in the footer with `BREAKING CHANGE: <description>` or prepend `!` to the type (e.g., `feat(api)!: remove deprecated endpoints`).
- Reference closed issues in the footer (e.g., `Closes #45`).
