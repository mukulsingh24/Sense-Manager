import { useState } from "react";

function Task(){
    const[task,setTask] = useState("");
    const handleSubmit=()=>{
        console.log("Task Submitted",task)
        setTask("")
    } 
    return(
        <div>
            <h1>Task Manager</h1>
            <input type="text" placeholder="Enter Your Task"
                onChange={(e)=> setTask(e.target.value)}
                value={task}
            />
            <button onClick={handleSubmit}>Submit the Task</button>
        </div>
    )
}

export default Task