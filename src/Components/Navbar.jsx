import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  useEffect(()=>{
  //   const logg = localStorage.getItem("loggedin");
  //   console.log(isLoggedIn);
  //   setIsLoggedIn(logg);
  //  },[])

  return (
    <div className="flex bg-transparent py-4 px-4 justify-end">
      {isLoggedIn ? (
        <>
          {/* <Link className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded no-underline" to="/">React Project</Link> */}
          <div className="text-white font-bold py-2 px-4">
            <Link
              onClick={() => localStorage.setItem("loggedin", false)}
              className="mr-4 hover:text-gray-300 text-white no-underline"
              to="Signup"
            >
              LogOut
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* <Link className="bg-blue-500 hover:bg-blue-600 text-white no-underline font-bold py-2 px-4 rounded" to="/">Blog</Link> */}
          <div className="text-white font-bold py-2 px-4">
            <Link
              className="mr-4 hover:text-gray-300 text-white no-underline"
              to="/Signup"
            >
              SignUp
            </Link>
            <Link
              className="hover:text-gray-300  text-white no-underline"
              to="/Login"
            >
              LogIn
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
