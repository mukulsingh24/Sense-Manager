import { useState } from 'react';
import { Row, Col, Button, Container, Form, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'
import { GoogleLogin } from '@react-oauth/google';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

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
    <div className="auth-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={10} md={8} lg={6} xl={5}>
            <Card className="auth-card animate-fade-in p-4 p-md-5" style={{ minHeight: '550px' }}>
              <div className="auth-header">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join us and start managing your tasks</p>
              </div>
              
              {error && <Alert variant="danger" className="text-center border-0 shadow-sm">{error}</Alert>}
              {success && <Alert variant="success" className="text-center border-0 shadow-sm">{success}</Alert>}

              <Form>
                <div className="custom-input-group">
                  <FaUser className="input-icon" />
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="custom-input"
                  />
                </div>

                <div className="custom-input-group">
                  <FaEnvelope className="input-icon" />
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="custom-input"
                  />
                </div>
                
                <div className="custom-input-group">
                  <FaLock className="input-icon" />
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input"
                  />
                </div>
                
                <Button
                  onClick={handleRegister}
                  className="w-100 auth-btn mt-3"
                >
                  Sign Up
                </Button>
              </Form>

              <div className="divider">OR</div>

              <div className="google-btn-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log('Login Failed');
                    setError("Google Login Failed");
                  }}
                  useOneTap
                  theme="outline"
                  shape="pill"
                  width="100%"
                />
              </div>
              
              <p className="text-center mt-4 mb-0 text-muted">
                Already have an account? <Link to="/login" className="auth-link">Log In</Link>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register