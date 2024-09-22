import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "url('https://i.gifer.com/origin/97/9772842ed4f0a5c47f4589fd9a90517f.gif')", // Replace with your GIF URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start", // Align to the left
          }}
        >
          <Card
            className="p-4 shadow-lg"
            style={{
              maxWidth: "400px",
              width: "100%",
              backgroundColor: "rgba(52, 58, 64, 0.8)", // Semi-transparent background for contrast
              borderRadius: "12px",
              marginLeft: "20px", // Adjust this value to move the card further left or right
            }}
          >
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: "#ffffff" }}>Sign In</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: "#ffffff" }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ backgroundColor: "#495057", color: "#ffffff", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: "#ffffff" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: "#495057", color: "#ffffff", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="text-center mb-3">
                  <Form.Label style={{ color: "#ffffff" }}>
                    Not Registered?{" "}
                    <Link to={"/register"} className="text-decoration-none" style={{ color: "#0d6efd" }}>
                      Register Now
                    </Link>
                  </Form.Label>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-bold fs-5"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Reduced opacity for lighter overlay
          zIndex: 0,
        }}
      ></div>
    </div>
  );
}

export default Login;
