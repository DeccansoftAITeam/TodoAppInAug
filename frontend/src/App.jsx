import { useEffect, useState } from 'react'
import './App.css'
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  updateTodoStatus,
} from './api/todoApi'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    // Load the initial todo list once when the app mounts.
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      const data = await getTodos()
      setTodos(data)
    } catch (error) {
      console.error(error)
      alert('Could not load todos')
    }
  }

  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData)
      // Append the created todo so the UI stays in sync with the server.
      setTodos((previousTodos) => [...previousTodos, newTodo])
    } catch (error) {
      alert(error.message)
    }
  }

  const handleUpdateTodo = async (todoId, todoData) => {
    try {
      const updatedTodo = await updateTodo(todoId, todoData)
      // Replace the updated todo in-place to preserve list ordering.
      setTodos((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === todoId ? updatedTodo : todo,
        ),
      )
    } catch (error) {
      alert(error.message)
    }
  }

  const handleToggleTodo = async (todoId, isCompleted) => {
    try {
      const updatedTodo = await updateTodoStatus(todoId, isCompleted)
      // Reuse the same merge pattern for the completion toggle.
      setTodos((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === todoId ? updatedTodo : todo,
        ),
      )
    } catch (error) {
      alert(error.message)
    }
  }

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId)
      // Remove the deleted todo locally after the server confirms success.
      setTodos((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== todoId),
      )
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>Todo App</h1>
      </header>

      <TodoForm onCreate={handleCreateTodo} />

      <section className="todo-section">
        <h2>Todo List</h2>
        {todos.length === 0 ? (
          <p>No todos yet.</p>
        ) : (
          // Delegate row rendering and actions to the list/item components.
          <TodoList
            todos={todos}
            onUpdate={handleUpdateTodo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </section>
    </div>
  )
}

export default App
