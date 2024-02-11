import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function Sessions() {
  const [userId, setUserId] = useState("");
  const [allSessions, setAllSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosInstance.get("/yoga_class_booking/list");
        setAllSessions(response.data);
      } catch (error) {
        console.log("Fetching sessions error:", error);
      }
    }
    fetchSessions();
  }, []);
  return (
    <div className="container">
      <div className="row mx-auto">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header align-items-center d-flex bg-purple">
                <p className="card-title text-white mb-0 flex-grow-1 text-bold">
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
                        <th scope="col">Session time</th>
                        <th scope="col">Starting Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSessions.length > 0 && allSessions.map((transaction, index) => (
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

export default Sessions;
