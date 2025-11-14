import { useState } from "react";
import { Row,Col } from "react-bootstrap";
function Task({handleSubmit,task,setTask}){
    return(
        <div>
            <h1>Task Manager</h1>
            <input type="text" placeholder="Enter Your Task"
                onChange={(e)=> setTask(e.target.value)}
                value={task}
            />
            <button onClick=
            {() =>{ 
                    handleSubmit(task);
                    setTask("")
            }}
            >Submit the Task</button>
            
        </div>
    )
}

export default Task