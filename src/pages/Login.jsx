import React from "react";
import Lottie from "react-lottie-player";
import loginImage from "../Animations/animation_ll6lbfrj.json";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Api/auth";

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
  const getdata = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setData({
      ...data,
      [name]: value,
      role: selectedValue,
    });
  };

  const addData = async (event) => {
    event.preventDefault();
    try {
      const res = await loginUser(data);
      console.log(res);
      localStorage.setItem("loginuser", JSON.stringify(res.data));

      if (res.data.user.role === "User") {
        toast.success("User Successfully Login", {
          position: toast.POSITION.TOP_CENTER,
        });
        history(`/timeline/${res.data.user.id}`);
      } else if (res.data.user.role === "Moderator") {
        toast.success("Moderator Successfully Login", {
          position: toast.POSITION.TOP_CENTER,
        });
        history(`/timeline/moderator/${res.data.user.id}`);
      } else {
        toast.success("Admin Successfully Login", {
          position: toast.POSITION.TOP_CENTER,
        });
        history(`/timeline/admin/${res.data.user.id}`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          toast.error("Login is Disabled for 5 minutes", {
            position: toast.POSITION.TOP_CENTER,
          });
          setDisabled(true);
          setShowPopup(true);
          setTimeout(() => {
            setDisabled(false);
            setShowPopup(false);
          }, 1 * 60 * 1000);
        } else if (error.response.data.error === "Invalid Email") {
          toast.error("Invalid Email", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (error.response.data.error === "Invalid password") {
          toast.error("Invalid Password", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          console.log(error);
        }
      }
    }
  };
  return (
    <div className="h-screen flex justify-center items-center space-x-12">
      <div className="">
        <div className="flex justify-between">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="User"
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              User
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="Moderator"
              onChange={(e) => setSelectedValue(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Moderator
            </label>
          </div>
        </div>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
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
                htmlFor="password"
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
