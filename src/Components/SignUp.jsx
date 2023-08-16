import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import signlogo from "../Animations/animation_ll6ibmq4.json";
function SignUp() {
  const [validin, setValidin] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  const getdata = (event) => {
    const { name, value } = event.target;
    // Update the state for the corresponding input field
    setValidin({
      ...validin,
      [name]: value,
    });
  };

  const addData = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://localhost/8800/", {
          validin,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center space-x-12">
      <div class="max-w-xs w-max">
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
              value={validin.name}
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
              value={validin.email}
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
              value={validin.password}
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
              value={validin.confirmpassword}
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
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">&copy;</p>
      </div>
      <div>
        <Lottie loop animationData={signlogo} play />
      </div>
    </div>
  );
}

export default SignUp;
