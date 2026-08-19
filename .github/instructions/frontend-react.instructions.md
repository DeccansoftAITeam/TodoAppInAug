---
description: "Use when writing or editing React frontend code in the TodoApp: components, API modules, or styling."
applyTo: "frontend/src/**"
---

# TodoApp Frontend (React) Conventions

## Components
- Functional components with hooks only — no class components.
- State ownership stays where it already lives: `App.jsx` owns the `todos` list and passes data/callbacks down as props (no Context/Redux). Don't introduce global state management without asking.
- Use `useEffect(() => { ... }, [])` for load-on-mount data fetching, matching the existing pattern in `App.jsx`.

## API Calls
- All HTTP calls go through `api/todoApi.js` using native `fetch`. Don't call `fetch` directly from components, and don't add axios or other HTTP libraries.
- Every API function must check `response.ok` and `throw new Error(...)` on failure so callers can handle it.

## Naming
- Components: `PascalCase` filenames matching the component name (`TodoForm.jsx`).
- Exported API functions: `camelCase` verbs (`getTodos`, `createTodo`, `updateTodoStatus`).
- Event handlers: `handle` prefix (`handleCreateTodo`, `handleDelete`).

## Styling
- Use plain CSS files with class-based selectors and conditional class names via template literals, e.g. `` `todo-item ${todo.is_completed ? 'completed' : ''}` ``. No CSS-in-JS or utility frameworks unless asked.

## Validation
- Do simple client-side checks (e.g. non-empty title) before calling the API; rely on the backend for authoritative validation.
- No PropTypes or TypeScript conversion unless explicitly requested — keep components plain JSX.
