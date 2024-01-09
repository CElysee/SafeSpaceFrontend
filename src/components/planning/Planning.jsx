import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "../planning/Planning.css";
import axiosInstance from "../../utils/axiosInstance";

function Planning() {
  const [days_list, setDays_list] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [dayActive, setDayActive] = useState(null);

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await axiosInstance.get(`/planning/list`);
        if (response && response.data) {
          console.log("Response:", response.data[0]);
          setDays_list(response.data);
          setSelectedDay(response.data[0].sessions);
          setDayActive(0);
        } else {
          console.log("Empty response or missing data");
        }
      } catch (error) {
        // Handle specific errors or log them
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log("Error response:", error.response.data);
          console.log("Status code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error during request setup:", error.message);
        }
      }
    };
    fetchDays();
  }, []);
  const handleDayActive = (index) => {
    setDayActive(index);
    setSelectedDay(days_list[index].sessions);
  };
  return (
    <>
      <section
        className="section bg-beige"
        id="features"
        style={{ padding: "0", paddingBottom: "100px" }}
      >
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <div>
                <img
                  src="/assets/images/SSY-28-scaled.jpg"
                  alt=""
                  className="img-fluid mx-auto"
                />
              </div>
            </div>
            <div className="col-lg-6 pl-5">
              <div className="text-muted">
                <h2 className="mb-3 fs-20 text-center title_text">
                  Course schedule
                </h2>
                <p className="mb-4 ff-secondary fs-16 paragraph">
                  <strong>Arrival time:</strong>The studio opens 20 minutes
                  before the class starts. We recommend arriving at least 10
                  minutes before the class begins to ensure a relaxed and
                  unhurried experience.
                </p>
                <p className="mb-4 ff-secondary fs-16 paragraph">
                  <strong>Electronic device: </strong>In the spirit of creating
                  a peaceful and distraction-free environment, we kindly request
                  that you either turn off or switch your phone to airplane mode
                  upon entering the studio space.
                </p>
                <p className="mb-4 ff-secondary fs-16 paragraph">
                  <strong>Quiet reflection: </strong>Upon entering the studio,
                  please find a comfortable spot and sit quietly. Use this time
                  to center yourself, focus on your breath, and respect the
                  peace and serenity of your fellow participants. This brief
                  moment of stillness helps set a positive and harmonious tone
                  for the class.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section bg-white"
        id="features"
        style={{ padding: "0", paddingBottom: "100px" }}
      >
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-12">
              <button
                className="btn btn-primary pt-2"
                style={{ margin: "auto", display: "block" }}
              >
                Sun 01/07 - Sat 01/13
              </button>
              <div className="date_list pt-5">
                {days_list &&
                  days_list.map((dates, index) => (
                    <button
                      className={`tab btn ${
                        index === dayActive ? "btn_active" : ""
                      }`}
                      key={index}
                      onClick={() => handleDayActive(index)}
                    >
                      <div className="left hole"></div>
                      <div className="number">{dates.days}</div>
                    </button>
                  ))}
              </div>
              <div className="session_list">
                {selectedDay.map((session_list, index) => (
                  <div className="session mt-5 p-3 col-lg-6" key={index}>
                    <div className="name">
                      {" "}
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5714 15.0036L15.4286 16.8486C15.4286 16.8486 19.2857 17.6678 19.2857 19.6162C19.2857 21 17.5714 21 17.5714 21H13L10.75 19.75"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.42864 15.0036L8.5715 16.8486C8.5715 16.8486 4.71436 17.6678 4.71436 19.6162C4.71436 21 6.42864 21 6.42864 21H8.50007L10.7501 19.75L13.5001 18"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 15.9261C3 15.9261 5.14286 15.4649 6.42857 15.0036C7.71429 8.54595 11.5714 9.00721 12 9.00721C12.4286 9.00721 16.2857 8.54595 17.5714 15.0036C18.8571 15.4649 21 15.9261 21 15.9261"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4>{session_list.name}</h4>
                    </div>
                    <div className="time">
                      {" "}
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6V12"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.24 16.24L12 12"
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="session_time">{session_list.time}</span>
                    </div>
                    <div className="location pt-2">
                      <div className="location_icon">
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 11L11 13L15 9M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="location_name">
                          {session_list.location}
                        </span>
                      </div>
                    </div>
                    <div className="session_date pt-2">
                      <div className="session_date_icon">
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <rect
                            x="6"
                            y="12"
                            width="3"
                            height="3"
                            rx="0.5"
                            fill="#000000"
                          />
                          <rect
                            x="10.5"
                            y="12"
                            width="3"
                            height="3"
                            rx="0.5"
                            fill="#000000"
                          />
                          <rect
                            x="15"
                            y="12"
                            width="3"
                            height="3"
                            rx="0.5"
                            fill="#000000"
                          />
                        </svg>
                        <span className="date">{days_list[dayActive].days}</span>
                      </div>
                      <div className="session_book_btn">
                        <button className="btn btn-primary">Book</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Planning;
