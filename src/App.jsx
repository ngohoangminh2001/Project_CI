import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Task from './Task.jsx'

function App() {
    const [count, setCount] = useState(0);

    const [toDoTasks, setToDoTasks] = useState([
        {
            id: 0,
            name: 'Do homework',
            description: '',
            dueDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            priority: 'Normal',
            completed: false,
            removed: false,
        },
        {
            id: 1,
            name: 'Do housework',
            description: '',
            dueDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            priority: 'Normal',
            completed: false,
            removed: false,
        },
        {
            id: 2,
            name: 'Learn something',
            description: '',
            dueDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            priority: 'Normal',
            completed: false,
            removed: false,
        }
    ]);

    const completeTask = (task) => {
        task.completed = true
    }

    const removeTask = (task) => {
        task.removed = true
    }

    const updateTask = (task) => {
        let tdt = [...toDoTasks];
        tdt[task.id].name = task.name;
        tdt[task.id].description = task.description;
        tdt[task.id].dueDate = task.dueDate;
        tdt[task.id].priority = task.priority;
        tdt[task.id].completed = task.completed;
        tdt[task.id].removed = task.removed;
        setToDoTasks(tdt);
    }

    const [nameSearch, setNameSearch] = useState('');

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    const [taskPriority, setTaskPriority] = useState('Normal');

    console.log(toDoTasks);

    return (
        <>
            {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
            <div id="parent-div">
                <div id="div-1">
                    <h1 id="new-task">New Task</h1>
                    <input id="add-new-task" placeholder="Add new task ..." value={taskName} onChange={(e) => {
                        setTaskName(e.target.value);
                    }}></input>
                    <p id="minh"><b id="required"></b></p>
                    <div id="div-1-1">
                        <p><b>Description</b></p>
                        <textarea name="" id="new-task-description" cols="72" rows="10" placeholder="Lorem Ipsum...." value={taskDescription} onChange={(e) => {
                            setTaskDescription(e.target.value);
                        }}></textarea>
                    </div>
                    <div id="div-1-2">
                        <div id="div-1-2-1">
                            <p><b>Due Date</b></p>
                            <input type="date" id="due-date-1" class="due-date" value={taskDueDate} onChange={(e) => {
                                setTaskDueDate(e.target.value);
                            }}></input>
                        </div>
                        <div id="div-1-2-2">
                            <p><b>Priority</b></p>
                            <select name="" class="priority" id="priority-selection" value={taskPriority} onChange={(e) => {
                                setTaskPriority(e.target.value);
                            }}>
                                <option>Low</option>
                                <option>Normal</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                    <div id="div-1-3">
                        <button id="add" onClick={() => {
                            let tdt = [...toDoTasks];
                            tdt.push({
                                id: tdt.length,
                                name: taskName,
                                description: taskDescription,
                                dueDate: taskDueDate,
                                priority: taskPriority,
                                completed: false,
                                removed: false,
                            });
                            setToDoTasks(tdt);
                            console.log(tdt);
                            alert("Add task successfully!");
                        }}>Add</button>
                    </div>
                </div>
                <div id="div-2">
                    <h1 id="to-do-list">To Do List</h1>
                    <input id="search" placeholder="Search ..." value={nameSearch} onChange={(e) => {
                        setNameSearch(e.target.value);
                    }}></input>
                    <p></p>

                    {toDoTasks.map((task) => {
                        return (nameSearch ? ((task.name.trim().toLowerCase()).includes(nameSearch.trim().toLowerCase()) && <Task key={task.id} task={task} complete={completeTask} remove={removeTask} handleChange={updateTask} name={task.name} description={task.description} dueDate={task.dueDate} priority={task.priority} completed={task.completed} removed={task.removed}></Task>) : (<Task key={task.id} task={task} complete={completeTask} remove={removeTask} handleChange={updateTask} name={task.name} description={task.description} dueDate={task.dueDate} priority={task.priority} completed={task.completed} removed={task.removed}></Task>))
                    })}

                    <div id="bulk-action">
                        <div id="bulk-text">
                            <p>Bulk Action:</p>
                        </div>
                        <div id="bulk-buttons">
                            <button class="detail" id="done">Done</button>
                            <button class="remove" id="delete">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
