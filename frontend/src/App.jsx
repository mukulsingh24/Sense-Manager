import { useState } from 'react'
import Task from './components/task'
import List from './components/tasklist'
function App() {
  return (
    <div className="App">
      <Task />
      <List />
    </div>
  )
}
export default App
