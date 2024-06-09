import React, { useState } from 'react'
import './App.css'

const Task = (props) => {
    const [tempTask, setTempTask] = useState(props.task);
    const [doneTask, setDoneTask] = useState(false);
    const [removeTask, setRemoveTask] = useState(false);
    const [showDiv202, setShowDiv202] = useState(false);

    const handleChange = (e) => {
        setTempTask({
            ...props.task,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div>
            {!removeTask && <div class="div20">
                <div class="div201">
                    <div class="div2011">
                        <input type="checkbox" class="tick" name="tick"></input>
                        <label class="task-name" for="tick">{props.name}</label>
                    </div>
                    <div class="div2012">
                        {doneTask && <p>Done</p>}
                        {!doneTask && <button class="detail" onClick={(e) => { setShowDiv202(true); }}>Show details</button>}
                        {!doneTask && <button class="done" onClick={(e) => { props.complete({ ...tempTask }); setDoneTask(true); setShowDiv202(false); console.log(tempTask); }}>Mark as done</button>}
                        {!doneTask && <button class="remove" onClick={(e) => { props.remove({ ...tempTask }); setRemoveTask(true); console.log(tempTask); }}>Remove</button>}
                    </div>
                </div>
                {showDiv202 && <div class="div202">
                    <input type="text" class="tasks" placeholder={props.name} onChange={handleChange}></input>
                    <p><b>Description</b></p>
                    <textarea name="" class="description" cols="30" rows="10" placeholder="Lorem Ipsum...." onChange={handleChange}></textarea>
                    <div class="div2021">
                        <div class="div20211">
                            <p><b>Due Date</b></p>
                            <input type="date" class="due-date-2" onChange={handleChange}></input>
                        </div>
                        <div class="div20212">
                            <p class="priority-text"><b>Priority</b></p>
                            <select name="" class="priority-selection" onChange={handleChange}>
                                <option>Low</option>
                                <option>Normal</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                    <button class="update" onClick={() => {
                        props.handleChange({ ...tempTask });
                        alert("Updated successfully!");
                        setShowDiv202(false);
                    }}>Update</button>
                    <button class="cancel" onClick={() => {
                        setShowDiv202(false);
                    }}>Cancel</button>
                </div>}
            </div>}
        </div>
    )
}

export default Task