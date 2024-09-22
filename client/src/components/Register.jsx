import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Card, Row, Col } from "react-bootstrap"; // Import Row and Col
import { Link, Navigate } from "react-router-dom";
import task from "../images/task.gif"

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
    await axios
      .post("http://localhost:4000/api/v1/user/register", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAvatar("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container
      fluid // Make the container fluid to fill the viewport
      className="d-flex justify-content-start align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#ffffff" }} // Set background color to white
    >
      <Row className="w-100">
        <Col md={5} className="d-flex justify-content-end"> {/* Adjust column size */}
          <Card
            className="p-4 shadow-lg"
            style={{
              maxWidth: "500px", // Increase maxWidth to make the card wider
              width: "100%",
              backgroundColor: "#343a40", // Darker background for the card
              borderRadius: "12px",
            }}
          >
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: "#ffffff" }}>Register</h3>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label style={{ color: "#ffffff" }}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ backgroundColor: "#495057", color: "#ffffff", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: "#ffffff" }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ backgroundColor: "#495057", color: "#ffffff", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label style={{ color: "#ffffff" }}>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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

                <Form.Group className="mb-3" controlId="formBasicAvatar">
                  <Form.Label style={{ color: "#ffffff" }}>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={avatarHandler}
                    style={{ backgroundColor: "#495057", color: "#ffffff", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="text-center mb-3">
                  <Form.Label style={{ color: "#ffffff" }}>
                    Already Registered?{" "}
                    <Link to={"/login"} className="text-decoration-none" style={{ color: "#0d6efd" }}>
                      Login
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
        </Col>

        <Col md={7} className="d-flex justify-content-center align-items-center"> {/* Adjust column size */}
          {/* Add an image here */}
          <img
            src={task} 
            alt="Registration illustration"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "12px" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
