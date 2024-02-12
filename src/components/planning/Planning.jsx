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
import ContentLoader from "react-content-loader";
import { set } from "date-fns";
import axios from "axios";

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
  const [ahead_session, setAheadSession] = useState([]);
  const [yogaPackageFilter, setYogaPackageFilter] = useState([]);
  const [yogaPackageId, setYogaPackageId] = useState();
  const [loading, setLoading] = useState(false);
  // const [isNotRegisted, setIsNotRegistred] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(true);
  const [showFromReg, setShowFromReg] = useState(false);
  const [yogaLocation, setYogaLocation] = useState("");
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [slot_available, setSlotAvailable] = useState(false);
  const [available_time, setAvailableTime] = useState([]);
  const [showBookButton, setShowBookButton] = useState(true);
  const [moreSessions, setMoreSessions] = useState([]);
  const [resetMoreSessions, setResetMoreSessions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disableBookMore, setDisableBookMore] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    names: "",
    phone_number: "",
    address: "",
    city: "",
    country_id: "",
    checkout_comments: "",
    password: "",
    yoga_class_location_id: "",
    booking_date: "",
    booking_slot_time: "",
    booking_slot_number: "",
    booking_more_sessions: "",
    payment_package_id: "",
  });

  useEffect(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday

    // Calculate last week's Sunday date
    const lastWeekSunday = new Date(today);
    lastWeekSunday.setDate(today.getDate() - currentDay - 7);
    setStartDate(lastWeekSunday.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    const startOfWeek = new Date(today.setDate(diff));
    const endOfWeek = new Date(today.setDate(diff + 6));
    const formattedStartDate = startOfWeek.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
    const formattedEndDate = endOfWeek.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    const fetchMembership = async () => {
      try {
        const country_response = await axiosInstance.get("/country/list", {});
        const yoga_location = await axiosInstance.get(
          "/yoga_class_location/list",
          {}
        );
        const ahead_session = await axiosInstance.get(
          "/planningsession_weekly_list",
          {}
        );
        setCountry(country_response.data);
        setYogaLocation(yoga_location.data);
        setAheadSession(ahead_session.data);
        setResetMoreSessions(ahead_session.data);
        setMoreSessions([]);
        setErrorMessages("");
      } catch (error) {
        // Handle errors, you might want to display an error message to the user
        console.error("Error fetching data:", error);
        setErrorMessages("Error fetching data. Please try again later.");
      }
    };
    const fetchDays = async () => {
      try {
        const response = await axiosInstance.get(`/planning/list`);
        const yogaSessions = await axiosInstance.get("/yoga_sessions/list");
        if (response && response.data) {
          // console.log("Response:", response.data);
          setDays_list(response.data);
          setSelectedDay(response.data[0].sessions);
          setDayActive(0);
        } else {
          console.log("Empty response or missing data");
        }
        setYogaPackage(yogaSessions.data);
        setYogaPackageFilter(yogaSessions.data);
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
    if (name === "password") {
      if (value.length <8) {
        setErrorMessages("Password must be at least 8 characters");
        setShowFromReg(false);
      } else {
        setErrorMessages("");
        setShowFromReg(true);
      }
    }
  };
  const handleDayActive = (index) => {
    setDayActive(index);
    setSelectedDay(days_list[index].sessions);
    setSession_id(0);
    setMoreSessions([]);
    setAheadSession(resetMoreSessions);
    setDisableBookMore(false);
    setErrorMessages("");
  };
  const handleSession_id = (id) => {
    setSession_id(id);
    if (selectedDay[id].name !== "Sadhana - Kigali Wellness Hub") {
      const filteredArray = yogaPackageFilter.filter((item) => {
        return item.name !== "SADHANA 4 CLASSES PASS";
      });
      setYogaPackage(filteredArray);
    } else {
      const filteredArray = yogaPackageFilter.filter((item) => {
        return ![
          "5 CLASSES PASS",
          "10 CLASSES PASS",
          "NEW STUDENT- 2 WEEKS PASS",
        ].includes(item.name);
      });
      setYogaPackage(filteredArray);
    }
  };
  const UserRegistered = async () => {
    try {
      const response = await axiosInstance.post("/auth/check_username", {
        email: inputValues.email,
        headers: { "Content-Type": "application/json" },
      });
      setIsUserRegistered(true);
      setShowFromReg(true);
      setInputValues({
        ...inputValues,
        names: response.data.data.name,
      });
    } catch (error) {
      setIsUserRegistered(false);
      console.error("Error while checking user", error);
    }
  };
  const makePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const jsonFormattedData = JSON.stringify(moreSessions);
    const randomStringRef = Math.random().toString(36).slice(2)
    try {
      const params = {
        password: inputValues.password,
        yoga_session_id: yogaPackageId,
        billing_names: inputValues.names,
        billing_email: inputValues.email,
        billing_phone_number: inputValues.phone_number,
        billing_address: inputValues.address,
        billing_city: inputValues.city,
        billing_country_id: inputValues.country_id,
        yoga_class_location_id: selectedDay[session_id].location,
        booking_date: days_list[dayActive].days,
        booking_slot_time: selectedDay[session_id].time,
        booking_slot_number: inputValues.booking_slot_number,
        booking_more_sessions: moreSessions,
        payment_package_id: yogaPackageId,
        session_ref: randomStringRef
      };
      // console.log(params);
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const submitPayment = await axiosInstance.post(
        "/yoga_class_booking/create",
        params,
        config
      );
      setLoading(false);
      window.location.href = submitPayment.data.redirection_url;
      navigate(submitPayment.data.redirection_url);
    } catch (error) {
      console.error("Error making a payment", error);
      setLoading(false);
    }
  };
  const showBillingSection = () => {
    setShowBillingForm(true);
    setShowBookButton(false);
  };
  const handleLeftArrowDate = () => {
    const currentYear = new Date().getFullYear();
    const inputDateWithYear = `${startDate} ${currentYear}`;

    // Parse the input date string
    const parsedDate = new Date(inputDateWithYear);

    // Define options for formatting the date
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
      timeZone: "Africa/Cairo", // Adjust the timeZone as per your requirements
    };

    // Convert the date to the desired format
    const formattedDate = parsedDate
      .toLocaleString("en-US", options)
      .replace(/,/g, "");
    const today = new Date();
    const currentDay = today.getDay();
    // Calculate last week's Sunday date
    const lastWeekSunday = new Date(formattedDate);
    lastWeekSunday.setDate(today.getDate() - currentDay - 7);
    console.log(lastWeekSunday);
    setStartDate(lastWeekSunday.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    const formattedStartDate = lastWeekSunday.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
    // Calculate last date of last week
    const lastDateOfLastWeek = new Date(today);
    lastDateOfLastWeek.setDate(today.getDate() - currentDay - 1); // Subtract days to get to the last day of last week
    const formattedEndDate = lastDateOfLastWeek.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  };
  const handleBookMoreSessions = (index) => {
    // Remove the selected date from the source array
    const movedDate = ahead_session[index];
    const updatedSourceDates = ahead_session.filter((date, i) => i !== index);
    setAheadSession(updatedSourceDates);
    setMoreSessions([...moreSessions, movedDate]);
    if (
      selectedDay[session_id].name == "Sadhana - Kigali Wellness Hub" &&
      moreSessions.length >= 2
    ) {
      setErrorMessages("You can't book more than 4 sessions");
      setDisableBookMore(true);
      const filteredArray = yogaPackageFilter.filter((item) => {
        return item.name === "SADHANA 4 CLASSES PASS";
      });
      setYogaPackage(filteredArray);
    }
    if (
      moreSessions.length >= 4 &&
      selectedDay[session_id].name !== "Sadhana - Kigali Wellness Hub"
    ) {
      const filteredArray = yogaPackageFilter.filter((item) => {
        return item.name === "10 CLASSES PASS";
      });
      setYogaPackage(filteredArray);
    } else if (
      moreSessions.length <= 3 &&
      selectedDay[session_id].name !== "Sadhana - Kigali Wellness Hub"
    ) {
      const filteredArray = yogaPackageFilter.filter((item) => {
        if (moreSessions.length >= 3) {
          return item.name === "5 CLASSES PASS";
        } else {
          return item.name === "DROP IN";
        }
      });
      setYogaPackage(filteredArray);
    }
  };
  const removeBookMoreSessions = (index) => {
    // Remove the selected date from the source array
    const movedDate = moreSessions[index];
    const updatedSourceDates = moreSessions.filter((date, i) => i !== index);
    setMoreSessions(updatedSourceDates);
    setAheadSession([...ahead_session, movedDate]);
    if (selectedDay[session_id].name == "Sadhana - Kigali Wellness Hub") {
      setErrorMessages("");
      setDisableBookMore(false);
      const filteredArray = yogaPackageFilter.filter((item) => {
        return ![
          "5 CLASSES PASS",
          "10 CLASSES PASS",
          "NEW STUDENT- 2 WEEKS PASS",
        ].includes(item.name);
      });
      setYogaPackage(filteredArray);
    }
    if (
      moreSessions.length < 4 &&
      selectedDay[session_id].name !== "Sadhana - Kigali Wellness Hub"
    ) {
      const filteredArray = yogaPackageFilter.filter((item) => {
        return item.name !== "SADHANA 4 CLASSES PASS";
      });
      setYogaPackage(filteredArray);
    }
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
            <div className="col-lg-12 pl-5">
              <div className="text-muted">
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
            {days_list.length > 0 &&
            selectedDay.length > 0 &&
            moreSessions &&
            ahead_session.length > 0 ? (
              <>
                <div className="col-lg-12">
                  <button
                    className="btn btn-primary pt-2"
                    style={{
                      margin: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="left_arrow">
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleLeftArrowDate}
                      >
                        <rect width="24" height="24" fill="white" />
                        <path
                          d="M14.5 17L9.5 12L14.5 7"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="date_range">
                      {startDate} - {endDate}{" "}
                    </div>
                    <div className="right_arrow">
                      <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" fill="white" />
                        <path
                          d="M9.5 7L14.5 12L9.5 17"
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="date_list pt-5">
                    {days_list.map((dates, index) => (
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
                          {""}
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
                          <span className="session_time">
                            {session_list.time}
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
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="staticBackdropLabel"
                          style={{ textAlign: "center" }}
                        >
                          You are about to book{" "}
                          {selectedDay.length > 0 &&
                            selectedDay[session_id].name}
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
                            <div className="add_session pt-2">
                              <button
                                className="btn btn-primary add_session_btn"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                {" "}
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 12H20M12 4V20"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Add more sessions
                              </button>
                              <div className="add_session_list pt-3">
                                {moreSessions.length > 0 &&
                                  moreSessions.map((session, index) => (
                                    <div
                                      className="session_option p-3"
                                      key={index}
                                    >
                                      <div className="card_info">
                                        <div className="card_info_name">
                                          {selectedDay.length > 0 &&
                                            selectedDay[session_id].name}
                                        </div>
                                        <div className="card_info_price">
                                          {selectedDay.length > 0 &&
                                            selectedDay[session_id].time}
                                        </div>
                                        <div className="card_info_validity">
                                          {session}
                                        </div>
                                      </div>
                                      <div
                                        className="card_close_button"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <svg
                                          width="25px"
                                          height="25px"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          onClick={() =>
                                            removeBookMoreSessions(index)
                                          }
                                        >
                                          <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                          />

                                          <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />

                                          <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path
                                              d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                              stroke="#000000"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />{" "}
                                            <path
                                              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                              stroke="#000000"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />{" "}
                                          </g>
                                        </svg>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                              <div
                                className="offcanvas offcanvas-end"
                                tabIndex="-1"
                                id="offcanvasRight"
                                aria-labelledby="offcanvasRightLabel"
                              >
                                <div className="offcanvas-header">
                                  <h5 id="offcanvasRightLabel">
                                    Book more sessions
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="offcanvas-body">
                                  <div className="add_session_list pt-3">
                                    {errorMessages && (
                                      <p className="text-error">
                                        {errorMessages}
                                      </p>
                                    )}
                                    {ahead_session.length > 0 ? (
                                      ahead_session.map((session, index) => (
                                        <div
                                          className="session_option p-3"
                                          type="button"
                                          key={index}
                                          {...(disableBookMore
                                            ? {}
                                            : {
                                                onClick: () =>
                                                  handleBookMoreSessions(index),
                                              })}
                                        >
                                          <div className="card_info">
                                            <div className="card_info_name">
                                              {selectedDay.length > 0 &&
                                                selectedDay[session_id].name}
                                            </div>
                                            <div className="card_info_price">
                                              {selectedDay.length > 0 &&
                                                selectedDay[session_id].time}
                                            </div>
                                            <div className="card_info_validity">
                                              {session}
                                            </div>
                                          </div>
                                          <div
                                            className="card_close_button"
                                            style={{ cursor: "pointer" }}
                                          >
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
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="form_paragraph">
                                        No available session for the up coming
                                        month
                                      </p>
                                    )}
                                  </div>
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
                                  <label
                                    htmlFor={yoga.id}
                                    aria-label={yoga.name}
                                  >
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
                                    <div className="card_input card--white card--sm">
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
                                          <h4 className="fw-semibold">
                                            Contact
                                          </h4>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="mb-3">
                                            {isUserRegistered == false && (
                                              <div className="float-end">
                                                <p className="mb-0 form_paragraph text-danger">
                                                  This email isn't registered
                                                  with us!
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
                                                onBlur={UserRegistered}
                                              />
                                            </div>
                                            
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          {isUserRegistered == false && (
                                            <div className="mb-3">
                                              <label
                                                className="form-label form_paragraph"
                                                htmlFor="password"
                                              >
                                                Password (Create a password to
                                                make a booking)
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
                                                <span className="form_paragraph text-danger">{errorMessages}</span>
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
                                      {showFromReg && (
                                        <>
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
                                                        value={
                                                          inputValues.names
                                                        }
                                                        onChange={
                                                          handleInputChange
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                  <div className="col-lg-6">
                                                    <div className="mb-4">
                                                      <label
                                                        htmlFor="PhoneNumber"
                                                        className="form-label form_paragraph"
                                                      >
                                                        Phone Number
                                                      </label>
                                                      <input
                                                        id="PhoneNumber"
                                                        type="number"
                                                        className="form-control bg-light border-light"
                                                        placeholder="07** *** **"
                                                        name="phone_number"
                                                        value={
                                                          inputValues.phone_number
                                                        }
                                                        onChange={
                                                          handleInputChange
                                                        }
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
                                                        value={
                                                          inputValues.address
                                                        }
                                                        onChange={
                                                          handleInputChange
                                                        }
                                                      />
                                                    </div>
                                                  </div>
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
                                                        onChange={
                                                          handleInputChange
                                                        }
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
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
                                                        onChange={
                                                          handleCountryChange
                                                        }
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
                                        </>
                                      )}
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
                            className="btn btn-primary book_now_btn"
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
              </>
            ) : (
              <ContentLoader
                speed={2}
                width={1200}
                height={200}
                viewBox="0 0 400 100"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ marginTop: "35px" }}
              ></ContentLoader>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default Planning;
