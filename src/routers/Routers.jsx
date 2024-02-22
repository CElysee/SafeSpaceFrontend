import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import ThankYou from "../pages/ThankYou";
import Schedules from "../components/schedules/Schedules";
import PaymentConfirmation from "../pages/PaymentConfirmation";
import PrivateRoutes from "../utils/PrivateRoutes.jsx";
import NotFound from "../pages/NotFound.jsx";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Schedules />} />
      <Route path="/book-membership/:id" element={<Home />} />
      <Route path="/schedules" element={<Schedules />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routers;
