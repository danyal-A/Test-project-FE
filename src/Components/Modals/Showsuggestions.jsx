import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
const Showsuggestions = ({ isOpen, onRequestClose, userid }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchdata = useCallback(async () => {
    try {
      const suggestions = await axios.get(
        `http://localhost:8800/api/suggestion/${userid.id}`
      );
      console.log(suggestions);
      setSuggestions(suggestions.data);
      setIsUpdate(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, []);

  const handleAccept = async (suggest) => {
    try {
      const post = await axios.put(
        `http://localhost:8800/api/suggestion/${suggest.PostId}`,
        {
          content: suggest.content,
        }
      );
      // console.log(post);
      toast.success("Accepted suggestion!", {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchdata();
      // fetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const sugesstion = await axios.delete(
        `http://localhost:8800/api/suggestion/${id}`
      );
      console.log(sugesstion);
      toast.error("Rejected suggestion!", {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchdata();
      // fetch();
    } catch (error) {
      console.log(error);
    }
  };
  // const handleReply = async (id) => {
  //   try {
  //     const suggest = await axios.put(
  //       `http://localhost:8800/api/suggestion/${id}`,
  //       {
  //         // reply:
  //       }
  //     );
  //     setIsUpdate(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
            <div>
              <h4>{suggest.Post.title}</h4>
              <p>{suggest.content}</p>
              <button
                className=" text-white bg-green-500 p-1.5 rounded font-bold"
                onClick={() => handleAccept(suggest)}
              >
                Accept
              </button>
              {/* <button
                className=" text-white ml-2 bg-green-500 p-1.5 rounded font-bold"
                onClick={() => handleReply(suggest.id)}
              >
                Reply
              </button> */}
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
