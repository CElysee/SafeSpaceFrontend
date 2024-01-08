import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

function Header(props) {
  const year = new Date().getFullYear();
  const [access_token, setAccess_token] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (access_token) {
  //     const getUser = async () => {
  //       try {
  //         const response = await axiosInstance.get("auth/users/me", {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         });
  //         setUserName(response.data.name);
  //         setIsLoggedIn(true);
  //       } catch (error) {
  //         if (error.response.status === 401 || error.response.status === 406) {
  //           navigate("/sign-in");
  //         }
  //         console.log(error);
  //       }
  //     };
  //     getUser();
  //   }
  //   // Check if user_id exists in localStorage
  //   setUserId(localStorage.getItem("user_id"));
  //   setAccess_token(localStorage.getItem("access_token"));
  // }, []);

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("user_role");
  //   localStorage.removeItem("user_id");
  //   navigate("/sign-in");
  // };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-landing paragraph"
        id="navbar"
      >
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img
              src="/assets/images/logo.png"
              className="card-logo card-logo-dark"
              alt="logo dark"
              width="200"
              // height="17"
            />
            <img
              src="assets/images/logo.png"
              className="card-logo card-logo-light"
              alt="logo light"
              // height="17"
            />
          </a>
          <button
            className="navbar-toggler py-0 fs-20 text-body"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
              <li className="nav-item">
                <Link
                  className="nav-link fs-15 active"
                  to="https://webtesting.co.rw/safespace/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link fs-15" href="#services">
                  About
                  <i className="ri-arrow-down-s-fill align-middle ms-1"></i>
                </a>
                <div className="dropdown-content bg-beige">
                  <a href="https://webtesting.co.rw/safespace/the-space/">
                    Our values
                  </a>
                  <a href="https://webtesting.co.rw/safespace/about/#meet_the_founder">
                    Meet our founder
                  </a>
                  <a href="https://webtesting.co.rw/safespace/teacher-approach/">
                    Teacher Approach
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link fs-15" href="#services">
                  Classes
                  <i className="ri-arrow-down-s-fill align-middle ms-1"></i>
                </a>
                <div className="dropdown-content bg-beige">
                  <a href="https://webtesting.co.rw/safespace/hatha-yoga/">
                    Hatha Yoga
                  </a>
                  <a href="https://webtesting.co.rw/safespace/sadhana/">
                    Sadhana
                  </a>
                  <a href="https://webtesting.co.rw/safespace/hatha-flow/">
                    Hatha Flow
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  to={"/planning"}
                  className="nav-link fs-15"
                >
                  Planning
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"https://webtesting.co.rw/safespace/schedules/"}
                  className="nav-link fs-15"
                >
                  Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-15">Blog</Link>
              </li>
              <li className="nav-item">
                <Link
                  to="https://webtesting.co.rw/safespace/contact/"
                  className="nav-link fs-15"
                >
                  Contact
                </Link>
              </li>
            </ul>
            {isLoggedIn ? (
              <>
                <button
                  to="/sign-in"
                  className="btn btn-primary mr-3"
                  onClick={handleLogout}
                >
                  Log out
                </button>
                <span className="d-flex align-items-center">
                  <svg
                    viewBox="0 0 20 20"
                    width="25px"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                        d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">
                      {userName}
                    </span>
                  </span>
                </span>
              </>
            ) : (
              <div className="">
                <Link
                  to="/sign-in"
                  className="btn btn-link fw-medium text-decoration-none text-body"
                >
                  Sign in
                </Link>
                <Link to="/sign-up" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
