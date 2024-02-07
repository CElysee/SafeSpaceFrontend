import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function PaymentConfirmation() {
  //   const [transId, setTransId] = useState("");
  //   const [ccdApproval, setCcdApproval] = useState("");
  //   const [transactionToken, setTransactionToken] = useState("");
  //   const [companyRef, setCompanyRef] = useState("");
  //   const [pnrID, setPnrID] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect is running");
    // Get the current URL
    const queryString = window.location.search;
    // Parse the URL and extract parameters
    const urlParams = new URLSearchParams(queryString);
  
    // Extract values for TransID, CCDapproval, TransactionToken, and CompanyRef
    const transId = urlParams.get("TransID");
    const ccdApproval = urlParams.get("CCDapproval");
    const transactionToken = urlParams.get("TransactionToken");
    const companyRef = urlParams.get("CompanyRef");
    const pnrID = urlParams.get("PnrID");
  
    console.log("Params:", { transId, ccdApproval, transactionToken, companyRef, pnrID });
  
    const updatePaymentStatus = async () => {
      const params = {
        transId,
        ccdApproval,
        transactionToken,
        companyRef,
        pnrID,
      };
  
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
  
      try {
        const response = await axiosInstance.post("/yoga_class_booking/update_payment", null, {
          params,
          config,
        });
        if (response.status === 200) {
          console.log("Payment status updated successfully");
          navigate("/thank-you");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    // Call the updatePaymentStatus function
    updatePaymentStatus();
  }, []);

  return (
    <section
      className="section bg-beige pt-5"
      id="features"
      style={{ padding: "0px", paddingBottom: "100px" }}
    >
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <div>
              <img
                src="/assets/images/SSY-31-compressed-1-scaled.jpg"
                alt=""
                className="img-fluid mx-auto"
              />
            </div>
          </div>
          <div className="col-lg-6 pl-5">
            <div className="text-muted">
              <h2 className="mb-3 fs-20 text-center title_text">
                Thank you for choosing to Safe Space Yoga Studio
              </h2>
              <p className="mb-4 ff-secondary fs-16 paragraph">
                Your booking is confirmed, and we're thrilled to have you join
                our yoga studio. Look out for an email with further details. If
                you have any queries, feel free to contact us at{" "}
                <a href="mailto:info@safespace.com">info@safespace.com</a>.
                We're excited to guide you on this yoga journey!
              </p>
              <Link to="/sign-in" className="btn book_button">
                Log in to get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentConfirmation;
