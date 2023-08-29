import React, { useEffect, useState } from "react";
import NavbarT from "../Components/NavbarT";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import profilelogo from "../Animations/animation_llnji2l0.json";
import EditProfile from "../Components/Modals/EditProfile";
import NavbarM from "../Components/Moderator/NavbarM";
import { getData } from "../Api/profile";

const Profile = () => {
  const userdata = JSON.parse(localStorage.getItem("loginuser"));
  const [details, setDetails] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useNavigate();
  const closemodal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    const fetchdata = async () => {
      const user = await getData(userdata);
      setDetails(user);
    };
    fetchdata();
  }, [modalIsOpen]);
  return (
    <div>
      {userdata.user.role === "User" ? (
        <NavbarT userid={userdata.user.id} />
      ) : (
        <NavbarM userid={userdata.user.id} />
      )}
      {details && (
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
          <Lottie loop animationData={profilelogo} play />{" "}
          <h2 className="text-center text-2xl font-semibold mt-3">
            {details.data.name}
          </h2>
          <p className="text-center text-gray-600 mt-1">{details.data.email}</p>
          <div className="flex justify-center mt-5"></div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p>
          </div>
          <div className="text-center mt-4">
            {userdata.user.role === "User" ? (
              <button
                className=" text-white bg-red-500 p-3 rounded font-bold"
                onClick={() => history(`/timeline/${userdata.user.id}`)}
              >
                Close
              </button>
            ) : (
              <button
                className=" text-white bg-red-500 p-3 rounded font-bold"
                onClick={() =>
                  history(`/timeline/moderator/${userdata.user.id}`)
                }
              >
                Close
              </button>
            )}
            <button
              className=" text-white ml-2 bg-green-500 p-3 rounded font-bold"
              onClick={() => setModalIsOpen(true)}
            >
              Edit
            </button>
          </div>
        </div>
      )}
      {modalIsOpen && (
        <EditProfile isOpen={modalIsOpen} onRequestClose={closemodal} />
      )}
    </div>
  );
};

export default Profile;
