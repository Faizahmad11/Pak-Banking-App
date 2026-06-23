"use client";

import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="container">
        <div className="loader"></div>
        <div className="loader"></div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;