import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Login from "./pages/login"
import Register from './pages/register';
import Task from './components/task';
import List from './components/taskList';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import api from './api'

function TaskManager({ onLogout }) {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]); 
  const [editTask, setEditTask] = useState(null); 
  const [message, setMessage] = useState(""); 
  const [username, setUsername] = useState(localStorage.getItem('username') || 'User');

  const showMessage = (text, variant = "success") => {
    setMessage({ text, variant });
    setTimeout(() => setMessage(""), 3000);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTaskList(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        if (error.response && error.response.status === 401) {
          onLogout();
        }
      }
    };
    fetchTasks();
  }, [onLogout]);

  const handleSubmit = async (newTitle) => {
    if (!newTitle.trim()) {
      showMessage("Task cannot be empty.", "danger");
      return;
    }
    if (editTask) {
      try {
        const response = await api.put(`/tasks/${editTask._id}`, { title: newTitle });
        setTaskList(taskList.map(t => t._id === editTask._id ? response.data : t));
        showMessage("Task updated successfully!");
      } catch (error) {
        console.error('Update failed', error);
        showMessage("Update failed.", "danger");
      }
    } else {
      try {
        const response = await api.post('/tasks', { title: newTitle });
        setTaskList([...taskList, response.data]);
        showMessage("Task created successfully!");
      } catch (error) {
        console.error('Create failed', error);
        showMessage("Create failed.", "danger");
      }
    }
    setTask("");
    setEditTask(null);
  };

  const handleEdit = (indexToEdit) => {
    const taskToEdit = taskList[indexToEdit];
    setTask(taskToEdit.title);
    setEditTask(taskToEdit); 
  };

  const handleDelete = async (indexToDelete) => {
    const taskToDelete = taskList[indexToDelete];
    try {
      await api.delete(`/tasks/${taskToDelete._id}`);
      setTaskList(taskList.filter(t => t._id !== taskToDelete._id));
      showMessage("Task deleted successfully!");
    } catch (error) {
      console.error('Delete failed', error);
      showMessage("Delete failed.", "danger");
    }
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 m-0">
        <Col md={6} className="d-flex align-items-center justify-content-center" style={{ background: '#1a1a2e' }}>
          <Button 
            variant="outline-danger" 
            onClick={onLogout} 
            style={{position: 'absolute', top: 20, left: 20}}
          >
            Logout
          </Button>
          <div className="text-center w-100">
            <h2 className="text-white mb-4">Welcome back, {username}!</h2>
            <Task 
              handleSubmit={handleSubmit} 
              task={task} 
              setTask={setTask} 
              editIndex={editTask ? true : null} 
            />
          </div>
        </Col>
        
        <Col md={6} className="bg-light" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          {message && (
            <Alert 
              variant={message.variant} 
              style={{ position: 'sticky', top: '20px', zIndex: 10, left: '20px', right: '20px' }}
            >
              {message.text}
            </Alert>
          )}
          <List 
            taskList={taskList} 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
          />
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!isLoggedIn ? <Register /> : <Navigate to="/" />} 
      />
      <Route 
        path="/" 
        element={isLoggedIn ? <TaskManager onLogout={handleLogout} /> : <Navigate to="/login" />} 
      />
      
    </Routes>
  );
}

export default App;