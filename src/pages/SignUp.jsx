import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
// import axios from "axios";
import signlogo from "../animations/animation_ll6ibmq4.json";
import { registerUser } from "../Api/auth";
const SignUp = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const histoty = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const getdata = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
      role: selectedValue,
    });
  };
  const addData = async (event) => {
    event.preventDefault();
    try {
      if (data.password === confirmPassword) {
        await registerUser(data);
        toast.success("Successfully SignUp", {
          position: toast.POSITION.TOP_CENTER,
        });
        histoty("/login");
      } else {
        toast.error("Incorrect confirmPassword");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(
            "Email is already in use. Please choose a different email.",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (error.response.status === 400) {
          if (!error.response.data.error){
            toast.error(error.response.data.errors[0].msg, {
              position: toast.POSITION.TOP_CENTER,
            });
          }else {
            toast.error(error.response.data.error, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center space-x-12">
      <div className="max-w-xs w-max">
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
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={data.name}
              placeholder="Enter Name"
              name="name"
              onChange={getdata}
            />
          </div>
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
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirpassword"
              type="password"
              value={confirmPassword}
              name="confirmpassword"
              placeholder="******************"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addData}
            >
              Sign Up
            </button>
            <Link className="hover:text-gray-300  no-underline" to="/">
              Cancel
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy; Danyal-1475</p>
      </div>
      <div>
        <Lottie loop animationData={signlogo} play />
      </div>
    </div>
  );
};

export default SignUp;
