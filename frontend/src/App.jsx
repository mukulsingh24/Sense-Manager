import { useState } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import Task from "./components/task";
import List from "./components/taskList";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleSubmit = (newtask) => {
    if (!newtask.trim()) {
      showMessage("Task cannot be empty.");
      return;
    }

    if (editIndex != null) {
      const newList = taskList.map((item, index) => {
        if (index === editIndex) {
          return newtask;
        }
        return item;
      });
      setTaskList(newList);
      setEditIndex(null);
      showMessage("Task edited successfully!");
    } else {
      setTaskList([...taskList, newtask]);
      showMessage("Task added successfully!");
    }
    setTask("");
  };

  const handleEdit = (indexToEdit) => {
    const tasktoEdit = taskList[indexToEdit];
    setTask(tasktoEdit);
    setEditIndex(indexToEdit);
  };

  const handleDelete = (indextoDelete) => {
    const newList = taskList.filter((_, index) => {
      return index !== indextoDelete;
    });
    setTaskList(newList);
    showMessage("Task deleted successfully!");
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 m-0">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
          style={{ background: "#1a1a2e" }}
        >
          <Task
            handleSubmit={handleSubmit}
            task={task}
            setTask={setTask}
            editIndex={editIndex}
          />
        </Col>

        <Col
          md={6}
          className="bg-light"
          style={{ overflowY: "auto", maxHeight: "100vh" }}
        >
          <List
            taskList={taskList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Col>
      </Row>

      {message && (
        <Alert
          variant="success"
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050,
          }}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
}

export default App;
