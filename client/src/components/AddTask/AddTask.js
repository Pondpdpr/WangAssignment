import React, { useState } from "react"
import PropTypes from 'prop-types';
import "./AddTask.css"

AddTask.propTypes = {
    isTaskUpdate: PropTypes.func
};

function AddTask({ isTaskUpdate }) {

    const [taskName, setTaskName] = useState("");
    const [taskDeadLine, setTaskDeadLine] = useState(new Date());
    const [taskDes, setTaskDes] = useState("");

    return (
        <div className="addtaskbox">
            <form className="addtaskform" onSubmit={(e) => {
                e.preventDefault();
                if (taskName.length >= 1) {
                    fetch("http://localhost:9000/task", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            taskName: taskName,
                            taskDeadLine: taskDeadLine,
                            taskDes: taskDes,
                            isTaskDone: false
                        })
                    })
                    isTaskUpdate(true);
                    setTaskDes("");
                    setTaskName("");
                }
            }}>
                <div className="taskform1">
                    <label htmlFor="addtaskname">New Task Name:</label>
                    <button id="addtasksubmit" >Submit</button>
                </div>
                <div className="taskform2">
                    <input 
                        id="addtaskname" 
                        type="text" 
                        name="taskName" 
                        value={taskName} 
                        onChange={(event) => { setTaskName(event.target.value) }} 
                        maxLength={30}
                    />
                    <input 
                        id="addtaskdeadline" 
                        type="date" 
                        name="taskDeadLine" 
                        value={taskDeadLine.toISOString().slice(0,10)} 
                        onChange={(event) => { setTaskDeadLine(new Date(event.target.value + "T00:00:00Z")) }} 
                    />
                </div>
                <textarea id="addtaskdes" placeholder="Task Description" rows={5} value={taskDes} name="taskDes" onChange={(event) => { setTaskDes(event.target.value) }} />
            </form>
        </div>
    )
}

export default AddTask;