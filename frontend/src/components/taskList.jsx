import React from "react";

function List ({taskList,handleEdit,handleDelete}){
    return(
        <div>
            <h1>TasksList</h1>
            <ul>
            {taskList.map((item,index)=>(
            <li key={index}>{item}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
            ))}
            </ul>
        </div>
    )
}
export default List;