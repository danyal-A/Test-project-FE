import React from "react";

const Profile = () => {
  return (
      <div>
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
          {/* <Lottie loop animationData={profileimg} play />{" "} */}
          <h2 className="text-center text-2xl font-semibold mt-3">
            Name
          </h2>
          <p className="text-center text-gray-600 mt-1">email</p>
          <div className="flex justify-center mt-5"></div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p>
          </div>
          <div className="text-center mt-4">
            <button
              className=" text-white bg-red-500 p-3 rounded font-bold"
              onClick={() => history("/timeline")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default Profile;
