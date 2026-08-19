const API_BASE_URL = 'http://localhost:8000/api/todos'

async function getTodos() {
  const response = await fetch(API_BASE_URL)
  if (!response.ok) {
    throw new Error('Failed to load todos')
  }
  return response.json()
}

async function createTodo(todoData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Create failed' }))
    throw new Error(errorData.detail || 'Create failed')
  }

  return response.json()
}

async function updateTodo(todoId, todoData) {
  const response = await fetch(`${API_BASE_URL}/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Update failed' }))
    throw new Error(errorData.detail || 'Update failed')
  }

  return response.json()
}

async function updateTodoStatus(todoId, isCompleted) {
  const response = await fetch(`${API_BASE_URL}/${todoId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_completed: isCompleted }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Status update failed' }))
    throw new Error(errorData.detail || 'Status update failed')
  }

  return response.json()
}

async function deleteTodo(todoId) {
  const response = await fetch(`${API_BASE_URL}/${todoId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Delete failed' }))
    throw new Error(errorData.detail || 'Delete failed')
  }
}

export { getTodos, createTodo, updateTodo, updateTodoStatus, deleteTodo }
