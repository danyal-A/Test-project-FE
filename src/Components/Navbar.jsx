import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex bg-transparent py-4 px-4 justify-end">
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
    </div>
  );
};

export default Navbar;
