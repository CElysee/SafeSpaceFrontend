import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import RiseLoader from "react-spinners/RiseLoader";
import "react-toastify/dist/ReactToastify.css";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function Profile() {
  const [userData, setUserData] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [refreshState, setRefreshState] = useState(false);
  const [color, setColor] = useState("#fff");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    country_id: "",
    user_id: localStorage.getItem("user_id"),
  });
  const [userPassword, setUserPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/auth/users/${user_id}`);
        const country_list = await axiosInstance.get("/country/list");
        setUserData(response.data);
        setUserValues({
          ...userValues,
          name: response.data.name,
          email: response.data.email,
          phone_number: response.data.phone_number,
          gender: response.data.gender,
          country_id: response.data.country.id,
        });
        setCountryList(country_list.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [refreshState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const handleConfirmPassword = () => {
    if (userPassword.new_password !== userPassword.confirm_password) {
      setErrorMessages("Passwords do not match");
    }else{
      setErrorMessages("")
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const updateProfile = async () => {
      const params = {
        name: userValues.name,
        email: userValues.email,
        phone_number: userValues.phone_number,
        gender: userValues.gender,
        country_id: userValues.country_id,
        user_id: userValues.user_id,
      };
      // console.log(params);
      try {
        const response = await axiosInstance.post(
          `/auth/users/profile/update`,
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
          }
        );
        notify(response.data.message, "success");
        setRefreshState(true)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    updateProfile();
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setLoading(true)
    const params = {
      old_password: userPassword.old_password,
      new_password: userPassword.new_password,
      user_id: localStorage.getItem("user_id"),
    }
    const changePassword = async () => {
      try{
        const response = await axiosInstance.post("/auth/users/profile/update_password", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        });
        notify(response.data.message, "success");
      }catch(error){
        console.log(error)
      }
    }
    changePassword();
  }

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
    <div className="container">
       <ToastContainer autoClose={3000} />
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
                  <form onSubmit={handleSubmit}>
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
                            value={userValues.name}
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
                            value={userValues.email}
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
                            value={userValues.phone_number}
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
                            <option selected>{userValues.gender}</option>
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
                                "Update profile"
                              )}
                            
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="tab-pane" id="changePassword" role="tabpanel">
                  <form onSubmit={handlePasswordChange}>
                    <div className="row g-2">
                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="old_password"
                            className="form-label"
                          >
                            Old Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="old_password"
                            name="old_password"
                            placeholder="Enter current password"
                            autoComplete="off"
                            value={userPassword.old_password}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="new_password"
                            className="form-label"
                          >
                            New Password*
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="new_password"
                            name="new_password"
                            placeholder="Enter new password"
                            autoComplete="off"
                            value={userPassword.new_password}
                            onChange={handleInputChange}
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
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm password"
                            autoComplete="off"
                            value={userPassword.confirm_password}
                            onBlur={handleConfirmPassword}
                            onChange={handleInputChange}
                          />
                          <span className="text-danger">
                            {errorMessages}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-end">
                          {!errorMessages && (<button
                            type="submit"
                            className="btn btn-success text-dark"
                          >
                            Change Password
                          </button>)}
                          
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
