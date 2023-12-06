import React from "react";
import { Link } from "react-router-dom"

function ThankYou() {
  return (
    <section
      className="section bg-beige"
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
              <Link to="/sign-in" className="btn book_button">Log in to get started</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
