"""Business logic for todo operations."""

from app.repositories.todo_repository import TodoRepository
from app.schemas.todo import Todo, TodoCreate, TodoStatusUpdate, TodoUpdate


class TodoService:
    """Coordinate todo validation and persistence."""

    def __init__(self, repository: TodoRepository | None = None) -> None:
        self.repository = repository or TodoRepository()

    def get_all_todos(self) -> list[Todo]:
        todos = self.repository.get_all()
        return [Todo.model_validate(todo) for todo in todos]

    def create_todo(self, todo_data: TodoCreate) -> Todo:
        todo = self.repository.create(
            title=todo_data.title,
            description=todo_data.description,
        )
        return Todo.model_validate(todo)

    def update_todo(self, todo_id: str, todo_data: TodoUpdate) -> Todo | None:
        todo = self.repository.update(
            todo_id=todo_id,
            title=todo_data.title,
            description=todo_data.description,
        )
        if todo is None:
            return None
        return Todo.model_validate(todo)

    def update_status(
        self,
        todo_id: str,
        status_data: TodoStatusUpdate,
    ) -> Todo | None:
        todo = self.repository.update_status(
            todo_id=todo_id,
            is_completed=status_data.is_completed,
        )
        if todo is None:
            return None
        return Todo.model_validate(todo)

    def delete_todo(self, todo_id: str) -> bool:
        return self.repository.delete(todo_id)
