import React from "react";
import { useNavigate } from "react-router-dom";
import "../pageNotFound/PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-text">
        Sorry, the page you are looking for does not exist.
      </p>

      <button className="notfound-btn" onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

export default PageNotFound;
