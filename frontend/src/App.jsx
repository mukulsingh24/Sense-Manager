import { useState } from 'react'
import Task from './components/task'
import List from './components/taskList';
function App() {
  const[task,setTask] = useState("");
  const[taskList,setTaskList] = useState([]);
  const[editIndex,setEditIndex] = useState(null);
  const handleSubmit=(newtask)=>{
        if(editIndex != null){
          const newList = taskList.map((item,index) =>{
            if(index === editIndex){
              return newtask
            }
            return item;
          });
          setEditIndex(null);
          setTaskList(newList);
        }
        else{
        setTaskList([...taskList,newtask])
        }
        setTask("")
    } 
  const handleEdit = (editIndex) =>{
        const tasktoEdit = taskList[editIndex]
        setTask(tasktoEdit)
        setEditIndex(editIndex)
    }
    const handleDelete = (indextoDelete) =>{
      setTaskList(taskList.filter((item,index)=>{
        if(index != indextoDelete){
          return true;
        }
      }))
    }
  return (
    <div className="App">    
      <Task  handleSubmit = {handleSubmit} task={task} setTask={setTask} />
      <List taskList = {taskList} handleDelete = {handleDelete} handleEdit = {handleEdit} />
    </div>
  )
}
export default App
