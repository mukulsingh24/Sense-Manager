import { useState } from 'react';
import { Row, Col, Button, Container, Form, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'
import { GoogleLogin } from '@react-oauth/google';
import { FaEnvelope, FaLock } from 'react-icons/fa';

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
      localStorage.setItem('username', response.data.username || 'User');
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

  const handleGoogleLogin = async(credentialResponse) => {
    setError("");
    try {
      const response = await api.post('/auth/google-login', {
        token: credentialResponse.credential
      });
      console.log("Google Login Successful");
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username || 'User');
      onLogin();
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Google Login failed. Please try again.");
    }
  };
  return (
    <div className="auth-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={10} md={8} lg={6} xl={5}>
            <Card className="auth-card animate-fade-in p-4 p-md-5" style={{ minHeight: '500px' }}>
              <div className="auth-header">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Please login to your account</p>
              </div>
              
              {error && <Alert variant="danger" className="text-center border-0 shadow-sm">{error}</Alert>}

              <Form>
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
                  onClick={handleLogin}
                  className="w-100 auth-btn mt-3"
                >
                  Sign In
                </Button>
              </Form>

              <div className="divider">OR</div>

              <div className="google-btn-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setError("Google Login Failed")}
                  useOneTap
                  theme="outline"
                  shape="pill"
                  width="100%"
                />
              </div>

              <p className="text-center mt-4 mb-0 text-muted">
                Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;