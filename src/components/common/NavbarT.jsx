import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Showsuggestions from "../Modals/Showsuggestions";

const NavbarT = ({ userid }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useNavigate();
  const closemodal = () => {
    setModalIsOpen(false);
  };

  const handlelogout = () => {
    localStorage.removeItem("loginuser");
    localStorage.setItem("loggedin", false);
    history("/");
  };

  return (
    <>
      {!userid ? (
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
      ) : (
        <nav className="bg-white shadow-lg">
          <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div className="flex justify-between items-center">
              <div className="">
                <Link
                  className="text-2xl font-bold text-gray-800 md:text-3xl no-underline"
                  to={`/timeline/${userid}`}
                >
                  Blog Application
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  type="button"
                  className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                >
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path
                      className="hidden"
                      d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                    />
                    <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:block -mx-2">
              <Link
                className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2 no-underline"
                to={"/profile"}
              >
                Profile
              </Link>
              <button
                className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2 no-underline"
                onClick={() => setModalIsOpen(true)}
              >
                Suggestions
              </button>
              <button
                className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2 no-underline"
                onClick={() => handlelogout()}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
      {modalIsOpen && (
        <Showsuggestions
          isOpen={modalIsOpen}
          onRequestClose={closemodal}
          userid={userid}
        />
      )}
    </>
  );
};

export default NavbarT;