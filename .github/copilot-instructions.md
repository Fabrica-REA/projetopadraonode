<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is a Node.js API named 'projetopadraonode' using Express and mysql2/promise for MySQL database access. Prioritize best practices for API structure, error handling, and async/await usage with MySQL.
# GitHub Copilot Custom Instructions for projetopadraonode
- Follow best practices for security (e.g., input validation, avoid SQL injection, never expose sensitive data).
- Follow best practices for clean code and maintainability.
- If you don't know how to solved it, does not try to write the code, ask for more informations

# API Generation Instructions
- use connecting pooling to the database using `mysql2/promise` and async/await.
- Implement comprehensive try-catch blocks for database calls
- alidate and sanitize all user input before passing it to stored procedures. Libraries like validator.js or express-validator can be used for this purpose.
- When asked to create a GET API for a table, always:
  - Create a separate API file for each table, named `Nometabela.js` (replace with the table name, e.g., `Usuario.js`).
  - Implement the GET API in the same format as the example in `routes/Usuario.js` (endpoint, error handling, and response structure).
  - Use async/await and proper error handling as shown in the `usuarioapi` example.
- When asked to create an INSERT (POST) API for a table, always:
  - Create a single file for all APIs of the table, named `Nometabela.js` (replace with the table name, e.g., `Usuario.js`).
  - Implement the POST API following the structure of `router.post('/usuarioapi', validateUsuarioInput, async (req, res) => ...` as in `routes/Usuario.js`.
  - Use express-validator for input validation.
  - Use async/await and proper error handling.
- When asked to create a DELETE API for a table, always:
  - Implement the DELETE API following the structure of `router.delete('/usuarioapid/:id', validateParamsUsuarioapid, async (req, res) => ...` as in `routes/Usuario.js`.
  - Use express-validator for parameter validation.
  - Use async/await and proper error handling.
  - Follow best practices for security and clean code.

# Route Registration Instructions
- When a new API file for a table is created (e.g., `routes/Tabela.js`):
  - Add the following import at the '// ________________ import routes ____________________' section in `index.js`:
    ```js
    const tabelaRoutes = require('./routes/Tabela');
    ```
  - Add the following line at the '// ____________________ use routes ____________________' section in `index.js`:
    ```js
    app.use(config.api.prefix, tabelaRoutes);
    ```
  - Replace `Tabela` with the actual table name, using camelCase for the variable if desired (e.g., `cursoRoutes`).

# SQL Code Instructions for GitHub Copilot

When working with `.sql` files and correcting SQL code:

- **Use MySQL syntax** for all corrections.
- When creating tables:
  - Include a `PRIMARY KEY` at the time of table creation.
  - Ensure the table name follows either:
    - the `CREATE TABLE` statement directly, or
    - has no space preceding the table name.
  - Each column name should be indented with a tab character (`\t`).
  - Preserve any existing comments in the SQL code. Only correct the English if necessary—do not alter their intent or placement.
- Handle foreign keys separately:
  - Declare foreign keys only **after** the `CREATE TABLE` statement.
  - Place foreign key constraints in a separate section following table creation.
- To handle errors, use SQLSTATE codes according to ANSI SQL standard