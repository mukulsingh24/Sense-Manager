import { useState } from 'react';
import { Row, Col, Button, Container, Form, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'
import { GoogleLogin } from '@react-oauth/google';

function Register({ onLogin }){
    const[username,setUsername] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[error,setError] = useState("")
    const[success,setSuccess] = useState("")
    const navigate = useNavigate();

    const handleGoogleLogin = async(credentialResponse) => {
        setError("");
        try {
          const response = await api.post('/auth/google-login', {
            token: credentialResponse.credential
          });
          console.log("Google Login Successful");
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username || 'User');
          if (onLogin) onLogin();
          navigate("/");
        } catch (error) {
          console.error(error);
          setError("Google Login failed. Please try again.");
        }
      };

    const handleRegister = async() =>{
        setError("")
        setSuccess("")
        if(!username || !email || !password){
            setError("Enter valid Username, Email and Password")
            return;
        }
        try{
            const response = await api.post('/auth/register',{
                username:username,
                email:email,
                password:password
            })
            console.log("Registration Successfull",response.data)
            setSuccess("Registation Successfull")
            setUsername("")
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
            
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
              />
            </Form.Group>

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

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">OR</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="d-flex justify-content-center mb-3">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                  setError("Google Login Failed");
                }}
              />
            </div>
            
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