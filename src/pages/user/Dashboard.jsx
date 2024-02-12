import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Analytics from "./Analytics";
import Profile from "./Profile";
import Sessions from "./Sessions";
import Transaction from "./Transactions";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    navigate("/sign-in");
  };
  return (
    <div className="bg-beige pb-5">
      <div className="container">
        <div className="row mx-auto">
          <div className="col-md-12">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3">
                  <div
                    className="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center paragraph"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link show active text-bold"
                      id="dashboard-tab"
                      data-bs-toggle="pill"
                      href="#dashboard"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="true"
                    >
                      <i className="ri-home-4-line d-block fs-20 mb-1"></i>{" "}
                      Dashboard
                    </a>
                    <a
                      className="nav-link text-bold"
                      id="profile-tab"
                      data-bs-toggle="pill"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <i className="ri-user-2-line d-block fs-20 mb-1"></i>{" "}
                      Profile
                    </a>
                    <a
                      className="nav-link text-bold"
                      id="schedules-tab"
                      data-bs-toggle="pill"
                      href="#schedules"
                      role="tab"
                      aria-controls="schedules"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <i className="ri-award-fill d-block fs-20 mb-1"></i>{" "}
                      Sessions
                    </a>
                    <a
                      className="nav-link text-bold"
                      id="transactions-tab"
                      data-bs-toggle="pill"
                      href="#transactions"
                      role="tab"
                      aria-controls="transactions"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <i className="ri-money-dollar-circle-line d-block fs-20 mb-1"></i>{" "}
                      Transactions
                    </a>
                    <a
                      className="nav-link text-bold"
                      id="transactions-tab"
                      data-bs-toggle="pill"
                      href="#transactions"
                      role="tab"
                      aria-controls="transactions"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30px"
                        className="fs-20 mb-1"
                        style={{margin: "auto", display: "block"}}
                        onClick={handleLogout}
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M10 12H20M20 12L17 9M20 12L17 15"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                          <path
                            d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      Logout
                    </a>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="tab-content text-muted mt-3 mt-lg-0 paragraph">
                    <div
                      className="tab-pane fade active show"
                      id="dashboard"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab"
                    >
                      <Analytics />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <Profile />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="schedules"
                      role="tabpanel"
                      aria-labelledby="schedules-tab"
                    >
                      <Sessions />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="transactions"
                      role="tabpanel"
                      aria-labelledby="transactions-tap"
                    >
                      <Transaction />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
