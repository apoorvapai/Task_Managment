import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { FaTasks } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";

function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {
  const [allTasks, setAllTasks] = useState([]);

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks); // Update tasks with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: "true" }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {isAuthenticated && (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
          <Navbar.Brand as={Link} to="/" onClick={() => setTaskTitle("Tasks")} className="me-auto">
          
            <span className="ms-4"></span> {/* Add space before the title */}
            <FaTasks className="me-2" />SNAP TASK  
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Item className="mx-2">
                <Link
                  to="/profile"
                  className="text-light d-flex align-items-center text-decoration-none"
                >
                  <FaUserCircle className="me-2" size={35} /> 
                </Link>
              </Nav.Item> */}
              <Nav.Item className="mx-2">
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="d-flex align-items-center"
                >
                  <FiLogOut className="me-2" />LOGOUT 
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
}

export default Header;
