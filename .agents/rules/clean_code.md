# Clean Code Rule

This document defines the Clean Code principles and standards that must be adhered to during codebase development and refactoring.

## Core Design Principles
Follow these software engineering principles for all code changes:
- **SOLID Principles:**
  - **S**ingle Responsibility Principle: A class or function must have only one reason to change. Keep functions/methods small (ideally under 30 lines).
  - **O**pen/Closed Principle: Software entities should be open for extension but closed for modification.
  - **L**iskov Substitution Principle: Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.
  - **I**nterface Segregation Principle: Prefer small, client-specific interfaces over large, general-purpose ones.
  - **D**ependency Inversion Principle: High-level modules should not depend on low-level modules; both should depend on abstractions.
- **DRY (Don't Repeat Yourself):** Avoid duplicate code. Extract common logic into reusable utility functions, shared hooks, helper classes, or services.
- **KISS (Keep It Simple, Stupid):** Write code that is simple to understand. Avoid unnecessary complexity, excessive design patterns, or over-engineering.
- **YAGNI (You Aren't Gonna Need It):** Implement only the features and code required right now. Do not add speculative code for future possibilities.

---

## Code Quality & Readability
- **Self-Documenting Code:** Write expressive variable, method, and class names that explain their purpose without comments.
- **Avoid Deep Nesting:** Use **guard clauses** (early exits) to handle validation or edge cases, reducing nesting and improving readability.
  - *Example:* Exit a function early using `if (!isValid) return;` rather than wrapping the entire block in a large `if` statement.
- **No Magic Numbers:** Replace raw numeric or string literals with named constants or enums.
- **Function/Method Arguments:** Keep arguments to a minimum (ideally 3 or fewer). If more are needed, group them into a single configuration/parameter object or class.

---

## Error Handling & Reliability
- **Never Swallow Exceptions:** Always handle caught exceptions properly (e.g., log them with full stack trace, notify the user, or wrap and rethrow). Do not leave empty `catch` blocks.
- **Return Meaningful Values:** Avoid returning arbitrary status codes or generic null values if they can be handled through structured result patterns (e.g., `Result<T>` pattern).
- **Graceful Degradation:** Implement fallback behaviors for network/API failures, particularly in UI components.
