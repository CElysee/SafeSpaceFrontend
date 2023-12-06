import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="custom-footer bg-white pb-5 position-relative">
        <div className="container">
          <div className="row text-center text-sm-start align-items-center mt-5">
            <div className="col-sm-8">
              <div>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <a href="" className="">
                      <p className="mb-0 paragraph-12">Terms & Conditions</p>
                    </a>
                  </li>
                  <li className="list-inline-item pl-3">
                    <a href="https://webtesting.co.rw/safespace/booking-cancellation-policies/">
                      <p className="mb-0 paragraph-12">
                        Booking & Cancellation policies
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="text-sm-end mt-3 mt-sm-0">
                <p className="mb-0 paragraph-12">
                  © {year} Safe Space Yoga Studio
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <button
        className="btn btn-danger btn-icon landing-back-top"
        id="back-to-top"
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </>
  );
}

export default Footer;
