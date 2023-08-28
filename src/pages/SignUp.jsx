import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Lottie from "react-lottie-player";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import signlogo from "../Animations/animation_ll6ibmq4.json";
function SignUp() {
  const [selectedValue, setSelectedValue] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const histoty = useNavigate();
  const getdata = (event) => {
    const { name, value } = event.target;

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
        "http://localhost:8800/api/auth/register",
        data
      );
      toast.success("Successfully SignUp", {
        position: toast.POSITION.TOP_CENTER,
      });

      histoty("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // Handle duplicate email error
          toast.error(
            "Email is already in use. Please choose a different email.",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (error.response.status === 400) {
          // Handle role being null error
          toast.error("Please fill the required fields", {
            position: toast.POSITION.TOP_CENTER,
          });
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
      <div class="max-w-xs w-max">
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
        </div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={data.name}
              placeholder="Enter Name"
              name="name"
              onChange={getdata}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={data.email}
              placeholder="Enter Email"
              name="email"
              onChange={getdata}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={data.password}
              placeholder="******************"
              onChange={getdata}
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirpassword"
              type="password"
              value={data.confirmpassword}
              name="confirmpassword"
              placeholder="******************"
              onChange={getdata}
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        <p class="text-center text-gray-500 text-xs">&copy; Danyal-1475</p>
      </div>
      <div>
        <Lottie loop animationData={signlogo} play />
      </div>
    </div>
  );
}

export default SignUp;
