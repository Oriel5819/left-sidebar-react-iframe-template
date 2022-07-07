import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "./error.css";

const Error = () => {
  return (
    <div className="loading">
      <PulseLoader size={10} color="#1c8195" />
    </div>
  );
};

export default Error;
