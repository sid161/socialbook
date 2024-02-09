import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = users.find((user) => user.email === input.email);
    if (userData && input.password === userData.password) {
      localStorage.setItem("loggedIn", input.email);
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 bg-light rounded shadow">
            <h2 className="mb-4 text-center">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                />
              </Form.Group>

              <div className="text-center mb-3">
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </div>
              <div className="text-center">
                <h4>Not Registered? Please Register First</h4>
                <Button
                  onClick={() => navigate("/register")}
                  variant="secondary"
                  className="w-50"
                >
                  Signup
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Login;
