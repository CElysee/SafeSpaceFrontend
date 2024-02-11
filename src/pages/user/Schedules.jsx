import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Schedules() {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setUserId(user_id);
    // fetchBookings();
    const fetchBookings = async () => {
      try {
        const bookings = await axiosInstance.get(
          `/yoga_class_booking/user_bookings?user_id=${user_id}`
        );
        setTransactions(bookings.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  }, []);
  return (
    <div className="container">
      <div className="row mx-auto">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header align-items-center d-flex bg-purple">
                <p className="card-title mb-0 text-white flex-grow-1 text-bold">
                 All sessions
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

export default Schedules;
