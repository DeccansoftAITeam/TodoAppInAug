# TodoApp General Conventions

## Layering
Keep a clear separation of concerns and don't collapse layers:
- Backend: router → service → repository. Routers only translate HTTP ↔ schemas; business logic lives in services; data access lives in repositories.
- Frontend: `api/*.js` modules own all HTTP calls; components call these functions, they never call `fetch` directly.

## Naming
- Functions/variables: `camelCase` in JS, `snake_case` in Python.
- Classes/Components: `PascalCase` in both.
- Event handlers in React: prefix with `handle` (e.g. `handleDelete`).
- Booleans read naturally: `is_completed`, `isLoading`.

## Error Handling
- Never swallow errors silently. Backend raises `HTTPException` with the correct status code; frontend checks `response.ok` and throws/surfaces an error before updating state.
- Validate at the boundary (Pydantic validators on the backend, form-level checks before submit on the frontend) — don't re-validate the same rule in multiple layers.

## Style
- No new class components, no global/shared mutable state beyond what already exists (in-memory repository, `App.jsx` state).
- Keep new dependencies to a minimum; prefer the existing native `fetch`/Pydantic/FastAPI stack over adding new libraries (axios, Redux, etc.) unless asked.
