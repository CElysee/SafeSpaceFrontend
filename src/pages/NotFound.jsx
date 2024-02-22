import React from "react";
import { Link, useParams } from "react-router-dom";

function NotFound() {
  const url = useParams();
  console.log(url);
  return (
    <section
      className="section bg-beige pt-5 page_404"
      id="features"
      style={{ paddingTop: "100px", paddingBottom: "100px"}}
    >
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <div>
              <img
                src="/assets/images/error400-cover.png"
                alt=""
                className="img-fluid mx-auto"
              />
            </div>
          </div>
          <div className="col-lg-6 pl-5">
            <div className="text-muted">
              <h2 className="mb-3 fs-20 text-center title_text">
                Page not found!
              </h2>
              <p className="mb-4 ff-secondary fs-16 paragraph">
                We apologize, but it seems the page you are looking for could
                not be found. This may be due to a mistyped URL, an outdated
                link, or the page might have been moved or removed. Please
                double-check the URL for any typos and ensure you are navigating
                to the correct location. If you believe this is an error, feel
                free to contact our support team for assistance. In the
                meantime, you can return to the<a href="/"> home page</a>. or explore other
                sections of our website. Thank you for your understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
