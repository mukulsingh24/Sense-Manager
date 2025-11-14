import React from "react";
import { Row, Col, Button, Container, ListGroup } from "react-bootstrap";
function List({ taskList, handleEdit, handleDelete }) {
  return (
    <Container>
      <h1 className="text-center mt-4">Tasks List</h1>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <ListGroup variant="flush">
            {taskList.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                {item}
                <div>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(index)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default List;