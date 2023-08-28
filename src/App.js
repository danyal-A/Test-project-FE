import "./App.css";
import SignUp from "./pages/SignUp";

import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import Createpost from "./Components/Createpost";
import Showpost from "./Components/Showpost";
import Profile from "./pages/Profile";
import ModeratorTimeline from "./Components/Moderator/ModeratorTimeline";
import Action from "./Components/Moderator/Action";
import Reported from "./Components/Moderator/Reported";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/timeline/:id" element={<Timeline />} />
          <Route path="/createpost/:id" element={<Createpost />} />
          <Route path="/showpost/:id" element={<Showpost />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/timeline/moderator/:id"
            element={<ModeratorTimeline />}
          />
          <Route path="/action/:id" element={<Action />} />
          <Route path="/report" element={<Reported />} />

          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
