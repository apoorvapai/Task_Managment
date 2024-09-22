import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState(null); // Change initial state to null to better handle loading

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/task/single/${id}`, {
          withCredentials: true,
        });
        setTask(res.data.task);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <Modal
      show={showViewModal}
      onHide={handleViewModalClose}
      size="lg"
      style={{
        backdropFilter: "blur(4px)", // Reduced blur effect
      }}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#e9ecef", // Background color for modal header
          color: "#000000", // Text color for modal header
        }}
      >
        <Modal.Title>View Task</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#ffffff", // Background color for modal body
          color: "#000000", // Text color for modal body
          position: 'relative',
          padding: '20px',
        }}
      >
        {task ? (
          <>
            {/* Progress Bar */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '80px',  // Adjust the width as needed
              height: '80px', // Adjust the height as needed
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly opaque white background
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
            }}>
              <CircularProgressbar
                value={task.progress} // Use actual progress value
                text={`${task.progress}%`} // Use actual progress value
                styles={{
                  path: { stroke: "#007bff", strokeWidth: 8 },
                  trail: { stroke: "#d6d6d6" },
                  text: { fill: "#007bff", fontSize: "20px" } // Adjust font size as needed
                }}
              />
            </div>

            {/* Title */}
            <Stack className="mb-3">
              <p className="fw-bold mb-0">Title</p>
              <p>{task.title}</p>
            </Stack>

            {/* Date displayed below the title */}
            <Stack className="mb-3">
              <p className="fw-bold mb-0">Due Date</p>
              <p>
                {new Date(task.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Stack>

            {/* Description */}
            <Stack>
              <p className="fw-bold mb-0">Description</p>
              <p>{task.description}</p>
            </Stack>
          </>
        ) : (
          <p>Loading...</p> // Display loading text while the task is being fetched
        )}
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#e9ecef", // Background color for modal footer
          color: "#000000", // Text color for modal footer
        }}
      >
        <Button variant="secondary" onClick={handleViewModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTaskModal;
