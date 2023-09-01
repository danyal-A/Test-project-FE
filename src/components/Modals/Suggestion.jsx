import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { createSuggestion } from "../../Api/suggestion";
const Suggestion = ({ isOpen, onRequestClose, user }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createSuggestion(user.id, content, user.UserId);
    toast.success("Suggestion send successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
    onRequestClose();
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onRequestClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Suggestion For Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Content</h4>
          <textarea
            className="w-full bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            placeholder="Write suggestion here...."
            type="text"
            name="title"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
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
    </>
  );
};

export default Suggestion;
