"""In-memory repository for todo records."""

from datetime import datetime, timezone


class TodoRepository:
    """Store and mutate todos in memory."""

    def __init__(self) -> None:
        self.todos = []

    def get_all(self) -> list[dict]:
        return self.todos

    def get_by_id(self, my_todo_id: str) -> dict | None:
        for todo in self.todos:
            if todo["id"] == my_todo_id:
                return todo
        return None

    def create(self, title: str, description: str | None = None, category: str = "general") -> dict:
        new_todo = {
            "id": str(len(self.todos) + 1),
            "title": title,
            "description": description,
            "category": category,
            "date_created": datetime.now(timezone.utc),
            "is_completed": False,
        }
        self.todos.append(new_todo)
        return new_todo

    def update(
        self,
        my_todo_id: str,
        title: str,
        description: str | None = None,
        category: str = "general",
    ) -> dict | None:
        todo = self.get_by_id(my_todo_id)
        if todo is None:
            return None

        todo["title"] = title
        todo["description"] = description
        todo["category"] = category
        return todo

    def update_status(self, my_todo_id: str, is_completed: bool) -> dict | None:
        todo = self.get_by_id(my_todo_id)
        if todo is None:
            return None

        todo["is_completed"] = is_completed
        return todo

    def delete(self, my_todo_id: str) -> bool:
        todo = self.get_by_id(my_todo_id)
        if todo is None:
            return False

        self.todos = [item for item in self.todos if item["id"] != my_todo_id]
        return True
