# Personal Task Manager (ReactJS)

ICT Diploma assignment - a two-screen task manager built with React functional components and hooks.

Before submitting: open `src/App.jsx` and check `STUDENT_NAME` and `REG_NUMBER`.

## Features
- Home section with app title, student name, registration number and description
- Two screens, switched with tabs (sliding animation):
  - Create task: task name, due date, due time and priority (Low / Medium / High)
  - All tasks: view, edit, mark complete and delete tasks
- Tasks sorted by due date; overdue tasks are marked "Overdue"
- Filter: All / Active / Completed
- Form validation with clear error messages (required fields, title length, no past dates)
- 5 records loaded from the JSONPlaceholder API with fetch()
- Tasks saved in localStorage so they survive a page refresh
- Simple CSS animations: screen change, sliding tab, new task appears, delete slides out,
  highlighter swipe when completed, messages fade in. Animations turn off if the device
  has "reduce motion" switched on.

## Components
| Component | Purpose | Props received |
|---|---|---|
| App | Holds task state, screen state and functions | - |
| Header | Title, student details, description | title, studentName, regNumber, description |
| NavTabs | Switches between the two screens | screen, onChange, pendingCount |
| CreateTaskScreen | Screen 1 | onAddTask, onViewTasks |
| TaskForm | Input form + validation | onAddTask, onViewTasks |
| ViewTasksScreen | Screen 2, filters and sorting | tasks, onToggle, onDelete, onUpdate, onCreateTask |
| TaskList | Renders the list | tasks, onToggle, onDelete, onUpdate, onCreateTask |
| TaskItem | One task, view mode and edit mode | task, onToggle, onDelete, onUpdate |
| ApiTasks | Fetches and shows API data | - |
| Footer | Footer text | studentName |

`src/utils/taskHelpers.js` holds shared functions: validation, date formatting and overdue check.

## Hooks used
- useState: task list, current screen, form data, errors, success message, edit mode, completion status, filter, API data, loading state
- useEffect: page title with pending count, timed welcome message, save to localStorage, scroll to top on screen change, hide success message after 4 s, fetch API data

## Run locally
```
npm install
npm run dev
```
Open http://localhost:5173

## Build
```
npm run build
```

## Test cases
| No | Test | Steps | Expected result |
|---|---|---|---|
| 1 | Home info | Open app | Title, name, reg. no and description shown |
| 2 | Welcome message | Open / refresh app | Greeting appears, disappears after 5 s |
| 3 | Switch screens | Click "All tasks", then "Create task" | Screen changes, dark pill slides to the clicked tab |
| 4 | Empty form | Click Add task with all fields empty | Errors under name, date and time |
| 5 | Spaces only | Type spaces in name, submit | "Please enter a task title." |
| 6 | Too short | Type "ab", submit | "at least 3 characters" error |
| 7 | Too long | 61+ characters, submit | "at most 60 characters" error |
| 8 | Past date | Pick today's date with a time that has passed | "cannot be in the past" error |
| 9 | Error clears | Change a field after an error | That field's error disappears |
| 10 | Add valid task | Name, future date, time, High | Green "was added" message, form resets |
| 11 | Go to list | Click "View all tasks" in the green message | All tasks screen opens, task is shown |
| 12 | Task details | Look at the new task | Name, date and time, and priority badge shown |
| 13 | Sorting | Add tasks with different dates | Earliest due date appears first |
| 14 | Mark complete | Tick checkbox | Yellow highlighter swipes across, text crossed out |
| 15 | Undo complete | Untick checkbox | Task returns to normal |
| 16 | Edit task | Click Edit, change name/date/time/priority, Save changes | Task updates with new details |
| 17 | Edit validation | Click Edit, clear the name, Save changes | Error shown, task not changed |
| 18 | Cancel edit | Click Edit, change name, Cancel | Original task unchanged |
| 19 | Delete | Click Delete | Task slides out and is removed |
| 20 | Counter | Add / complete tasks | Tab number and "X pending of Y" are correct |
| 21 | Page title | Add 2 tasks | Browser tab shows "(2) Task Manager" |
| 22 | Filters | Click Active / Completed / All | Only matching tasks shown |
| 23 | Persistence | Add tasks, refresh | Tasks still there |
| 24 | API load | Open All tasks screen | 5 API rows in the table |
| 25 | API error | Block the todos request in DevTools, refresh | Friendly error message shown |
| 26 | Mobile | DevTools device toolbar (375px) | Layout fits, date and time fields stack |
| 27 | Build | Run npm run build | "built in" message, no errors |
| 28 | Deployed | Open public URL on phone | App works the same as locally |
