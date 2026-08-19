# Product Requirements Document

## 1. Overview
The Todo application is a simple personal task management tool for a single user. Its purpose is to help a person capture, track, and complete day-to-day tasks without complexity. The application supports creating a task, viewing the current task list, updating task details, marking tasks complete or incomplete, and removing tasks that are no longer needed.

Version 1 is the initial release and is intentionally limited. Todos are stored only in server memory and are lost when the server restarts. This is acceptable for the first version because the application is designed for quick, lightweight personal use rather than long-term persistence.

## 2. Target User
The primary user is a single individual who wants a straightforward way to manage personal tasks. This user values clarity, speed, and simplicity over advanced features. The user may want to record tasks as they arise, see what is still outstanding, and mark work as complete when finished.

## 3. In Scope for Version 1
The Version 1 product includes the ability to:
- Create a new todo with a unique identifier, title, description, creation date, and completion status.
- View all todos in a single list.
- Update the title and description of an existing todo.
- Mark a todo as complete or incomplete.
- Delete a todo.
- Distinguish between active and completed tasks.
- Use the application in a single-user environment with no account or authentication flow.

## 4. Out of Scope for Version 1
Version 1 does not include:
- Multi-user access or login functionality.
- Persistent storage beyond server memory.
- Shared or synchronized task lists.
- Categories, tags, priorities, due dates, reminders, or recurring tasks.
- Search, sorting, filtering, reporting, or analytics beyond simple task viewing.
- Notifications, integrations, or external services.
- Background jobs or scheduled processing.

## 5. Functional Requirements
FR-1: The system shall allow a user to create a new todo. Each todo shall include an Id, Title, Description, DateCreated, and IsCompleted.

FR-2: The Title field shall be required for every todo. The Description field shall be optional.

FR-3: The DateCreated value shall be set automatically when a todo is created and shall not be editable by the user.

FR-4: The IsCompleted value shall default to false when a todo is created.

FR-5: The system shall display all todos in a single list so the user can review current tasks and completed tasks.

FR-6: The system shall allow a user to update the Title and Description of an existing todo.

FR-7: The system shall allow a user to change the completion status of a todo from incomplete to complete and vice versa.

FR-8: The system shall allow a user to delete a todo from the list.

FR-9: The application shall maintain a unique Id for each todo so that each item can be individually referenced and managed.

FR-10: In Version 1, todo data shall remain available only while the application is running. When the server restarts, all todo data shall be lost.

## 6. Non-Functional Requirements
- The application shall be easy to understand and use for a single person managing personal tasks.
- The interface shall clearly show which tasks are complete and which remain active.
- The application shall handle basic input validation, including preventing empty titles when a todo is created or updated.
- The application shall remain stable during normal usage with a small number of tasks.
- The application shall behave predictably and consistently across repeated actions within a single session.
- The application shall not require any user account or configuration to begin using it.

## 7. Roadmap
Version 1:
- Single-user Todo application with in-memory storage only.
- Todos are created, viewed, edited, completed, and deleted.
- Data is lost after a server restart.

Version 2:
- Same functionality as Version 1.
- Todos are stored in a SQLite database so they persist across restarts.
- No change to the core task workflow.

Version 3:
- Add a Category field to each todo.
- Users can assign a category to a task and use it to better organize and filter tasks.
- Existing functionality remains the same, with category support added as an enhancement.

## 8. Assumptions
- The application is intended for a single user and does not need access control or multi-user support.
- Version 1 is acceptable as a lightweight task tracker without persistence across restarts.
- The user expects basic task management rather than advanced productivity features.
- The Title field is the minimum required information for a todo.
- The DateCreated value reflects when the todo was created and is not expected to change.
- Future versions are expected to preserve user data and add organization features without changing the fundamental personal-task use case.
