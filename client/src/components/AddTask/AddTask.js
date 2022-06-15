import React, { useState } from "react"
import PropTypes from 'prop-types';
import "./AddTask.css"

AddTask.propTypes = {
    isTaskUpdate: PropTypes.func
};

function AddTask({ isTaskUpdate }) {

    const [taskName, setTaskName] = useState("");
    const [taskDeadLine, setTaskDeadLine] = useState(new Date().toISOString().slice(0, 10));
    const [taskDes, setTaskDes] = useState("");


    // const handleSubmit = (event) => {
    //     console.log("tstibn");
    //     event.preventDefualt();
    //     console.log("tstibn");
    //     // fetch("localhost:9000/task", {
    //     //     method: "POST",
    //     //     body: {
    //     //         taskName: taskName,
    //     //         taskDeadLine: new Date(taskDeadLine),
    //     //         taskDes: taskDes,
    //     //         isTaskDone: false
    //     //     }
    //     // })
    // }

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
                            taskDeadLine: new Date(taskDeadLine + "T00:00:00Z"),
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
                    <input id="addtaskname" type="text" name="taskName" value={taskName} onChange={(event) => { setTaskName(event.target.value) }} />
                    <input id="addtaskdeadline" type="date" name="taskDeadLine" value={taskDeadLine} onChange={(event) => { setTaskDeadLine(event.target.value) }} />
                </div>
                <textarea id="addtaskdes" placeholder="Task Description" rows={5} value={taskDes} name="taskDes" onChange={(event) => { setTaskDes(event.target.value) }} />
            </form>
        </div>
    )
}

export default AddTask;