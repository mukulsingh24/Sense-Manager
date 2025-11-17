import { useState } from 'react';
import { Row, Col, Button, Container, Form, Card, Alert } from "react-bootstrap";
import api from '../api'


function Register(){
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[error,setError] = useState("")
    const[success,setSuccess] = useState("")

    const handleRegister = async() =>{
        setError("")
        setSuccess("")
        if(!email || !password){
            setError("Enter valid Email and Password")
            return;
        }
        try{
            const response = await api.post('/auth/register',{
                email:email,
                password:password
            })
            console.log("Registration Successfull",response.data)
            setSuccess("Registation Successfull")
            setEmail("")
            setPassword("")
        }
        catch(err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); 
      } else {
        setError("Registration failed. Please try again.");
      }
    }

    }
    return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center" style={{ background: '#f8f9fa' }}>
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card className="shadow-lg p-4">
            <h1 className="text-center mb-4 text-primary fw-bold">Sign Up</h1>
            
            {/* Show error or success messages */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

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
              onClick={handleRegister}
              className="w-100 fw-bold mt-2"
              size="lg"
            >
              Create Account
            </Button>
            
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register