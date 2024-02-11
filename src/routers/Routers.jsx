import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import ThankYou from "../pages/ThankYou";
import Planning from "../components/planning/Planning";
import PaymentConfirmation from "../pages/PaymentConfirmation";
import PrivateRoutes from "../utils/PrivateRoutes.jsx";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Planning />} />
      <Route path="/book-membership/:id" element={<Home />} />
      <Route path="/planning" element={<Planning />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/PaymentConfirmation" element={<PaymentConfirmation />} />

      {/* User Routes */}
      {/* <Route path="/user/*" element="">
        <Route
          path="dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
      </Route> */}

      <Route
        path="/user/dashboard"
        element={
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <AdminDashboard />
          </PrivateRoutes>
        }
      />

      {/* <Route path="/admin/*" element="">
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route> */}
    </Routes>
  );
}

export default Routers;
