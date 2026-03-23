import React from "react";
import HomeImage from "../assets/horiz-home-img-1.jpeg";
import { useNavigation } from "../context/NavigationContext.tsx";
function HomePage() {
  const { navigateTo } = useNavigation();

  return (
    <div id="home-page-container" className="flex-col">
      <img src={HomeImage} alt={"Proposal in Italy"} id="home-page-image" />
      {/* uncomment for day of */}
      {/* <div className="btn-container" style={{ paddingBottom: "0" }}>
        <button
          onClick={() => {
            navigateTo(1);
          }}
          className="btn-rsvp"
          style={{ padding: "1rem 2rem" }}
          id="rsvp-now-btn"
        >
          Click Here For Day Of Information
        </button>
      </div> */}
      {/* uncomment for RSVP */}
      {/* <div className="btn-container" style={{ paddingBottom: "0" }}>
          <button
            onClick={() => {
              navigateTo(2);
            }}
            className="btn-rsvp"
            style={{ padding: "1rem 2rem" }}
            id="rsvp-now-btn"
          >
            RSVP Now
          </button>
        </div> */}

      <div id="home-page-info-container-desktop" className="flex-row">
        <div className="flex-col font-lg home-footer">
          <p>September</p>
          <p>19, 2026</p>
        </div>
        <div id="divider-vert">{/* divider */}</div>
        <div className="flex-col font-lg home-footer">
          <p>Santa Rosa Beach,</p>
          <p>FL</p>
        </div>
      </div>

      <div id="home-page-info-container-mobile" className="flex-col">
        <span className="uppercase font-lg">Wedding Day</span>
        <span className="font-med uppercase contain-text-center">Saturday, September 19, 2026</span>
      </div>
    </div>
  );
}

export default HomePage;
