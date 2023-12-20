import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Select from "react-select";
import RiseLoader from "react-spinners/RiseLoader";
import "react-toastify/dist/ReactToastify.css";
import PaymentInfo from "../paymentInfo/PaymentInfo";
import "../membershipInfo/MembershipInfo.css";
import { ToastContainer, toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};

function MembershipInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [membershipData, setMembershipData] = useState("");
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [isNotRegisted, setIsNotRegistred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const [yogaLocation, setYogaLocation] = useState("");
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [slot_available, setSlotAvailable] = useState(false);
  const [available_time, setAvailableTime] = useState([]);

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

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  useEffect(() => {
    const fetchMembership = async () => {
      const response = await axiosInstance.get(`/yoga_sessions/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const country_response = await axiosInstance.get("/country/list", {});
      const yoga_location = await axiosInstance.get(
        "/yoga_class_location/list",
        {}
      );
      setMembershipData(response.data);
      setCountry(country_response.data);
      setYogaLocation(yoga_location.data);
    };
    fetchMembership();
  }, []);
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
    if (name === "booking_date") {
      setInputValues({
        ...inputValues,
        booking_slot_time: "",
        booking_date: value,
      });
      const options = { weekday: "long" }; // This option will return the full name of the day
      const date = new Date(value);
      const dayOfWeek = date.toLocaleDateString("en-US", options);
      setErrorMessages("");
      switch (dayOfWeek) {
        case "Monday":
          setAvailableTime(["6:30 PM"]);
          break;
        case "Tuesday":
          setAvailableTime(["7:00 AM", "12:30 PM"]);
          break;
        case "Wednesday":
          setAvailableTime(["5:30 PM"]);
          break;
        case "Thursday":
          setAvailableTime(["5:30 PM", "7:00 PM"]);
          break;
        case "Friday":
          setAvailableTime(["4:30 PM"]);
          break;
        case "Saturday":
          setAvailableTime(["9:30 - 11 AM"]);
          break;
        case "Sunday":
          setErrorMessages(" - No Yoga class on Sunday");
          break;
        default:
          setAvailableTime("");
      }
      setSlotAvailable([]);
    }

    if (name === "booking_slot_time") {
      const query = `yoga_session_id=${id}&booking_date=${inputValues.booking_date}&booking_slot_time=${value}&yoga_class_location_id=${inputValues.yoga_class_location_id}`;
      const fetchSlotNumber = async () => {
        try {
          const response = await axiosInstance.get(
            `/yoga_class_booking/spot_available?${query}`,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log(response.data);
          setSlotAvailable(response.data.message);
        } catch (error) {
          console.error("Error fetching slot number", error);
        }
      };
      fetchSlotNumber();
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

    try {
      const params = {
        password: inputValues.password,
        yoga_session_id: id,
        billing_names: inputValues.names,
        billing_email: inputValues.email,
        billing_address: inputValues.address,
        billing_city: inputValues.city,
        billing_country_id: inputValues.country_id,
        yoga_class_location_id: inputValues.yoga_class_location_id,
        booking_date: inputValues.booking_date,
        booking_slot_time: inputValues.booking_slot_time,
        booking_slot_number: inputValues.booking_slot_number,
      };
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
  };
  return (
    <>
      <section
        className="section bg-beige"
        id="features"
        style={{ padding: "0", paddingBottom: "100px" }}
      >
        <div className="container">
          <ToastContainer autoClose={3000} />
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
                  {membershipData.name}
                </h2>
                <h4 className="title_text-2 pb-3">
                  {membershipData.price} Rwf – {membershipData.session_time}
                </h4>
                <p className="mb-4 ff-secondary fs-16 paragraph">
                  Safe Space yoga studio is an intimate space that creates a
                  comfortable and supportive environment for yoga practice.
                </p>
                <p className="mb-4 ff-secondary fs-16 paragraph">
                  It isn’t just a place for yoga, it’s a sanctuary where you can
                  find solace, support, and personal growth.
                </p>
                <p className="mb-4 ff-secondary fs-16 paragraph">
                  At Safe Space Studio, we honor yoga roots and aspire to
                  cultivate an environment that nurtures all dimensions of
                  being: body, soul, and mind.
                </p>
                <div className="booking-section">
                  <div className="mb-4">
                    <label
                      htmlFor="yoga_class_location_id"
                      className="form-label paragraph"
                    >
                      Studio Location
                    </label>
                    <select
                      className="form-control bg-light border-light"
                      name="yoga_class_location_id"
                      value={inputValues.yoga_class_location_id}
                      onChange={handleInputChange}
                    >
                      <option>Select location</option>
                      {yogaLocation &&
                        yogaLocation.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="booking_date"
                      className="form-label paragraph"
                    >
                      Date
                    </label>
                    <input
                      id="booking_date"
                      type="date"
                      className="form-control bg-light border-light"
                      name="booking_date"
                      value={inputValues.booking_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="booking-section">
                  <div className="mb-4">
                    <label
                      htmlFor="booking_slot_time"
                      className="form-label paragraph"
                    >
                      Time {errorMessages}
                    </label>

                    <select
                      className="form-control bg-light border-light"
                      name="booking_slot_time"
                      value={inputValues.booking_slot_time}
                      onChange={handleInputChange}
                    >
                      <option>Select time</option>
                      {available_time &&
                        available_time.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    {slot_available > 0 && (
                      <>
                        <label
                          htmlFor="booking_slot_number"
                          className="form-label paragraph"
                        >
                          Spot ({slot_available} spot available)
                        </label>
                        <input
                          type="number"
                          name="booking_slot_number"
                          className="form-control bg-light border-light"
                          placeholder="1"
                          value={inputValues.booking_slot_number}
                          onChange={handleInputChange}
                          max={slot_available}
                        />
                      </>
                    )}
                  </div>
                </div>
                <a className="btn book_button" href="#checkout" onClick={showBillingSection}>
                  {errorMessages ? errorMessages : "Book now"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showBillingForm && (
        <section
          className="section bg-white py-20"
          id="checkout"
          style={{ paddingTop: "80px" }}
        >
          <div className="container">
            <div className="row align-items-center gy-4">
              <form onSubmit={makePayment}>
                <div className="col-lg-6 mx-auto">
                  <div className="row gy-4">
                    <div className="col-lg-12">
                      <h4 className="fw-semibold">Contact</h4>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        {isNotRegisted && (
                          <div className="float-end">
                            <p className="mb-0 paragraph">
                              This email isn't registered with us!
                            </p>
                          </div>
                        )}

                        <label
                          className="form-label paragraph"
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
                      {isNotRegisted && (
                        <div className="mb-3">
                          <label
                            className="form-label paragraph"
                            htmlFor="password"
                          >
                            Password (Create a password to make a booking)
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type={showPassword ? "text" : "password"}
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
                        <h4 className="mb-3 fw-semibold">Billing Address</h4>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="mb-4">
                              <label
                                htmlFor="address"
                                className="form-label paragraph"
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
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="mb-4">
                              <label
                                htmlFor="address"
                                className="form-label paragraph"
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
                          <div className="col-lg-12">
                            <div className="mb-4">
                              <label
                                htmlFor="city"
                                className="form-label paragraph"
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
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="mb-4">
                              <label
                                htmlFor="username"
                                className="form-label paragraph"
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
                      </div>
                    </div>
                  </div>
                  {/* <div className="row gy-4 mt-2">
                  <div className="col-lg-12">
                    <div>
                      <h4 className="mb-3 fw-semibold">Checkout Comment</h4>
                      <div className="row">
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <label
                                htmlFor="comments"
                                className="form-label fs-13"
                              >
                                Message
                              </label>
                              <textarea
                                name="checkout_comments"
                                id="comments"
                                rows="5"
                                className="form-control bg-light border-light"
                                placeholder="Your message..."
                                onChange={handleInputChange}
                                value={inputValues.checkout_comments}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div> */}
                  <div className="row pt-4">
                    <div className="col-lg-12">
                      <h4 className="mb-3 fw-semibold">Payment</h4>
                      <p className="mb-4 paragraph">
                        All transactions are secure and encrypted.
                      </p>
                    </div>
                    <div className="dpo_pay">
                      <div className="col-md-3">
                        <p style={{ position: "relative", top: "10px" }}>
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

                  <button className="btn book_button" href="#checkout">
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
    </>
  );
}

export default MembershipInfo;
