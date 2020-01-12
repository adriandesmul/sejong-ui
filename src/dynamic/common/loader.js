import React from "react";
import "./loader.scss";

export default function Loader() {
  return (
    <div
      style={{
        transform: "scale(0.25)",
        position: "absolute",
        right: "0px",
        top: "-15px"
      }}
    >
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
