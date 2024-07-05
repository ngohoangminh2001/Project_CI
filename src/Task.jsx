import React, { useState } from 'react';
import './App.css';

const Task = ({ task, complete, remove, handleChange }) => {
    const [tempTask, setTempTask] = useState(task);
    const [doneTask, setDoneTask] = useState(task.completed);
    const [removeTask, setRemoveTask] = useState(task.removed);
    const [showDiv202, setShowDiv202] = useState(false);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setTempTask({
            ...tempTask,
            [name]: value
        });
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'priority-high';
            case 'Normal':
                return 'priority-normal';
            case 'Low':
                return 'priority-low';
            default:
                return '';
        }
    };

    return (
        <div>
            {!removeTask && (
                <div className={`div20 ${getPriorityClass(task.priority)}`}>
                    <div className="div201">
                        <div className="div2011">
                            <input
                                type="checkbox"
                                className="tick"
                                name="tick"
                                checked={doneTask}
                                onChange={() => {
                                    complete(task.id);
                                    setDoneTask(!doneTask);
                                }}
                            />
                            <label className="task-name" htmlFor="tick">
                                {task.name}
                            </label>
                        </div>
                        <div className="div2012">
                            {doneTask && <p>Done</p>}
                            {!doneTask && (
                                <>
                                    <button
                                        className="button detail"
                                        onClick={() => setShowDiv202(!showDiv202)}
                                    >
                                        {showDiv202 ? 'Hide details' : 'Show details'}
                                    </button>
                                    <button
                                        className="button done"
                                        onClick={() => {
                                            complete(task.id);
                                            setDoneTask(true);
                                            setShowDiv202(false);
                                        }}
                                    >
                                        Mark as done
                                    </button>
                                </>
                            )}
                            <button
                                className="button remove"
                                onClick={() => {
                                    remove(task.id);
                                    setRemoveTask(true);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    {showDiv202 && (
                        <div className="div202">
                            <input
                                type="text"
                                className="tasks"
                                name="name"
                                value={tempTask.name}
                                onChange={handleChangeInput}
                            />
                            <p><b>Description</b></p>
                            <textarea
                                className="description"
                                name="description"
                                cols="30"
                                rows="10"
                                value={tempTask.description}
                                onChange={handleChangeInput}
                            />
                            <div className="div2021">
                                <div className="div20211">
                                    <p><b>Due Date</b></p>
                                    <input
                                        type="date"
                                        className="due-date-2"
                                        name="dueDate"
                                        value={tempTask.dueDate}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                                <div className="div20212">
                                    <p className="priority-text"><b>Priority</b></p>
                                    <select
                                        className="priority-selection"
                                        name="priority"
                                        value={tempTask.priority}
                                        onChange={handleChangeInput}
                                    >
                                        <option>Low</option>
                                        <option>Normal</option>
                                        <option>High</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                className="button save"
                                onClick={() => handleChange(tempTask)}
                            >
                                Save
                            </button>
                            <button
                                className="button cancel"
                                onClick={() => setShowDiv202(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Task;
