import { useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";

function Task({ handleSubmit, task, setTask }) {
  return (
    <Container>
      <h1 className="text-center">Task Manager</h1>

      <Row className="justify-content-md-center">

        <Col md={6}>
          <input
            type="text"
            placeholder="Enter Your Task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            className="form-control" 
          />
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(task);
              setTask("");
            }}
            className="w-100 mt-2" 
          >
            Submit the Task
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Task;