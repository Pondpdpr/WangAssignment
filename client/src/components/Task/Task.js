import React, { useState } from "react"
import "./Task.css"

function Task(props) {

    const [taskId, setTaskId] = useState(props.taskId);
    const [taskName, setTaskName] = useState(props.taskName);
    const [taskDeadLine, setTaskDeadLine] = useState(props.taskDeadLine.slice(0, 10));
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
                        fetch(url, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                taskName: taskName,
                                taskDeadLine: new Date(taskDeadLine + "T00:00:00Z"),
                                taskDes: taskDes,
                                isTaskDone: isTaskDone
                            })
                        })
                        props.isTaskUpdate(true);
                        setEdit(false);
                    }}>
                        <div className="taskform1">
                            <label htmlFor="addtaskname">New Task Name:</label>
                            <button id="addtasksubmit" >Submit</button>
                        </div>
                        <div className="taskform2">
                            <input id="addtaskname" type="text" value={taskName} onChange={(event) => { setTaskName(event.target.value) }} />
                            <input id="addtaskdeadline" type="date" value={taskDeadLine} onChange={(event) => { setTaskDeadLine(event.target.value) }} />
                        </div>
                        <textarea id="addtaskdes" placeholder="Task Description" rows={5} value={taskDes} onChange={(event) => { setTaskDes(event.target.value) }} />
                    </form>
                </div>
            ) : (
                <div
                    className="taskbox"
                    onMouseEnter={() => setShowOption(true)}
                    onMouseLeave={() => setShowOption(false)}
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
                                <div className="option" onClick={() => setEdit(true)}>Edit</div>
                            </>
                        }
                    </div>
                    <div className="task2">
                        <p>{taskName}</p>
                        <p>{taskDeadLine}</p>
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