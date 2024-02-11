import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/auth/all");
        setAllUsers(response.data);
      } catch (error) {
        console.log("Fetching users error:".error);
      }
    };
    fetchUsers();
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
                      <th scope="col">Names</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Role</th>
                      <th scope="col">Last login</th>
                      <th scope="col">Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.length > 0 &&
                      allUsers.map((user, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">{user.name}</div>
                            </div>
                          </td>
                          <td>
                            <span className="text-dark">{user.email}</span>
                          </td>
                          <td>
                            <span className="text-dark">
                              {user.phone_number}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-beige text-dark">
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-beige text-dark">
                              {user.last_login}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-beige text-dark">
                              {user.created_at}
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

export default AllUsers;
