import React from "react";
import HomeImage from "../assets/horiz-home-img-1 169.jpeg";
import { useNavigation } from "../context/NavigationContext.tsx";
import HomeImageVert from "../assets/vert-home-img-warm-1 4 5.jpeg";

function HomePage() {
  const { navigateTo } = useNavigation();

  return (
    <div id="home-page-container" className="flex-col">
      <img src={HomeImage} alt={"Tyler & Shelby"} id="home-page-image" />
      <img src={HomeImageVert} alt={"Tyler & Shelby"} id="home-page-image-vert" />

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
          <p className="contain-text-center uppercase">September</p>
          <p className="contain-text-center uppercase">19, 2026</p>
        </div>
        <div id="divider-vert">{/* divider */}</div>
        <div className="flex-col font-lg home-footer">
          <p className="contain-text-center uppercase">Santa Rosa Beach,</p>
          <p className="contain-text-center uppercase">Florida</p>
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
