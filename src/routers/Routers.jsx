import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import ThankYou from "../pages/ThankYou";
import Planning from "../components/planning/Planning";

function Routers() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially logged in
  const [userId, setUserId] = useState();
  const handleLogout = () => {
    // setIsLoggedIn(false);
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("user_role");
    // localStorage.removeItem("user_id");
    // navigate("/sign-in"); // Update the login state upon logout
    alert("You have been logged out successfully");
  };

  useEffect(() => {
    // Check if user_id exists in localStorage
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setIsLoggedIn(true); // Set isLoggedIn to true if user_id exists
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Planning />} />
      <Route path="/book-membership/:id" element={<Home />} />
      <Route path="/planning" element={<Planning />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/user/*" element="">
        <Route path="dashboard" element={<Dashboard />} onLogout={handleLogout} />
      </Route>
      <Route path="/admin/*" element="">
        <Route path="dashboard" element={<AdminDashboard />} onLogout={handleLogout} />
      </Route>
    </Routes>
  );
}

export default Routers;
