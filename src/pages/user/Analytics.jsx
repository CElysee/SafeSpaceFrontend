import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

function Analytics() {
  const [bookingsNumbers, setBookingsNumbers] = useState("");
  const [bookingsSum, setBookingsSum] = useState("");
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setUserId(user_id);
    // fetchBookings();
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(
          `/membership_bookings/count/${user_id}`
        );
        const bookings = await axiosInstance.get(
          `/yoga_class_booking/user_bookings?user_id=${user_id}`
        );
        setBookingsNumbers(response.data.count);
        setBookingsSum(response.data.sum);
        setTransactions(bookings.data);
        console.log(bookings.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);
  const authUser = useSelector(selectUser);
  console.log(authUser);
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
        <div className="col-md-4">
          <div className="card card-animate bg-purple">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-white text-truncate mb-0 text-bold">
                    {" "}
                    Pending Bookings
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <p className="fs-22 fw-semibold text-white ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                      {bookingsNumbers}
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
        <div className="col-md-4">
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
                  <p className="fs-22 fw-semibold  text-white ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                      {bookingsSum}
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
                        <th scope="col">Yoga Class</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Booking status</th>
                        <th scope="col">Starting Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length > 0 && transactions.map((transaction, index) => (
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
                              {transaction.booking.booking_status}
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
