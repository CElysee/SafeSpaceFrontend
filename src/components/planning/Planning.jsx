import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "../planning/Planning.css";
import axiosInstance from "../../utils/axiosInstance";

function Planning() {
  const [days_list, setDays_list] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await axiosInstance.get(`/planning/list`);
        if (response && response.data) {
          setDays_list(response.data.list_days);
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
              <button className="btn btn-primary pt-2" style={{margin:"auto", display: "block"}}>Sun 01/07 - Sat 01/13</button>
              <div className="date_list pt-5">
                {days_list &&
                  days_list.map((dates, index) => (
                    <button className="tab btn" key={index}>
                      <div className="left hole"></div>
                      <div className="number">{dates}</div>
                    </button>
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
