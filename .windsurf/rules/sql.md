---
trigger: glob
globs: **/*.sql
---

---
trigger: glob
globs: ["**/*.sql"]
---
<!-- Rules for writing and modifying SQL code -->

# SQL Style & Syntax
- **Syntax**: Always use MySQL-compliant syntax.
- **Naming**: Use `snake_case` for all table and column names (e.g., `user_accounts`, `first_name`).
- **Keywords**: Use `UPPERCASE` for SQL keywords (`SELECT`, `CREATE TABLE`, `WHERE`).

# Table Creation
- **Primary Key**: Must be defined within the `CREATE TABLE` statement (e.g., `id INT AUTO_INCREMENT PRIMARY KEY`).
- **Character Set**: Default to `utf8mb4` for full Unicode support: `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
- **Timestamps**: Use `TIMESTAMP` with defaults for creation and update times.
- **Indentation**: Indent column definitions with a single tab.
- **Foreign Keys**: Declare foreign key constraints in a separate block after all columns are defined.

# General
- **Comments**: Preserve existing comments. Only correct English grammar if necessary.
- **Error Handling**: When suggesting error handling logic, reference ANSI SQLSTATE codes where applicable.