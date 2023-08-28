import axios from "axios";
import React, { useState } from "react";
// import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import { toast } from "react-toastify";

const EditProfile = ({ isOpen, onRequestClose }) => {
  console.log("enter in edit");
  const userdata = JSON.parse(localStorage.getItem("loginuser"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Process the name and email data, e.g., send it to the backend
    await axios.put(`http://localhost:8800/api/users/${userdata.user.id}`, {
      name,
      email,
    });
    toast.success("Successfully Edited!");
    // Close the modal
    onRequestClose();
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onRequestClose()}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfile;
