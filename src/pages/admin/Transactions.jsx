import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Transactions() {
  const [userId, setUserId] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("/membership_bookings/list");
        setAllTransactions(response.data);
      } catch (error) {
        console.log("Fetching transactions error:", error);
      }
    };
    fetchTransactions();
  }, []);
  return (
    <div className="container">
      <div className="row mx-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header align-items-center d-flex bg-purple">
              <p className="card-title text-white mb-0 flex-grow-1 text-bold">
                All transactions
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
                    {allTransactions.length > 0 &&
                      allTransactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.booking.transaction_id}</td>
                          <td>{transaction.booking.billing_names}</td>
                          <td>{transaction.booking.billing_email}</td>
                          <td>{transaction.booking.billing_address}</td>
                          <td>{transaction.booking.billing_city}</td>
                          <td>{transaction.country}</td>
                          <td>{transaction.yoga_session.name}</td>
                          <td>{transaction.booking.transaction_amount} Rwf</td>
                          <td>
                            <span className="badge bg-beige text-dark">
                              {transaction.booking.payment_status}
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

export default Transactions;
