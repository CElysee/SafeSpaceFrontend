import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "../planning/Planning.css";
import axiosInstance from "../../utils/axiosInstance";
import Select from "react-select";
import RiseLoader from "react-spinners/RiseLoader";
import "react-toastify/dist/ReactToastify.css";
import "../membershipInfo/MembershipInfo.css";
import { ToastContainer, toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};

function Planning() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [days_list, setDays_list] = useState([]);
  const [color, setColor] = useState("#fff");
  const [selectedDay, setSelectedDay] = useState([]);
  const [dayActive, setDayActive] = useState(null);
  const [session_id, setSession_id] = useState(0);
  const [yogaPackage, setYogaPackage] = useState([]);
  const [yogaPackageId, setYogaPackageId] = useState();
  const [loading, setLoading] = useState(false);
  const [isNotRegisted, setIsNotRegistred] = useState(false);
  const [yogaLocation, setYogaLocation] = useState("");
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [slot_available, setSlotAvailable] = useState(false);
  const [available_time, setAvailableTime] = useState([]);
  const [showBookButton, setShowBookButton] = useState(true);
  const [inputValues, setInputValues] = useState({
    email: "",
    names: "",
    address: "",
    city: "",
    country_id: "",
    checkout_comments: "",
    password: "",
    yoga_class_location_id: "",
    booking_date: "",
    booking_slot_time: "",
    booking_slot_number: "",
  });

  useEffect(() => {
    const fetchMembership = async () => {
      const country_response = await axiosInstance.get("/country/list", {});
      const yoga_location = await axiosInstance.get(
        "/yoga_class_location/list",
        {}
      );
      setCountry(country_response.data);
      setYogaLocation(yoga_location.data);
    };

    const fetchDays = async () => {
      try {
        const response = await axiosInstance.get(`/planning/list`);
        const yogaSessions = await axiosInstance.get(`/yoga_sessions/list`);
        if (response && response.data) {
          // console.log("Response:", response.data[dayActive].sessions.name);
          setDays_list(response.data);
          setSelectedDay(response.data[0].sessions);
          setDayActive(0);
          setYogaPackage(yogaSessions.data);
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
    fetchMembership();
    
  }, []);

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  const countryOptions = Array.isArray(country)
    ? country.map((country) => ({
        value: country.id,
        label: country.name,
      }))
    : [];
  const handleCountryChange = (selectedOptions) => {
    const selectedCountry = selectedOptions.value;
    setInputValues({
      ...inputValues,
      country_id: selectedCountry,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleDayActive = (index) => {
    setDayActive(index);
    setSelectedDay(days_list[index].sessions);

  //   const query = `yoga_session_id=${id}&booking_date=${inputValues.booking_date}&booking_slot_time=${selectedDay[session_id].time}&yoga_class_location_id=${inputValues.yoga_class_location_id}`;
  //   const fetchSlotNumber = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `/yoga_class_booking/spot_available?${query}`,
  //         {
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );
  //       console.log(response.data);
  //       setSlotAvailable(response.data.message);
  //       if (response.data.message == "Spot not available") {
  //         setErrorMessages("Spot not available");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching slot number", error);
  //     }
  //   };
  //   fetchSlotNumber();
 };
  const handleSession_id = (id) => {
    setSession_id(id);
  };
  const isUserRegistered = async () => {
    try {
      const response = await axiosInstance.post("/auth/check_username", {
        email: inputValues.email,
        headers: { "Content-Type": "application/json" },
      });
      setIsNotRegistred(false);
      setInputValues({
        ...inputValues,
        names: response.data.data.name,
      });
    } catch (error) {
      setIsNotRegistred(true);
      console.error("Error while checking user", error);
    }
  };
  const makePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = {
        password: inputValues.password,
        yoga_session_id: yogaPackageId,
        billing_names: inputValues.names,
        billing_email: inputValues.email,
        billing_address: inputValues.address,
        billing_city: inputValues.city,
        billing_country_id: inputValues.country_id,
        yoga_class_location_id: selectedDay[session_id].location,
        booking_date: days_list[dayActive].days,
        booking_slot_time: selectedDay[session_id].time,
        booking_slot_number: inputValues.booking_slot_number,
      };
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      console.log(params);
      const submitPayment = await axiosInstance.post(
        "/yoga_class_booking/create",
        params,
        config
      );
      //   console.log(submitPayment.data);
      setLoading(false);
      navigate("/thank-you");
    } catch (error) {
      console.error("Error making a payment", error);
      setLoading(false);
    }
  };
  const showBillingSection = () => {
    setShowBillingForm(true);
    setShowBookButton(false);
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
                    <div className="session_date pt-1">
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
                        <span className="date">
                          {days_list[dayActive].days}
                        </span>
                      </div>
                      <div className="session_book_btn">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleSession_id(index)}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="staticBackdropLabel"
                      style={{ textAlign: "center" }}
                    >
                      You are about to book{" "}
                      {selectedDay.length > 0 && selectedDay[session_id].name}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="session p-3">
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
                            <h4>
                              {selectedDay.length > 0 &&
                                selectedDay[session_id].name}
                            </h4>
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
                            <span className="session_time">
                              {selectedDay.length > 0 &&
                                selectedDay[session_id].time}
                            </span>
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
                                {selectedDay.length > 0 &&
                                  selectedDay[session_id].location}
                              </span>
                            </div>
                          </div>
                          <div className="session_date pt-1">
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
                              <span className="date">
                                {selectedDay.length > 0 &&
                                  days_list[dayActive].days}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="package_options col-lg-6">
                        {yogaPackage.length > 0 &&
                          yogaPackage.map((yoga, index) => (
                            <div className="option" key={index}>
                              <input
                                type="radio"
                                name="yogaPackageId"
                                id={yoga.id}
                                value={yoga.id}
                                onChange={(e) =>
                                  setYogaPackageId(e.target.value)
                                }
                              />
                              <label htmlFor={yoga.id} aria-label={yoga.name}>
                                <span></span>
                                <div className="card_info">
                                  <div className="card_info_name">
                                    {yoga.name}
                                  </div>
                                  <div className="card_info_price">
                                    Price: {yoga.price} RWF
                                  </div>
                                  <div className="card_info_validity">
                                    Validity: {yoga.session_time}
                                  </div>
                                </div>

                                <div className="card card--white card--sm">
                                  <div className="card__chip"></div>
                                  <div className="card__content">
                                    <div className="card__text">
                                      <div className="text__row">
                                        <div className="text__loader"></div>
                                        <div className="text__loader"></div>
                                      </div>
                                      <div className="text__row">
                                        <div className="text__loader"></div>
                                        <div className="text__loader"></div>
                                      </div>
                                    </div>
                                    <div className="card__symbol">
                                      <span></span>
                                      <span></span>
                                    </div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                      </div>
                      {showBillingForm && (
                        <section
                          className="py-20"
                          id="checkout"
                          style={{ paddingTop: "10px" }}
                        >
                          <div className="container">
                            <div className="row align-items-center gy-4">
                              <form
                                onSubmit={makePayment}
                                className="make_payment"
                              >
                                <div className="col-lg-12">
                                  <div className="row gy-4">
                                    <div className="col-lg-12">
                                      <h4 className="fw-semibold">Sign In</h4>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="mb-3">
                                        {isNotRegisted && (
                                          <div className="float-end">
                                            <p className="mb-0 form_paragraph">
                                              This email isn't registered with
                                              us!
                                            </p>
                                          </div>
                                        )}

                                        <label
                                          className="form-label form_paragraph"
                                          htmlFor="password-input"
                                        >
                                          Email
                                        </label>
                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                          <input
                                            type="email"
                                            className="form-control bg-light border-light"
                                            placeholder="Your email"
                                            id="email"
                                            name="email"
                                            value={inputValues.email}
                                            onChange={handleInputChange}
                                            onBlur={isUserRegistered}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      {isNotRegisted && (
                                        <div className="mb-3">
                                          <label
                                            className="form-label form_paragraph"
                                            htmlFor="password"
                                          >
                                            Password (Create a password to make
                                            a booking)
                                          </label>
                                          <div className="position-relative auth-pass-inputgroup mb-3">
                                            <input
                                              type={
                                                showPassword
                                                  ? "text"
                                                  : "password"
                                              }
                                              name="password"
                                              className="form-control pe-5 password-input"
                                              placeholder="Enter password"
                                              autoComplete="off"
                                              id="password-input"
                                              value={inputValues.password}
                                              onChange={handleInputChange}
                                            />
                                            <button
                                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon pt-3"
                                              type="button"
                                              id="password-addon"
                                              onClick={handleShowPassword}
                                            >
                                              <i className="ri-eye-fill align-middle"></i>
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="row gy-4 mt-2">
                                    <div className="col-lg-12">
                                      <div>
                                        <h4 className="mb-3 fw-semibold">
                                          Billing Address
                                        </h4>
                                        <div className="row">
                                          <div className="col-lg-6">
                                            <div className="mb-4">
                                              <label
                                                htmlFor="address"
                                                className="form-label form_paragraph"
                                              >
                                                Names
                                              </label>
                                              <input
                                                id="address"
                                                type="text"
                                                className="form-control bg-light border-light"
                                                placeholder="Your names*"
                                                name="names"
                                                value={inputValues.names}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-lg-6">
                                            <div className="mb-4">
                                              <label
                                                htmlFor="address"
                                                className="form-label form_paragraph"
                                              >
                                                Address
                                              </label>
                                              <input
                                                name="address"
                                                id="address"
                                                type="text"
                                                className="form-control bg-light border-light"
                                                placeholder="Your Address*"
                                                value={inputValues.address}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-6">
                                            <div className="mb-4">
                                              <label
                                                htmlFor="city"
                                                className="form-label form_paragraph"
                                              >
                                                City
                                              </label>
                                              <input
                                                name="city"
                                                id="city"
                                                type="text"
                                                className="form-control bg-light border-light"
                                                placeholder="Your city*"
                                                value={inputValues.city}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-lg-6">
                                            <div className="mb-4">
                                              <label
                                                htmlFor="username"
                                                className="form-label form_paragraph"
                                              >
                                                Country
                                              </label>
                                              <Select
                                                name="country_id"
                                                className="basic-multi-select"
                                                options={countryOptions}
                                                // onChange={(e) => setCountry(e.target.value)}
                                                onChange={handleCountryChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row pt-4">
                                    <div className="col-lg-12">
                                      <h4 className="mb-3 fw-semibold">
                                        Payment
                                      </h4>
                                      <p className="mb-4 form_paragraph">
                                        All transactions are secure and
                                        encrypted.
                                      </p>
                                    </div>
                                    <div className="dpo_pay">
                                      <div className="col-md-3">
                                        <p
                                          className="form_paragraph"
                                          style={{
                                            position: "relative",
                                            top: "10px",
                                          }}
                                        >
                                          DPO Pay
                                        </p>
                                      </div>
                                      <div className="col-md-9">
                                        <div className="payment_logos">
                                          <img
                                            alt="visa"
                                            src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg"
                                            role="img"
                                            width="50"
                                            className="_1tgdqw61 _1fragemlr _1fragemlm _1fragemm0 _1fragemha"
                                          />
                                          <img
                                            alt="master"
                                            src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5e3b05b68f3d31b87e84.svg"
                                            role="img"
                                            width="50"
                                            className="_1tgdqw61 _1fragemlr _1fragemlm _1fragemm0 _1fragemha"
                                          />
                                          <img
                                            alt="american express"
                                            src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/cbbbc36cee664630aa26.svg"
                                            role="img"
                                            width="50"
                                            className="_1tgdqw61 _1fragemlr _1fragemlm _1fragemm0 _1fragemha"
                                          />
                                          <img
                                            alt="mpesa"
                                            src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/b5f5addb942e4e6228c9.svg"
                                            role="img"
                                            width="38"
                                            height="24"
                                            className="_1tgdqw61 _1fragemlr _1fragemlm _1fragemm0 _1fragemha"
                                          />
                                          <img
                                            alt="mpesa"
                                            src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/6ae10128cfa7a2f4f9d0.svg"
                                            role="img"
                                            width="50"
                                            className="_1tgdqw61 _1fragemlr _1fragemlm _1fragemm0 _1fragemha"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    className="btn book_button"
                                    href="#checkout"
                                  >
                                    {loading ? (
                                      <RiseLoader
                                        color={color}
                                        loading={loading}
                                        cssOverride={override}
                                        size={10}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                      />
                                    ) : (
                                      "Make payment"
                                    )}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    {showBookButton && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={showBillingSection}
                        disabled={yogaPackageId > 0 ? false : true}
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Planning;