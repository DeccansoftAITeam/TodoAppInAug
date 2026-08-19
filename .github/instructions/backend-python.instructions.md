---
description: "Use when writing or editing FastAPI backend code in the TodoApp: routers, services, repositories, or Pydantic schemas."
applyTo: "backend/**/*.py"
---

# TodoApp Backend (FastAPI) Conventions

## Architecture
Follow the existing 3-layer pattern strictly:
- **Router** (`api/routers/*.py`): declares endpoints, uses `response_model`, delegates to a service, raises `HTTPException` for error cases. No business logic here.
- **Service** (`services/*.py`): business logic, calls repository, converts repository dicts to Pydantic models via `Model.model_validate(...)`. Accepts an optional repository in `__init__` for testability:
  ```python
  def __init__(self, repository=None):
      self.repository = repository or TodoRepository()
  ```
- **Repository** (`repositories/*.py`): data access only (currently in-memory list/dict). No validation logic.

## Schemas
- Use Pydantic v2. Validate input with `@field_validator`.
- Use `response_model=` on every route; use `list[Model]` for collection responses.

## Style
- Type-hint all function signatures (params and returns).
- Keep functions synchronous (`def`, not `async def`) unless the workload becomes I/O-bound (e.g. a real database is introduced).
- Not-found cases: repository/service return `None`; the router is responsible for turning that into `HTTPException(status_code=404, detail=...)`.
- Naming: `snake_case` for functions/variables, `PascalCase` for classes.
- No docstrings for simple CRUD methods; add a one-line docstring only for non-obvious logic.
