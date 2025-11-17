import { useState } from 'react';
import { Row, Col, Button, Container, Form, Card, Alert } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });
      console.log("Login Successful");
      localStorage.setItem('token', response.data.token);
      onLogin();
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ background: '#f8f9fa' }}>
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card className="shadow-lg p-4">
            <h1 className="text-center mb-4 text-primary fw-bold">Login</h1>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
            </Form.Group>
            
            <Button
              variant="primary"
              onClick={handleLogin}
              className="w-100 fw-bold mt-2"
              size="lg"
            >
              Login
            </Button>
            
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;