import { Row, Col, Button, Form } from "react-bootstrap";

function Task({ handleSubmit, task, setTask, editIndex }) {
  return (
    <Row className="w-100 justify-content-center">
      <Col xs={12} sm={10} md={12} lg={10} xl={8}>
        <div className="bg-white rounded-lg shadow-lg p-4 p-md-5" style={{ border: '3px solid #667eea' }}>
          <h1 className="text-center mb-4 text-primary fw-bold">Welcome to the Task Manager</h1>
          
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Your Task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
              size="lg"
              className="border-2"
              style={{ borderColor: '#667eea' }}
            />
          </Form.Group>
          
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(task);
            }}
            className="w-100 fw-bold"
            size="lg"
            style={{ backgroundColor: '#667eea', borderColor: '#667eea' }}
          >
            {editIndex != null ? "Update Task" : "Submit Task"}
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default Task;