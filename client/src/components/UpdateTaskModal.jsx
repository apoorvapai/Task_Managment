import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { FaCalendarAlt } from "react-icons/fa"; // Ensure correct icon import

const UpdateTaskModal = ({
  showUpdateModal,
  handleUpdateModalClose,
  id,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [archived, setArchived] = useState(false);
  const [date, setDate] = useState(""); // New state for the date
  const [progress, setProgress] = useState(0); // New state for the progress

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/task/single/${id}`, {
          withCredentials: true,
        });
        setTitle(res.data.task.title);
        setDescription(res.data.task.description);
        setStatus(res.data.task.status);
        setArchived(res.data.task.archived);
        setDate(res.data.task.date); // Set the existing date
        setProgress(res.data.task.progress || 0); // Set the existing progress or default to 0
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/task/update/${id}`,
        {
          title,
          description,
          status,
          archived,
          date, // Include date in the update request
          progress, // Include progress in the update request
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task._id === id) {
            return {
              ...task,
              title,
              description,
              status,
              archived,
              date, // Update the date in the task
              progress, // Update the progress in the task
            };
          } else {
            return task;
          }
        });
        return updatedTasks;
      });
      handleUpdateModalClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal
      show={showUpdateModal}
      onHide={handleUpdateModalClose}
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
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#ffffff", // Background color for modal body
          color: "#000000", // Text color for modal body
        }}
      >
        <Stack gap={2}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              borderRadius: "8px", // Rounded corners
              padding: "8px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa", // Background color for the input
              color: "#000000", // Text color for the input
            }}
          />
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows={5} // Adjust the number of rows as needed
            style={{
              borderRadius: "8px", // Rounded corners
              padding: "8px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa", // Background color for the textarea
              color: "#000000", // Text color for the textarea
            }}
          />
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Due Date</label>
          <div style={{ position: 'relative' }}>
            <FaCalendarAlt
              style={{
                color: '#000000', // Icon color
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                fontSize: '18px',
              }}
            />
            <input
              type="date"
              value={date ? date.split("T")[0] : ""} // Convert date to YYYY-MM-DD format
              onChange={(e) => setDate(e.target.value)}
              style={{
                borderRadius: "8px", // Rounded corners
                padding: "8px 8px 8px 36px", // Add padding to accommodate icon
                border: "1px solid #ced4da",
                backgroundColor: "#f8f9fa", // Background color for the date input
                color: "#000000", // Text color for the date input
                position: 'relative',
              }}
            />
          </div>
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              borderRadius: "8px", // Rounded corners
              padding: "8px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa", // Background color for the select input
              color: "#000000", // Text color for the select input
            }}
          >
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Progress</label>
          <select
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            style={{
              borderRadius: "8px", // Rounded corners
              padding: "8px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa", // Background color for the progress select input
              color: "#000000", // Text color for the progress select input
            }}
          >
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
              <option key={value} value={value}>
                {value}%
              </option>
            ))}
          </select>
        </Stack>
        <br />
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#e9ecef", // Background color for modal footer
          color: "#000000", // Text color for modal footer
        }}
      >
        <Button variant="secondary" onClick={handleUpdateModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateTask}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTaskModal;
