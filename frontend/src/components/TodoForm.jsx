import { useState } from 'react'

function TodoForm({ onCreate }) {
  // Keep the form controlled so validation and resets stay predictable.
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      alert('Title is required')
      return
    }

    // Send the validated payload up to the app once the form passes checks.
    onCreate({
      title: trimmedTitle,
      description: description.trim(),
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>Add Todo</h2>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter a task title"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Optional description"
        />
      </label>

      <button type="submit">Add Todo</button>
    </form>
  )
}

export default TodoForm
