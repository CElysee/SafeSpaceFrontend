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

  useEffect(() => {
    const access_token_user = localStorage.getItem("access_token");
    if (access_token_user) {
      setIsLoggedIn(true);
    }
    if (access_token_user) {
      const getUser = async () => {
        try {
          const response = await axiosInstance.get("auth/users/me", {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          });
          setUserName(response.data.name);
        } catch (error) {
          if (error.response.status === 401 || error.response.status === 406) {
            navigate("/sign-in");
          }
          console.log(error);
        }
      };
      getUser();
    }
    // Check if user_id exists in localStorage
    setUserId(localStorage.getItem("user_id"));
    setAccess_token(localStorage.getItem("access_token"));
  }, []);

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
                <Link to={"/planning"} className="nav-link fs-15">
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
              {/* <li className="nav-item">
                <Link className="nav-link fs-15">Blog</Link>
              </li> */}
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
              ""
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
