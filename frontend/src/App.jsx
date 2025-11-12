import { useState } from 'react'
import Task from './components/task'
import List from './components/taskList';
function App() {
  const[taskList,setTaskList] = useState([]);
  const handleSubmit=()=>{
        setTaskList([...taskList,task])
        setTask("")
    } 
  const handleEdit = () =>{
      const changes = taskList.push();
    }
    const handleDelete = () =>{
      
    }
  return (
    <div className="App">
      <Task  handleSubmit = {handleSubmit} />
      <List handleDelete = {handleDelete} handleEdit = {handleEdit} />
    </div>
  )
}
export default App
