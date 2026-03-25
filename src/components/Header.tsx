import React from "react";
import HeaderImage from "../assets/header-desktop-2880.png";

function Header() {
  return (
    <>
      <div className="header-container">
        <div className="img-box-a">
          <div className="img-box-b">
            <div className="img-box-c">
              <img
                id="header-img"
                src={HeaderImage}
                alt={"Our Day Groovy Image"}
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  right: "0",
                  bottom: "0",
                  color: "transparent",
                }}
              />
            </div>
          </div>
        </div>
        <header id="header-info-container" className="flex-col">
          <h1 id="header-name" className="contain-text-center font-xl uppercase">
            Shelby & Tyler
          </h1>
          {/* <span id="header-event-info-desktop" className="font-med uppercase contain-text-center">
            September 19, 2026, 5:30 PM • Santa Rosa Beach, FL
          </span> */}
          <span id="header-event-info-desktop" className="font-med uppercase contain-text-center">
            09.19.2026, 5:30 PM • Santa Rosa Beach, Florida
          </span>
          <span id="header-event-info-mobile" className="font-med uppercase">
            September 19, 2026 • 5:30 PM
          </span>
          <span id="header-event-time-mobile" className="font-med uppercase">
            Santa Rosa Beach, FL
          </span>
        </header>
      </div>
    </>
  );
}

export default Header;
