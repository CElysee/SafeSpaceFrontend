import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Analytics from "./Analytics";
import Profile from "./Profile";
import Schedules from "./Schedules";
import axiosInstance from "../../utils/axiosInstance";

function Dashboard(props) {
  const navigate = useNavigate();
  const [access_token, setAccess_token] = useState("");
  const [userName, setUserName] = useState("");
  // useEffect(() => {
  //   const access_token = localStorage.getItem("access_token");
  //   setAccess_token(access_token);
  //   const getUser = async () => {
  //     try {
  //       const response = await axiosInstance.get("auth/users/me", {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       });

  //       setUserName(response.data.name);
  //     } catch (error) {
  //       if (error.response.status === 401 || error.response.status === 406) {
  //         navigate("/sign-in");
  //       }
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, []);

  return (
    <div className="bg-beige pb-5">
      <div className="container">
        <div className="row mx-auto">
          <div className="col-md-12">
            <div className="card">
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
                        id="custom-v-pills-home-tab"
                        data-bs-toggle="pill"
                        href="#custom-v-pills-home"
                        role="tab"
                        aria-controls="custom-v-pills-home"
                        aria-selected="true"
                      >
                        <i className="ri-home-4-line d-block fs-20 mb-1"></i>{" "}
                        Dashboard
                      </a>
                      <a
                        className="nav-link text-bold"
                        id="custom-v-pills-profile-tab"
                        data-bs-toggle="pill"
                        href="#custom-v-pills-profile"
                        role="tab"
                        aria-controls="custom-v-pills-profile"
                        aria-selected="false"
                        tabIndex="-1"
                      >
                        <i className="ri-user-2-line d-block fs-20 mb-1"></i>{" "}
                        Profile
                      </a>
                      <a
                        className="nav-link text-bold"
                        id="custom-v-pills-messages-tab"
                        data-bs-toggle="pill"
                        href="#custom-v-pills-messages"
                        role="tab"
                        aria-controls="custom-v-pills-messages"
                        aria-selected="false"
                        tabIndex="-1"
                      >
                        <i className="ri-award-fill d-block fs-20 mb-1"></i>{" "}
                        Schedules
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="tab-content text-muted mt-3 mt-lg-0 paragraph">
                      <div
                        className="tab-pane fade active show"
                        id="custom-v-pills-home"
                        role="tabpanel"
                        aria-labelledby="custom-v-pills-home-tab"
                      >
                        <Analytics user_name={userName} />
                      </div>

                      <div
                        className="tab-pane fade"
                        id="custom-v-pills-profile"
                        role="tabpanel"
                        aria-labelledby="custom-v-pills-profile-tab"
                      >
                        <Profile />
                      </div>

                      <div
                        className="tab-pane fade"
                        id="custom-v-pills-messages"
                        role="tabpanel"
                        aria-labelledby="custom-v-pills-messages-tab"
                      >
                        <Schedules />
                      </div>
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
