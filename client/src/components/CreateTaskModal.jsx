import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Stack, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; // Import the CSS file

const CreateTaskModal = ({
  showCreateModal,
  handleCreateModalClose,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleCreateTask = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/task/post",
        { title, description, date },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setTasks((prevTasks) => [...prevTasks, res.data.task]);
      setTitle("");
      setDescription("");
      setDate("");
      handleCreateModalClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal
      show={showCreateModal}
      onHide={handleCreateModalClose}
      style={{
        backdropFilter: "blur(4px)", // Background blur effect
      }}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#e9ecef", // Modal header background color
          color: "#000000", // Modal header text color
        }}
      >
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#ffffff", // Modal body background color
          color: "#000000", // Modal body text color
        }}
      >
        <Form>
          <Stack gap={3}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="custom-placeholder" // Apply custom placeholder class
                style={{
                  borderRadius: "8px", // Rounded corners
                  border: "1px solid #ced4da", // Border color
                  padding: "8px", // Padding inside the control
                  backgroundColor: "#f8f9fa", // Background color for the input
                  color: "#000000", // Text color for the input
                }}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="custom-placeholder" // Apply custom placeholder class
                style={{
                  borderRadius: "8px", // Rounded corners
                  border: "1px solid #ced4da", // Border color
                  padding: "8px", // Padding inside the control
                  backgroundColor: "#f8f9fa", // Background color for the textarea
                  color: "#000000", // Text color for the textarea
                }}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Due Date</Form.Label>
              <div className="date-input-wrapper">
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="custom-placeholder" // Apply custom placeholder class
                  style={{
                    borderRadius: "8px", // Rounded corners
                    border: "1px solid #ced4da", // Border color
                    padding: "8px", // Padding inside the control
                    backgroundColor: "#f8f9fa", // Background color for the date input
                    color: "#000000", // Text color for the date input
                    paddingRight: "30px", // Add space for the icon
                  }}
                />
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="calendar-icon"
                />
              </div>
            </Form.Group>
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#e9ecef", // Modal footer background color
          color: "#000000", // Modal footer text color
        }}
      >
        <Button variant="secondary" onClick={handleCreateModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateTask}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
