import logo from "./logo.svg";
import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Timeline from "./Components/Timeline";
import Createpost from "./Components/Createpost";
import Showpost from "./Components/Showpost";
import Profile from "./Components/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/timeline/:id" element={<Timeline />} />
        <Route path="/createpost/:id" element={<Createpost />} />
        <Route path="/showpost/:id" element={<Showpost />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
