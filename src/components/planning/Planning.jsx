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
  const [isNotRegisted, setIsNotRegistred] = useState(false);
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
  const [contentLoading, setContentLoading] = useState(true);
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
          // console.log("Response:", response.data[dayActive].sessions.name);
          setDays_list(response.data);
          setSelectedDay(response.data[0].sessions);
          setDayActive(0);
          setYogaPackage(yogaSessions.data);
          setYogaPackageFilter(yogaSessions.data);
          setContentLoading(false);
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
    const jsonFormattedData = JSON.stringify(moreSessions);
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
        booking_more_sessions: moreSessions,
        payment_package_id: yogaPackageId,
      };
      console.log(params);
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
      console.log(submitPayment.data);
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
        return item.name === "5 CLASSES PASS";
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
        <></>
      </section>
    </>
  );
}
export default Planning;
