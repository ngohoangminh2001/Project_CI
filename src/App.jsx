import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Task from './Task.jsx';

const API_URL = 'https://667e6fdef2cb59c38dc5a97e.mockapi.io/tasks';

function App() {
    const [toDoTasks, setToDoTasks] = useState([]);
    const [nameSearch, setNameSearch] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState(new Date().toISOString().slice(0, 10));
    const [taskPriority, setTaskPriority] = useState('Normal');

    useEffect(() => {
        axios.get(API_URL)
            .then(response => setToDoTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = () => {
        const newTask = {
            name: taskName,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority,
            completed: false,
            removed: false,
        };

        axios.post(API_URL, newTask)
            .then(response => {
                setToDoTasks([...toDoTasks, response.data]);
                setTaskName('');
                setTaskDescription('');
                setTaskDueDate(new Date().toISOString().slice(0, 10));
                setTaskPriority('Normal');
                alert("Add task successfully!");
            })
            .catch(error => console.error('Error adding task:', error));
    };

    const updateTask = (updatedTask) => {
        axios.put(`${API_URL}/${updatedTask.id}`, updatedTask)
            .then(response => {
                setToDoTasks(toDoTasks.map(task => task.id === updatedTask.id ? response.data : task));
            })
            .catch(error => console.error('Error updating task:', error));
    };

    const completeTask = (taskId) => {
        const task = toDoTasks.find(task => task.id === taskId);
        const updatedTask = { ...task, completed: true };

        axios.put(`${API_URL}/${taskId}`, updatedTask)
            .then(response => {
                setToDoTasks(toDoTasks.map(task => task.id === taskId ? response.data : task));
            })
            .catch(error => console.error('Error marking task as complete:', error));
    };

    const removeTask = (taskId) => {
        axios.delete(`${API_URL}/${taskId}`)
            .then(() => {
                setToDoTasks(toDoTasks.filter(task => task.id !== taskId));
            })
            .catch(error => console.error('Error removing task:', error));
    };

    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => {
            const priorityOrder = { 'High': 1, 'Normal': 2, 'Low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    };

    const sortedTasks = sortTasks([...toDoTasks]);

    return (
        <div id="parent-div">
            <div id="div-1">
                <h1 id="new-task">New Task</h1>
                <input
                    id="add-new-task"
                    placeholder="Add new task ..."
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <p id="minh"><b id="required"></b></p>
                <div id="div-1-1">
                    <p><b>Description</b></p>
                    <textarea
                        id="new-task-description"
                        cols="72"
                        rows="10"
                        placeholder="Lorem Ipsum...."
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </div>
                <div id="div-1-2">
                    <div id="div-1-2-1">
                        <p><b>Due Date</b></p>
                        <input
                            type="date"
                            id="due-date-1"
                            className="due-date"
                            value={taskDueDate}
                            onChange={(e) => setTaskDueDate(e.target.value)}
                        />
                    </div>
                    <div id="div-1-2-2">
                        <p><b>Priority</b></p>
                        <select
                            className="priority"
                            id="priority-selection"
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                        >
                            <option>Low</option>
                            <option>Normal</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>
                <div id="div-1-3">
                    <button id="add" onClick={addTask}>Add</button>
                </div>
            </div>
            <div id="div-2">
                <h1 id="to-do-list">To Do List</h1>
                <input
                    id="search"
                    placeholder="Search ..."
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                />
                <p></p>

                {sortedTasks.filter(task => task.name.toLowerCase().includes(nameSearch.toLowerCase())).map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        complete={completeTask}
                        remove={removeTask}
                        handleChange={updateTask}
                    />
                ))}

                <div id="bulk-action">
                    <div id="bulk-text">
                        <p>Bulk Action:</p>
                    </div>
                    <div id="bulk-buttons">
                        <button className="done">Done</button>
                        <button className="remove">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
