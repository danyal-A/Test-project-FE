import React from "react";
import Lottie from "react-lottie-player";
import loginImage from "../Animations/animation_ll6lbfrj.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [validin, setValidin] = useState({
    id: "",
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  const getdata = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
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
      <div className="">
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
                value={validin.email}
                placeholder="Enter Email"
                name="email"
                onChange={getdata}
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
                value={validin.password}
                placeholder="******************"
                onChange={getdata}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={addData}
              >
                Sign In
              </button>
              <a
                className="inline-block no-underline align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
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
    </div>
  );
}
