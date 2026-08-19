import TodoItem from './TodoItem'

function TodoList({ todos, onUpdate, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {/* Render each todo as a dedicated item so actions stay isolated. */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
