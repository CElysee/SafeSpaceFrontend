import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

function Analytics() {
  const [bookingsNumbers, setBookingsNumbers] = useState("");
  const [allSessions, setAllSessions] = useState([]);

  const authUser = useSelector(selectUser);

  useEffect(() => {
    // fetchBookings();
    const fetchBookings = async () => {
      try {
        const dashboard_counts = await axiosInstance.get("/membership_bookings/admin_count/");
        const allSession = await axiosInstance.get("/yoga_class_booking/list");
        setAllSessions(allSession.data);
        setBookingsNumbers(dashboard_counts.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);
  // console.log(transactions[0].yoga_session.price);
  return (
    <div className="container">
      <div className="row mx-auto">
        <span className="d-flex align-items-center pb-5">
          <span className="text-start ms-xl-2">
            <h5 className="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">
              {authUser.userData.name}, Welcome back to your dashboard!
            </h5>
          </span>
        </span>
        <div className="col-md-3">
          <div className="card card-animate bg-purple">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-white text-truncate mb-0 text-bold">
                    {" "}
                    Users
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <p className="fs-22 text-white fw-semibold ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                      {bookingsNumbers.all_users}
                    </span>
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-white rounded fs-3">
                    <i className="bx bx-trophy text-primary "></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-animate bg-purple">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-white text-truncate mb-0 text-bold">
                    {" "}
                    All Bookings
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <p className="fs-22 fw-semibold text-white ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                    {bookingsNumbers.all_transactions}
                    </span>
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-white rounded fs-3">
                    <i className="bx bx-trophy text-primary "></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-animate bg-purple">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-white text-truncate mb-0 text-bold">
                    {" "}
                    All transactions
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <p className="fs-22 fw-semibold text-white ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                    {bookingsNumbers.all_transactions}
                    </span>
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-white rounded fs-3">
                    <i className="bx bx-trophy text-primary "></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card card-animate bg-purple">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-white text-truncate mb-0 text-bold">
                    {" "}
                    Transactions
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <p className="fs-22 fw-semibold text-white ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                    {bookingsNumbers.total_amount_transaction}
                    </span>
                    Rwf
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-white rounded fs-3">
                    <i className="bx bx-money-withdraw text-primary "></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <div className="card">
            <div className="card-header align-items-center d-flex bg-purple">
              <p className="card-title mb-0 text-white flex-grow-1 text-bold">
                Recent sessions
              </p>
            </div>

            <div className="card-body paragraph">
              <div className="table-responsive">
                <table className="table table-borderless mb-0">
                  <thead className="text-muted table-light">
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Customer Names</th>
                      <th scope="col">Yoga Class</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Booking status</th>
                      <th scope="col">Starting Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSessions.length > 0 &&
                      allSessions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                {transaction.user.name}
                              </div>
                            </div>
                          </td>
                          <td>{transaction.yoga_session.name}</td>
                          <td>
                            <span className="text-dark">
                              {transaction.yoga_session.price} Rwf
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-beige text-dark">
                              {transaction.booking.payment_status}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-beige text-dark">
                              {transaction.booking.booking_slot_time}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-beige text-dark">
                              {transaction.booking.booking_date}
                            </span>
                          </td>
                        </tr>
                      ))}
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

export default Analytics;
