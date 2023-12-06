import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [color, setColor] = useState("#fff");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (location.state && location.state.message) {
      notify(location.state.message, "success");
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isDisabled =
    inputValue.username.trim() === "" || inputValue.password.trim() === "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", inputValue.username);
    formData.append("password", inputValue.password);

    try {
      const user_login = await axiosInstance.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      notify("Login successful", "success");
      setLoading(false);
      setErrorMessage(false);
      localStorage.setItem("access_token", user_login.data.access_token);
      localStorage.setItem("user_id", user_login.data.userId);
      localStorage.setItem("user_role", user_login.data.role);
      if (user_login.data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user_login.data.role === "user") {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Error logging in", error.response.data);
      setLoading(false);
      setErrorMessage(error.response.data.detail);
      notify(error.response.data.detail, "error");
    }
  };
  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        icon: "👏",
      });
    } else if (type === "error") {
      toast.error(message, {
        icon: "😬",
      });
    }
  };
  return (
    <div className="starting-section bg-beige auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer autoClose={5000} />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card overflow-hidden">
              <div className="row justify-content-center g-0">
                <div className="col-lg-6">
                  <div className="p-lg-5 p-4 auth-one-bg h-100">
                    <div className="position-relative h-100 d-flex flex-column">
                      <div className="mt-auto">
                        <div className="mb-3">
                          <i className="ri-double-quotes-l display-4 text-success"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="p-lg-5 p-4">
                    <div>
                      <h1 className="text-header">Welcome Back !</h1>
                      <p className="paragraph">
                        Sign in to continue to Safe Space Yoga Studio.
                      </p>
                    </div>

                    <div className="mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="username"
                            className="form-label paragraph"
                          >
                            Username
                          </label>
                          <input
                            type="email"
                            name="username"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={inputValue.username}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <a
                              href="auth-pass-reset-cover.html"
                              className="paragraph"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <label
                            className="form-label paragraph"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type="password"
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              name="password"
                              value={inputValue.password}
                              onChange={handleInputChange}
                              autoComplete="off"
                              required
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                              onClick={handleShowPassword}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <label
                            className="form-check-label paragraph"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </label>
                        </div>
                        <p className="paragraph text-danger text-center">
                          {errorMessage}
                        </p>
                        <div className="mt-4">
                          <button
                            className="btn btn-web w-100 paragraph"
                            type="submit"
                            disabled={isDisabled}
                          >
                            {loading ? (
                              <RiseLoader
                                color={color}
                                loading={loading}
                                cssOverride={override}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              "Sign In"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="mt-5 text-center">
                      <p className="mb-0 paragraph">
                        Don't have an account ?{" "}
                        <Link
                          to={"/sign-up"}
                          className="fw-semibold text-primary text-decoration-underline"
                        >
                          {" "}
                          Signup
                        </Link>{" "}
                      </p>
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

export default Login;
