import React, { useEffect, useState } from "react";
import AddTask from "../AddTask/AddTask";
import Task from "../Task/Task";
import './TaskList.css';

function TaskList() {

    // const [taskAmt, setTaskAmt] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [taskUpdate, setTaskUpdate] = useState(false);

    useEffect(() => {
        fetch("http://localhost:9000/task")
            .then((res) => res.json())
            .then((res) => setTasks(res))
            setTaskUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskUpdate])

    return (
        <div className="tasklist">
            {
                tasks.map((task) =>
                    <Task 
                        key={task._id} 
                        taskId={task._id}
                        taskName={task.taskName} 
                        taskDeadLine={task.taskDeadLine} 
                        taskDes={task.taskDes} 
                        isTaskDone={task.isTaskDone} 
                        isTaskUpdate={setTaskUpdate}
                    />
                )
            }
            <AddTask isTaskUpdate={setTaskUpdate} />
        </div>
    )
}

export default TaskList;