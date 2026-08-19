import { useState } from 'react'

const CATEGORIES = ['official', 'personal', 'general']

function TodoItem({ todo, onUpdate, onToggle, onDelete }) {
  // Local edit state keeps the inline form isolated from the parent list.
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || '')
  const [category, setCategory] = useState(todo.category || 'general')

  const handleSave = () => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      alert('Title is required')
      return
    }

    // Submit only the trimmed values back to the parent handler.
    onUpdate(todo.id, {
      title: trimmedTitle,
      description: description.trim(),
      category,
    })
    setIsEditing(false)
  }

  return (
    <li className={`todo-item ${todo.is_completed ? 'completed' : ''}`}>
      <div className="todo-item-main">
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={() => onToggle(todo.id, !todo.is_completed)}
        />

        {isEditing ? (
          <div className="todo-edit-form">
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="todo-details">
            {/* Show the saved todo details until edit mode is enabled. */}
            <h3>{todo.title}</h3>
            {todo.description && <p>{todo.description}</p>}
            <small>{todo.category} &middot; {new Date(todo.date_created).toLocaleString()}</small>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button
              className="secondary"
              onClick={() => {
                // Reset the form back to the persisted values on cancel.
                setTitle(todo.title)
                setDescription(todo.description || '')
                setCategory(todo.category || 'general')
                setIsEditing(false)
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="danger" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
