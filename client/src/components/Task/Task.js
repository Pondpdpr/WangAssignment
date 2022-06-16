import React, { useState } from "react"
import "./Task.css"

function Task(props) {

    const [taskId, setTaskId] = useState(props.taskId);
    const [taskName, setTaskName] = useState(props.taskName);
    const [taskDeadLine, setTaskDeadLine] = useState(new Date(props.taskDeadLine));
    const [taskDes, setTaskDes] = useState(props.taskDes);
    const [isTaskDone, setTaskDone] = useState(props.isTaskDone);
    const [isShowOption, setShowOption] = useState(false);
    const [canEdit, setEdit] = useState(false)

    return <>
        {
            canEdit ? (
                <div className="addtaskbox" >
                    <form className="addtaskform" onSubmit={(e) => {
                        e.preventDefault();
                        const url = "http://localhost:9000/task/" + taskId;
                        if (taskName.length >= 1) {
                            fetch(url, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    taskName: taskName,
                                    taskDeadLine: taskDeadLine,
                                    taskDes: taskDes,
                                    isTaskDone: isTaskDone
                                })
                            })
                            props.isTaskUpdate(true);
                            setEdit(false);
                        } else {
                            alert("Task's name is required")
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
                                value={taskDeadLine.toISOString().slice(0, 10)}
                                onChange={(event) => { setTaskDeadLine(new Date(event.target.value + "T00:00:00Z")) }}
                            />
                        </div>
                        <textarea id="addtaskdes" placeholder="Task Description" rows={5} value={taskDes} onChange={(event) => { setTaskDes(event.target.value) }} />
                    </form>
                </div>
            ) : (
                <div
                    className="taskbox"
                    onMouseEnter={() => setShowOption(true)}
                    onMouseLeave={() => setShowOption(false)}
                    completed={isTaskDone.toString()}
                >
                    <div className="task1">
                        <input
                            type="checkbox"
                            checked={isTaskDone}
                            onChange={(e) => {
                                const url = "http://localhost:9000/task/" + taskId;
                                fetch(url, {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        "isTaskDone": e.target.checked
                                    })
                                })
                                    .then(() => props.isTaskUpdate(true))
                                setTaskDone(e.target.checked);
                            }}
                        ></input>
                        {
                            isShowOption && <>
                                <div className="option" onClick={() => {
                                    const url = "http://localhost:9000/task/" + taskId;
                                    fetch(url, {
                                        method: "DELETE",
                                    })
                                        .then(() => props.isTaskUpdate(true))
                                }
                                }>Delete</div>
                                {!isTaskDone && <div className="option" onClick={() => setEdit(true)}>Edit</div>}
                            </>
                        }
                    </div>
                    <div className="task2">
                        <p className="taskName">{taskName}</p>
                        <p className="taskDeadLine">Due:{taskDeadLine.toString().slice(4, 15)}</p>
                    </div>
                    <div className="task3">
                        <p>{taskDes}</p>
                    </div>
                </div>
            )
        }
    </>
}

export default Task;