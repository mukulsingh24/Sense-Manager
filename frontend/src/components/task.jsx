import { useState } from "react";

function Task(handleSubmit){
    const[task,setTask] = useState("");
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