import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Profile() {
  const [userData, setUserData] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    country_id: "",
  });
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/auth/users/${user_id}`);
        const country_list = await axiosInstance.get("/country/list");
        setUserData(response.data);
        setCountryList(country_list.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };
  return (
    <div className="container">
      <div className="row mx-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-beige">
              <ul
                className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0 pt-2"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active paragraph"
                    data-bs-toggle="tab"
                    href="#personalDetails"
                    role="tab"
                    aria-selected="true"
                  >
                    <i className="fas fa-home"></i> Personal Details
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#changePassword"
                    role="tab"
                    aria-selected="false"
                    tabIndex="-1"
                  >
                    <i className="far fa-user"></i> Change Password
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body p-4">
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="personalDetails"
                  role="tabpanel"
                >
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Names
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="phone_number" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone_number"
                            id="phone_number"
                            value={userData.phone_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="gender"
                            className="form-label paragraph"
                          >
                            Gender
                          </label>
                          <select
                            className=""
                            name="gender"
                            onChange={handleChange}
                          >
                            <option selected>{userData.gender}</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="username"
                            className="form-label paragraph"
                          >
                            Country
                          </label>
                          <select
                            className=""
                            name="country_id"
                            onChange={handleChange}
                          >
                            {userData && (
                              <option value={userData.country.id} selected>
                                {userData.country.name}
                              </option>
                            )}
                            {countryList.length > 1 &&
                              countryList.map((country, index) => (
                                <option key={index} value={country.name}>
                                  {country.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-success text-dark"
                          >
                            Update profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="tab-pane" id="changePassword" role="tabpanel">
                  <form>
                    <div className="row g-2">
                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="oldpasswordInput"
                            className="form-label"
                          >
                            Old Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="oldpasswordInput"
                            placeholder="Enter current password"
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="newpasswordInput"
                            className="form-label"
                          >
                            New Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="newpasswordInput"
                            placeholder="Enter new password"
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="confirmpasswordInput"
                            className="form-label"
                          >
                            Confirm Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmpasswordInput"
                            placeholder="Confirm password"
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-success text-dark"
                          >
                            Change Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
