import React from "react";

function Schedules() {
  return (
    <div className="container">
      <div className="row mx-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header align-items-center d-flex bg-beige">
              <p className="card-title mb-0 flex-grow-1 text-bold">
                Recent schedules
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
                      <th scope="col">Payment status</th>
                      <th scope="col">Starting date</th>
                      <th scope="col">Membership status</th>
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
                      <td>
                        <span className="badge bg-beige text-dark">20-10-2023</span>
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
      </div>
    </div>
  );
}

export default Schedules;
