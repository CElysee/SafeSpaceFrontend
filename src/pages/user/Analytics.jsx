import React from "react";
import SideMenu from "./SideMenu";
function Analytics(props) {

  return (
    <div className="container">
      <div className="row mx-auto">
        <span className="d-flex align-items-center pb-5">
          <span className="text-start ms-xl-2">
            <h5 className="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">
              Welcome back to your dashboard!
            </h5>
          </span>
        </span>
        <div className="col-xl-4 col-md-6">
          <div className="card card-animate bg-beige">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {" "}
                    Total Earnings
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <p className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span className="counter-value" data-target="559.25">
                      559.25
                    </span>
                    k{" "}
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-white rounded fs-3">
                    <i className="bx bx-dollar-circle text-primary "></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card card-animate bg-beige">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {" "}
                    Total Earnings
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <p className="fs-22 fw-semibold ff-secondary mb-4">
                    $
                    <span className="counter-value" data-target="559.25">
                      559.25
                    </span>
                    k{" "}
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-white rounded fs-3">
                    <i className="bx bx-dollar-circle text-primary"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header align-items-center d-flex bg-beige">
              <p className="card-title mb-0 flex-grow-1 text-bold">
                Recent Orders
              </p>
            </div>

            <div className="card-body paragraph">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <thead className="text-muted table-light">
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Customer Names</th>
                      <th scope="col">Membership</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a
                          href="apps-ecommerce-order-details.html"
                          className="fw-medium text-dark"
                        >
                          #VZ2112
                        </a>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1">Alex Smith</div>
                        </div>
                      </td>
                      <td>Clothes</td>
                      <td>
                        <span className="text-dark">$109.00</span>
                      </td>
                      <td>
                        <span className="badge bg-beige text-dark">Paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-6"></div>
      </div>
    </div>
  );
}

export default Analytics;
