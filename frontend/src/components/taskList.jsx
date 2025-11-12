import React from "react";

function List (handleEdit,handleDelete){
    return(
        <div>
            <h1>My Tasks</h1>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
export default List;