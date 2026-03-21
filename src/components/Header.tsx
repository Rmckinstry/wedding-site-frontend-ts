import React from "react";
import HeaderImage from "../assets/header_1024.webp";

function Header() {
  return (
    <>
      <div className="header-container">
        {/* <img id="header-img" src={HeaderImage} alt={"Green Vines"} /> */}
        <div id="header-info-container" className="flex-col">
          <h1 id="header-name" className="contain-text-center">
            SHELBY & TYLER
          </h1>
          <p id="header-event-info-desktop" className="font-med-lg">
            September 19, 2026, 5:30 PM • Santa Rosa Beach, FL
          </p>
          <p id="header-event-info-mobile" className="font-med-lg">
            September 19, 2026 • Santa Rosa Beach, FL
          </p>
          <p id="header-event-time-mobile" className="font-med">
            5:30 PM
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
