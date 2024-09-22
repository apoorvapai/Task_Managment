import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Card, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Home = ({ isAuthenticated, tasks, setTasks, taskTitle }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);
  const [updatedTaskId, setUpdateTaskId] = useState(null);
  const [taskFilter, setTaskFilter] = useState("all");

  const today = moment().format("YYYY-MM-DD");

  const tasksDueToday = tasks.filter(
    (task) => moment(task.date).format("YYYY-MM-DD") === today
  );

  const overdueTasks = tasks.filter(
    (task) => moment(task.date).isBefore(today) && task.status !== "completed"
  );

  const remainingTasks = tasks.filter(
    (task) => moment(task.date).format("YYYY-MM-DD") !== today
  );

  const filteredTasks = () => {
    switch (taskFilter) {
      case "completed":
        return tasks.filter((task) => task.status === "completed");
      case "incomplete":
        return tasks.filter((task) => task.status === "incomplete");
      case "overdue":
        return overdueTasks;
      default:
        return remainingTasks;
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  const getCardBackgroundColor = () => "#fff";
  const getCardShadow = () => "0 4px 8px rgba(0, 0, 0, 0.1)";

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container-fluid" style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f5f5f5", 
      padding: "2rem" 
    }}>
      <div className="row mb-3">
        <div className="col text-end">
          <Button variant="primary" onClick={handleCreateModalShow}>
            <FaPlus className="me-2" /> Create Task
          </Button>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="row mb-3">
        <div className="col">
          <Button variant="info" onClick={() => setTaskFilter("all")}>
            <FaPlus className="me-2" /> All Tasks
          </Button>{" "}
          <Button variant="success" onClick={() => setTaskFilter("completed")}>
            <FaCheck className="me-2" /> Completed Tasks
          </Button>{" "}
          <Button variant="danger" onClick={() => setTaskFilter("incomplete")}>
            <FaTimes className="me-2" /> Incomplete Tasks
          </Button>{" "}
          <Button variant="warning" onClick={() => setTaskFilter("overdue")}>
            <FaTimes className="me-2" /> Overdue Tasks
          </Button>{" "}
        </div>
      </div>

      {/* Tasks due today */}
      {taskFilter === "all" && (
        <div className="row mb-3">
          <h2 style={{ color: "#007bff" }}>Tasks Due Today</h2>
          {tasksDueToday.length > 0 ? (
            tasksDueToday.map((task) => (
              <div key={task._id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                <Card
                  className="shadow-sm h-100"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: getCardBackgroundColor(),
                    boxShadow: getCardShadow(),
                    position: "relative"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "20px"
                  }}>
                    <CircularProgressbar
                      value={task.progress}
                      text={`${task.progress}%`}
                      styles={{
                        path: { stroke: "#fff", strokeWidth: 10 },
                        trail: { stroke: "transparent" },
                        text: { fill: "#fff", fontSize: "20px" }
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column p-4">
                    <Stack gap={2}>
                      <Card.Title className="mb-1" style={{ color: "#333" }}>
                        {task.title.length <= 30 ? task.title : task.title.slice(0, 30) + "..." }
                      </Card.Title>
                      <hr style={{ borderTop: "2px solid black", marginTop: "0.5rem" }} />
                      <Card.Text className="mb-2" style={{ color: "black" }}>
                        Due Date: {moment(task.date).format("YYYY-MM-DD")}
                      </Card.Text>
                      <Card.Text className="flex-grow-1" style={{ color: "#555" }}>
                        {task.description.length <= 150 ? task.description : task.description.slice(0, 150) + "..." }
                      </Card.Text>
                    </Stack>
                    <Stack direction="horizontal" className="justify-content-end mt-3" gap={3}>
                      <MdEdit
                        onClick={() => handleUpdateModalShow(task._id)}
                        className="fs-5 cursor-pointer text-primary"
                      />
                      <MdDelete
                        onClick={() => deleteTask(task._id)}
                        className="fs-5 cursor-pointer text-danger"
                      />
                      <FaEye
                        onClick={() => handleViewModalShow(task._id)}
                        className="fs-5 cursor-pointer text-info"
                      />
                    </Stack>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <h3 style={{ color: "#808080" }}>No tasks due today.</h3>
          )}
        </div>
      )}

      {/* Overdue tasks */}
      {taskFilter === "overdue" && (
        <div className="row mb-3">
          <h2 style={{ color: "#ff0000" }}>Overdue Tasks</h2>
          {overdueTasks.length > 0 ? (
            overdueTasks.map((task) => (
              <div key={task._id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                <Card
                  className="shadow-sm h-100"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: getCardBackgroundColor(),
                    boxShadow: getCardShadow(),
                    position: "relative"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#ff0000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "20px"
                  }}>
                    <CircularProgressbar
                      value={task.progress}
                      text={`${task.progress}%`}
                      styles={{
                        path: { stroke: "#fff", strokeWidth: 10 },
                        trail: { stroke: "transparent" },
                        text: { fill: "#fff", fontSize: "20px" }
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column p-4">
                    <Stack gap={2}>
                      <Card.Title className="mb-1" style={{ color: "#333" }}>
                        {task.title.length <= 30 ? task.title : task.title.slice(0, 30) + "..." }
                      </Card.Title>
                      <hr style={{ borderTop: "2px solid black", marginTop: "0.5rem" }} />
                      <Card.Text className="mb-2" style={{ color: "black" }}>
                        Due Date: {moment(task.date).format("YYYY-MM-DD")}
                      </Card.Text>
                      <Card.Text className="flex-grow-1" style={{ color: "#555" }}>
                        {task.description.length <= 150 ? task.description : task.description.slice(0, 150) + "..." }
                      </Card.Text>
                    </Stack>
                    <Stack direction="horizontal" className="justify-content-end mt-3" gap={3}>
                      <MdEdit
                        onClick={() => handleUpdateModalShow(task._id)}
                        className="fs-5 cursor-pointer text-primary"
                      />
                      <MdDelete
                        onClick={() => deleteTask(task._id)}
                        className="fs-5 cursor-pointer text-danger"
                      />
                      <FaEye
                        onClick={() => handleViewModalShow(task._id)}
                        className="fs-5 cursor-pointer text-info"
                      />
                    </Stack>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <h3 style={{ color: "#808080" }}>No overdue tasks.</h3>
          )}
        </div>
      )}

      {/* Filtered tasks */}
      {taskFilter !== "overdue" && (
        <div className="row">
          <h2 style={{ color: "#007bff" }}>{taskFilter.charAt(0).toUpperCase() + taskFilter.slice(1)} Tasks</h2>
          {filteredTasks().length > 0 ? (
            filteredTasks().map((task) => (
              <div key={task._id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                <Card
                  className="shadow-sm h-100"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: getCardBackgroundColor(),
                    boxShadow: getCardShadow(),
                    position: "relative"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "20px"
                  }}>
                    <CircularProgressbar
                      value={task.progress}
                      text={`${task.progress}%`}
                      styles={{
                        path: { stroke: "#fff", strokeWidth: 10 },
                        trail: { stroke: "transparent" },
                        text: { fill: "#fff", fontSize: "20px" }
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column p-4">
                    <Stack gap={2}>
                      <Card.Title className="mb-1" style={{ color: "#333" }}>
                        {task.title.length <= 30 ? task.title : task.title.slice(0, 30) + "..." }
                      </Card.Title>
                      <hr style={{ borderTop: "2px solid black", marginTop: "0.5rem" }} />
                      <Card.Text className="mb-2" style={{ color: "black" }}>
                        Due Date: {moment(task.date).format("YYYY-MM-DD")}
                      </Card.Text>
                      <Card.Text className="flex-grow-1" style={{ color: "#555" }}>
                        {task.description.length <= 150 ? task.description : task.description.slice(0, 150) + "..." }
                      </Card.Text>
                    </Stack>
                    <Stack direction="horizontal" className="justify-content-end mt-3" gap={3}>
                      <MdEdit
                        onClick={() => handleUpdateModalShow(task._id)}
                        className="fs-5 cursor-pointer text-primary"
                      />
                      <MdDelete
                        onClick={() => deleteTask(task._id)}
                        className="fs-5 cursor-pointer text-danger"
                      />
                      <FaEye
                        onClick={() => handleViewModalShow(task._id)}
                        className="fs-5 cursor-pointer text-info"
                      />
                    </Stack>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <h3 style={{ color: "#808080" }}>No tasks to show.</h3>
          )}
        </div>
      )}

      {/* Modals */}
      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      <UpdateTaskModal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        setTasks={setTasks}
      />

      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </div>
  );
};

export default Home;
