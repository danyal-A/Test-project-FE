import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  deleteSuggestion,
  getSuggestion,
  modifySuggestion,
} from "../../Api/suggestion";
const Showsuggestions = ({ isOpen, onRequestClose, userid }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchdata = useCallback(async () => {
    try {
      const suggestions = await getSuggestion(userid.id);
      setSuggestions(suggestions.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, []);

  const handleAccept = async (suggest) => {
    await modifySuggestion(suggest.PostId, suggest.content);
    toast.success("Accepted suggestion!", {
      position: toast.POSITION.TOP_CENTER,
    });
    fetchdata();
  };

  const handleReject = async (id) => {
    await deleteSuggestion(id);
    toast.error("Rejected suggestion!", {
      position: toast.POSITION.TOP_CENTER,
    });
    fetchdata();
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
            Suggestions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {suggestions.map((suggest, index) => (
            <div key={index}>
              <h4>{suggest.Post.title}</h4>
              <p>{suggest.content}</p>
              <button
                className=" text-white bg-green-500 p-1.5 rounded font-bold"
                onClick={() => handleAccept(suggest)}
              >
                Accept
              </button>
              <button
                className=" text-white ml-2 bg-red-500 p-1.5 rounded font-bold"
                onClick={() => handleReject(suggest.id)}
              >
                Reject
              </button>
              <hr />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onRequestClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Showsuggestions;
