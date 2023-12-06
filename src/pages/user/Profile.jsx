import React from "react";

function Profile() {
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
                  <form action="">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="firstnameInput"
                            className="form-label"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstnameInput"
                            placeholder="Enter your firstname"
                            value="Dave"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="lastnameInput" className="form-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastnameInput"
                            placeholder="Enter your lastname"
                            value="Adame"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="phonenumberInput"
                            className="form-label"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phonenumberInput"
                            placeholder="Enter your phone number"
                            value="+(1) 987 6543"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="emailInput" className="form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder="Enter your email"
                            value="daveadame@velzon.com"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="username"
                            className="form-label paragraph"
                          >
                            Gender
                          </label>
                          <select className="">
                            <option selected>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-end">
                          <button type="submit" className="btn btn-success text-dark">
                            Update profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="tab-pane" id="changePassword" role="tabpanel">
                  <form action="javascript:void(0);">
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
                          <button type="submit" className="btn btn-success text-dark">
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
