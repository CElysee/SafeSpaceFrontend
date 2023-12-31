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
          `/yoga_class_booking/transaction?user_id=${user_id}`
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
              <div className="card-header align-items-center d-flex bg-beige">
                <p className="card-title mb-0 flex-grow-1 text-bold">
                 All schedules
                </p>
              </div>
              <div className="card-body paragraph">
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <thead className="text-muted table-light">
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Billing Names</th>
                        <th scope="col">Billing Email</th>
                        <th scope="col">Billing Address</th>
                        <th scope="col">Billing City</th>
                        <th scope="col">Billing Country</th>
                        <th scope="col">Yoga Class</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length > 1 && transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.booking.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                {transaction.booking.billing_names}
                              </div>
                            </div>
                          </td>
                          <td>{transaction.booking.billing_email}</td>
                          <td>{transaction.booking.billing_address}</td>
                          <td>{transaction.booking.billing_city}</td>
                          <td>{transaction.country}</td>
                          <td>{transaction.yoga_session}</td>
                          <td></td>
                          <td></td>
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
