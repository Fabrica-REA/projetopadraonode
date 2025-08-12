---
trigger: glob
globs: **/*
---

---
trigger: glob
globs: ["**/*"]
---
<!-- General workspace rules for Cascade -->

# Project Overview & Tech Stack
- **Project**: [projetopadraonode](cci:7://file:///d:/projetostemp/lixoexe/projetopadraonode:0:0-0:0), a Node.js API server.
- **Framework**: Express.js.
- **Database**: MySQL, accessed via `mysql2/promise`.
- **Configuration**: Managed in `config/` directory.
- **Environment**: Loaded from `.env` files.

# Cascade Behavior
- **Be Concise**: Prefer short, actionable bullet points.
- **Be Grounded**: Base all suggestions on files in this repository. If unsure, ask for clarification or propose reading a specific file (e.g., `routes/Usuario.js`).
- **Prioritize Security**: Always validate and sanitize user input. Never expose sensitive data in responses or logs.
- **Promote Clean Code**: Enforce separation of concerns (e.g., routes, controllers, services, data access).
- **Use Modern JavaScript**: Prefer `async/await` over callbacks or promise chains. Use `const` and `let` appropriately.

# Logging & Environment
- **Logging**: Use a structured logger (if available). Log errors with context, but avoid logging sensitive request data.
- **Environment Variables**: Access all environment-specific values (e.g., DB credentials, secrets) through the `config` module. Never hard-code them.