import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const EditProfileModal = ({ showEditModal, handleEditModalClose, userId, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(""); // New state for the avatar URL

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/user/${userId}`, {
          withCredentials: true,
        });
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setAvatar(res.data.user.avatar ? res.data.user.avatar.url : ""); // Set the existing avatar URL
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/user/update/${userId}`,
        {
          name,
          email,
          phone,
          avatar, // Include avatar URL in the update request
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);

      setUser((prevUser) => ({
        ...prevUser,
        name,
        email,
        phone,
        avatar, // Update the avatar in the user profile
      }));
      handleEditModalClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal show={showEditModal} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Stack>
        <br />
        <Stack gap={2}>
          <label>Avatar URL</label>
          <input
            type="text"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateProfile}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
