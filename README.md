# Personal Task Manager (ReactJS)

ICT Diploma assignment - a task manager built with React functional components and hooks.

Before submitting: open `src/App.jsx` and change `STUDENT_NAME` and `REG_NUMBER`.

## Features
- Home section with app title, student name, registration number and description
- Add tasks with a title and priority (Low / Medium / High)
- Mark tasks completed (toggle) and delete tasks
- Filter: All / Active / Completed
- Form validation with clear error messages
- 5 records loaded from the JSONPlaceholder API with fetch()
- Tasks saved in localStorage so they survive a page refresh

## Components
| Component | Purpose | Props received |
|---|---|---|
| App | Holds task state and functions | - |
| Header | Title, student details, description | title, studentName, regNumber, description |
| TaskForm | Input form + validation | onAddTask |
| TaskList | Renders the list | tasks, onToggle, onDelete |
| TaskItem | One task row | task, onToggle, onDelete |
| ApiTasks | Fetches and shows API data | - |
| Footer | Footer text | studentName |

## Hooks used
- useState: task list, form data, completion status, error message, filter, API data, loading state
- useEffect: update page title with pending count, timed welcome message, save to localStorage, fetch API data

## Run locally
```
npm install
npm run dev
```
Open http://localhost:5173

## Build
```
npm run build
npm run preview
```

## Test cases
| No | Test | Steps | Expected result |
|---|---|---|---|
| 1 | Home info | Open app | Title, name, reg. no and description shown |
| 2 | Welcome message | Open / refresh app | Greeting appears, disappears after 5 s |
| 3 | Empty title | Click Add task with empty input | "Please enter a task title." |
| 4 | Spaces only | Type spaces, submit | Same error (input is trimmed) |
| 5 | Too short | Type "ab", submit | "at least 3 characters" error |
| 6 | Too long | 61+ characters, submit | "at most 60 characters" error |
| 7 | Error clears | Type after an error | Error message disappears |
| 8 | Add valid task | "Study React", High | Task appears at top with red High badge, form resets |
| 9 | Priorities | Add Low, Medium, High tasks | Correct badge colour for each |
| 10 | Toggle done | Tick checkbox | Title is crossed out and highlighted |
| 11 | Toggle back | Untick checkbox | Task returns to normal |
| 12 | Delete | Click Delete | Task removed, count updates |
| 13 | Counter | Add / complete tasks | "X pending of Y" is correct |
| 14 | Page title | Add 2 tasks | Browser tab shows "(2) Task Manager" |
| 15 | Filters | Click Active / Completed / All | Only matching tasks shown |
| 16 | Persistence | Add tasks, refresh | Tasks still there |
| 17 | API load | Open app | 5 API rows in the table |
| 18 | API error | DevTools > Network > Offline, refresh | Friendly error message shown |
| 19 | Mobile | DevTools device toolbar (375px) | Layout fits, no sideways scroll |
| 20 | Deployed | Open public URL in another browser | App works the same as locally |
