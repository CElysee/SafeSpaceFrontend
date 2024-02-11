import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSlice";

function Header() {
  const year = new Date().getFullYear();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-landing paragraph"
        id="navbar"
      >
        <div className="container">
          <a className="navbar-brand" href="https://safespaceyoga.rw/">
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
                  to="https://safespaceyoga.rw/"
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
                  <a href="https://safespaceyoga.rw/the-space/">Our values</a>
                  <a href="https://safespaceyoga.rw/about/#meet_the_founder">
                    Meet our founder
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link fs-15" href="#services">
                  Classes
                  <i className="ri-arrow-down-s-fill align-middle ms-1"></i>
                </a>
                <div className="dropdown-content bg-beige">
                  <a href="https://safespaceyoga.rw/hatha-yoga/">Hatha Yoga</a>
                  <a href="https://safespaceyoga.rw/sadhana/">Sadhana</a>
                  <a href="https://safespaceyoga.rw/hatha-flow/">Hatha Flow</a>
                </div>
              </li>
              <li className="nav-item">
                <Link to={"/planning"} className="nav-link fs-15">
                  Planning
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"https://safespaceyoga.rw/packages/"}
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
                  to="https://safespaceyoga.rw/contact/"
                  className="nav-link fs-15"
                >
                  Contact
                </Link>
              </li>
            </ul>
            {isAuthenticated ? null : (
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
