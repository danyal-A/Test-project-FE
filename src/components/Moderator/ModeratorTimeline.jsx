import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarM from "./NavbarM";

const ModeratorTimeline = () => {
  const history = useNavigate();
  const userid = useParams();

  return (
    <>
      <NavbarM />
      <div className="flex items-center justify-center h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-evenly">
            <div
              className="pt-6 w-full md:w-4/12 px-4 text-center cursor-pointer hover:scale-110 transition-all"
              onClick={() => history(`/action/${userid.id}`)}
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto ">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <i className="fas fa-clock-0"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Pending Post</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    All the pending post of the user are here Click on it
                  </p>
                </div>
              </div>
            </div>
            <div
              className="pt-6 w-full md:w-4/12 px-4 text-center cursor-pointer hover:scale-110 transition-all"
              onClick={() => history("/report")}
            >
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto cursor-pointer">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i className="fas fa-clock-0"></i>
                  </div>
                  <h6 className="text-xl font-semibold">Reported Post</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    All the REPORTING post of the user are PLACE here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModeratorTimeline;
