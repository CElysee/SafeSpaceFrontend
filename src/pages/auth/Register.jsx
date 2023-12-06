import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Select from "react-select";
import RiseLoader from "react-spinners/RiseLoader";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    gender: "",
    referred_by: "",
    password: "",
    country_id: "",
    // Add more fields as needed
  });
  const [errorMessages, setErrorMessages] = useState("");
  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/country/list");
        setCountryList(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error.response.data);
      }
    };
    // Invoke fetchCountries when the component mounts
    fetchCountries();
  }, []);

  const countryOptions = Array.isArray(countryList)
    ? countryList.map((country) => ({
        value: country.id,
        label: country.name,
      }))
    : [];
  const handleCountryChange = (selectedOptions) => {
    const selectedCountry = selectedOptions.value;
    setInputValues({
      ...inputValues,
      country_id: selectedCountry,
    });
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const isDisabled =
    inputValues.firstName.trim() === "" ||
    inputValues.lastName.trim() === "" ||
    inputValues.email.trim() === "" ||
    inputValues.phone_number.trim() === "" ||
    inputValues.gender.trim() === "" ||
    inputValues.password.trim() === "" ||
    inputValues.country_id.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const params = {
      name: inputValues.firstName + " " + inputValues.lastName,
      email: inputValues.email,
      username: inputValues.email,
      password: inputValues.password,
      role: "user",
      gender: inputValues.gender,
      registrations_referred_by: inputValues.referred_by,
      phone_number: inputValues.phone_number,
      country_id: inputValues.country_id,
    };
    try {
      const response = await axiosInstance.post("/auth/users/create", null, {
        params,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setErrorMessages(false);
      setLoading(false);
      navigate("/sign-in", {
        state: {
          message: "Profile created successfully!",
        },
      });
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.response.data.detail);
      setErrorMessages(error.response.data.detail);
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
    <>
      <div className="starting-section bg-beige auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
        {/* <ToastContainer autoClose={3000} /> */}
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
                        <h1 className="text-header">Create profile!</h1>
                        <p className="paragraph">
                          Create profile to continue to Safe Space Yoga Studio.
                        </p>
                      </div>

                      <div className="mt-4">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  htmlFor="name"
                                  className="form-label paragraph"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  className="form-control"
                                  placeholder="Enter your first name"
                                  value={inputValues.firstName}
                                  onChange={handleValueChange}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  htmlFor="name"
                                  className="form-label paragraph"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  className="form-control"
                                  placeholder="Enter your last name"
                                  value={inputValues.lastName}
                                  onChange={handleValueChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  htmlFor="email"
                                  className="form-label paragraph"
                                >
                                  Email
                                </label>
                                <input
                                  type="text"
                                  name="email"
                                  className="form-control"
                                  placeholder="Enter your names"
                                  value={inputValues.email}
                                  onChange={handleValueChange}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  htmlFor="phone_number"
                                  className="form-label paragraph"
                                >
                                  Mobile phone
                                </label>
                                <input
                                  type="number"
                                  name="phone_number"
                                  className="form-control"
                                  placeholder="078 **** ***"
                                  value={inputValues.phone_number}
                                  onChange={handleValueChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  htmlFor="gender"
                                  className="form-label paragraph"
                                >
                                  Gender
                                </label>
                                <select
                                  className=""
                                  name="gender"
                                  value={inputValues.gender}
                                  onChange={handleValueChange}
                                >
                                  <option>Select gender</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="form-label paragraph"
                                  htmlFor="password"
                                >
                                  Password
                                </label>
                                <div className="position-relative auth-pass-inputgroup mb-3">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-control pe-5 password-input"
                                    placeholder="Enter password"
                                    autoComplete="off"
                                    id="password-input"
                                    value={inputValues.password}
                                    onChange={handleValueChange}
                                  />
                                  <button
                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon pt-3"
                                    type="button"
                                    id="password-addon"
                                    onClick={handleShowPassword}
                                  >
                                    <i className="ri-eye-fill align-middle"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  htmlFor="referred_by"
                                  className="form-label paragraph"
                                >
                                  Country
                                </label>
                                <Select
                                  name="country_id"
                                  className="basic-multi-select"
                                  options={countryOptions}
                                  // onChange={(e) => setCountry(e.target.value)}
                                  onChange={handleCountryChange}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  htmlFor="referred_by"
                                  className="form-label paragraph"
                                >
                                  How did you hear about us?
                                </label>

                                <select
                                  className=""
                                  name="referred_by"
                                  value={inputValues.referred_by}
                                  onChange={handleValueChange}
                                >
                                  <option>Select reference</option>
                                  <option>Another Client</option>
                                  <option>Classpass</option>
                                  <option>Instagram</option>
                                  <option>Flyer</option>
                                  <option>Friend</option>
                                  <option>google</option>
                                  <option>Staff</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <p className="paragraph text-danger text-center">
                            {errorMessages}
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
                                "Create Profile"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className="mt-5 text-center">
                        <p className="mb-0 paragraph">
                          Already have an account?{" "}
                          <Link
                            to={"/sign-in"}
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                            {" "}
                            Sign in
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
    </>
  );
}

export default Register;
