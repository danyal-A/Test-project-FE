import React from "react";
import Lottie from "react-lottie-player";
import loginImage from "../Animations/animation_ll6lbfrj.json";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const history = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  // const [data, setData] = useState([]);
  const getdata = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    // Update the state for the corresponding input field
    setData({
      ...data,
      [name]: value,
      role: selectedValue,
    });
  };

  const addData = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        data
      );
      console.log(res.data.user.role);
      localStorage.setItem("loginuser", JSON.stringify(res.data));
      // , {headers:{
      //   Authorization: "Bearer + token"

      // }}
      if (res.data.user.role === "User") {
        history(`/timeline/${res.data.user.id}`);
      } else if (res.data.user.role === "Moderator") {
        history(`/timeline/moderator/${res.data.user.id}`);
      } else {
        history(`/timeline/admin/${res.data.user.id}`);
      }
      // console.log(res.data.id);
    } catch (error) {
      if (error.response.status === 429) {
        setDisabled(true);
        setShowPopup(true);
        setTimeout(() => {
          setDisabled(false);
          setShowPopup(false);
        }, 1 * 60 * 1000); // Re-enable after 5 minutes
      }
      console.log(error);
    }
  };
  // console.log(selectedValue);
  return (
    <div className="h-screen flex justify-center items-center space-x-12">
      <div className="">
        <div className="flex justify-between">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="User"
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio1">
              User
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="Moderator"
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio2">
              Moderator
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="Admin"
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <label class="form-check-label" for="inlineRadio1">
              Admin
            </label>
          </div>
        </div>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={data.email}
                placeholder="Enter Email"
                name="email"
                onChange={getdata}
                disabled={disabled}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={data.password}
                placeholder="******************"
                onChange={getdata}
                disabled={disabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={addData}
                disabled={disabled}
              >
                Sign In
              </button>
              <Link
                className="hover:text-gray-300  no-underline"
                to="/"
                disabled={disabled}
              >
                Cancel
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
      <div className="">
        <Lottie loop animationData={loginImage} play />
      </div>
      {showPopup && (
        <div className="popup">
          Login is disabled for 5 minutes. Please try again later.
        </div>
      )}
    </div>
  );
}
