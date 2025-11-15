import React from "react";
// 1. Card is added to imports
import { Row, Col, Button, Container, ListGroup, Card } from "react-bootstrap";

// This component just renders the list.
// App.jsx places it in the right-hand column.
function List({ taskList, handleEdit, handleDelete }) {
  return (
    // 2. Use a simple Container for padding, not a fluid one.
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={12} sm={10} md={10} lg={10}> {/* Made wider for the column */}
          <h1 className="text-center text-primary fw-bold mb-4">Tasks List</h1>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={10} lg={10}> {/* Made wider for the column */}
          {taskList.length > 0 ? (
            <Card className="shadow-lg" style={{ border: '3px solid #667eea' }}>
              <Card.Body className="p-0">
                <ListGroup variant="flush">
                  {taskList.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-3"
                      style={{ backgroundColor: '#fff', borderBottom: '2px solid #e0e0e0' }}
                    >
                      <span className="text-start flex-grow-1 fw-500 text-dark" style={{ wordBreak: 'break-word' }}>
                        {item}
                      </span>
                      <div className="d-flex gap-2 flex-wrap">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(index)}
                          className="fw-bold"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(index)}
                          className="fw-bold"
                        >
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          ) : (
            <Card className="shadow-lg text-center p-4" style={{ border: '3px solid #667eea', backgroundColor: '#f9f9f9' }}>
              <h5 className="text-muted">No tasks yet. Add one to get started!</h5>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default List;