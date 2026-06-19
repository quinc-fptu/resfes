# Coding Convention Rule

## General Guidelines
- Maintain consistent indentation: 2 spaces for TypeScript/React/HTML/CSS, 4 spaces for C#/.NET.
- Use Unix-style line endings (`LF`).
- Always use UTF-8 encoding.
- Keep files clean of unused imports/namespaces and commented-out code blocks.

---

## Backend (.NET / C#) Naming & Structure Conventions
- **Class and Struct names:** PascalCase (e.g., `StudentController`, `DbConnection`).
- **Interfaces:** PascalCase prefixed with `I` (e.g., `IStudentService`).
- **Methods and Properties:** PascalCase (e.g., `GetStudentById`, `CreatedAt`).
- **Local variables and parameters:** camelCase (e.g., `studentId`, `dbContext`).
- **Private fields:** camelCase prefixed with an underscore (e.g., `_studentRepository`).
- **Constants:** PascalCase or UPPER_CASE (e.g., `MaxConnections` or `MAX_CONNECTIONS`).
- **Access Modifiers:** Always specify access modifiers explicitly (`public`, `private`, `protected`, `internal`).
- **Layout Order:**
  1. Private/Internal fields
  2. Constructors
  3. Public Properties
  4. Public Methods
  5. Private/Protected helper methods

---

## Frontend (TypeScript / React / Next.js) Conventions
- **Component Names:** PascalCase (e.g., `StudentCard`, `SidebarNavigation`).
- **Functions & Variables:** camelCase (e.g., `fetchData`, `isLoaded`).
- **Types and Interfaces:** PascalCase (e.g., `StudentInfo`, `UserRole`).
- **File Names:** Lowercase kebab-case for folder names and non-component files (e.g., `api-service.ts`, `use-auth.ts`). PascalCase for React components (e.g., `Navbar.tsx`).
- **TypeScript strictness:** Avoid using `any` at all costs. Specify clear type shapes or interfaces.
- **Imports:** Use absolute path aliases (e.g., `@/components/...`, `@/lib/...`) instead of deeply nested relative imports (e.g., `../../components/...`).
