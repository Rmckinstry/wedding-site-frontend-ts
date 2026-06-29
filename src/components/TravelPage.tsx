import { FlightTakeoff, Hotel, LocationOn } from "@mui/icons-material";
import React from "react";

function TravelPage() {
  const handleMapsClick = () => {
    window.open("https://maps.app.goo.gl/va4MYbT1qhPicKSN9", "_blank", "noreferrer");
  };
  return (
    <div id="travel-page-container" className="flex-col flex-col-lg">
      {/* lodging */}
      <div id="venue-container" className="flex-col">
        <span className="weight-light font-sm-med uppercase">Wedding Venue</span>
        <div id="venue-info" className="flex-col flex-col-lg contain-text-center">
          <div className="flex-col">
            <p className="weight-medium font-med-lg">Fort Panic (Beach Access Point)</p>
            <a
              href="https://maps.app.goo.gl/va4MYbT1qhPicKSN9"
              className="weight-light font-sm"
              target="_blank"
              rel="noreferrer"
            >
              5753 W County Hwy 30A, Santa Rosa Beach, FL 32459
            </a>
          </div>

          <div className="btn-container">
            <button
              onClick={() => {
                handleMapsClick();
              }}
              className="btn-rsvp btn-alt flex-row flex-row-gap"
            >
              <LocationOn style={{ color: "var(--default-text)" }} />
              <span className="uppercase">Open in Maps</span>
            </button>
          </div>
        </div>
      </div>
      <div id="travel-grid-container">
        {/* hotel */}
        <div id="lodging-container" className="secondary-card flex-col-start">
          <div id="hotel-header-container" className="flex-row-start flex-row-gap">
            <div className="rsvp-registry-icon-container flex-col" style={{ backgroundColor: "var(--secondary-text)" }}>
              <Hotel style={{ color: "var(--default-text)", fontSize: "2rem" }} />
            </div>
            <span className="alt-text strong-text font-sm-med">Lodging</span>
          </div>
          <div className="divider"></div>
          <div id="hotel-info-container" className="flex-col-start-sm">
            <span className="alt-text weight-medium font-sm">Hyatt Place Sandestin/at Grand Boulevard</span>
            <a
              href="https://maps.app.goo.gl/kMyJjFYo9j8Kb7mV8"
              target="_blank"
              rel="noreferrer"
              className="flex-col-start-sm"
              style={{ gap: ".25rem" }}
            >
              <span className="alt-text weight-light font-xs">325 Grand Blvd</span>
              <span className="alt-text weight-light font-xs">Destin, FL 32550</span>
            </a>
            <span className="underline strong-text alt-text font-xs">(850) 650-7611</span>
          </div>
          <div id="hotel-deadline-container" className="flex-col-start-sm">
            {/* <span
              style={{
                backgroundColor: "var(--base-background-transparent)",
                padding: ".5rem",
                borderRadius: ".5rem",
              }}
              className="warning-text uppercase strong-text font-xs"
            >
              Book by Oct 21
            </span> */}
            <span className="warning-text font-xs" >
              Use our room block for the discounted rate of $129/night. If the block shows full online, call and ask for
              Leslie Murry — she can assist you. Make sure to confirm room & guest count on website.
            </span>
          </div>
          <div className="border-box-100">
            <a
              href="https://www.hyatt.com/shop/rooms/ecpzs?location=Hyatt%20Place%20Sandestin%2Fat%20Grand%20Boulevard&checkinDate=2026-09-18&checkoutDate=2026-09-20&rooms=1&adults=1&kids=0&corp_id=G-BMWW"
              target="_blank"
              className="btn-link btn-link-accent uppercase font-sm strong-text"
              rel="noreferrer"
              style={{ width: "100%" }}
            >
              Book Block Rate
            </a>
          </div>
          <span style={{ color: "var(--secondary-text-transparent)", lineHeight: "1.55" }} className="font-xs">
          Discover art-themed ambiance and deluxe amenities such as complimentary breakfast at Hyatt Place Sandestin/At Grand Boulevard. Enjoy shopping, dining and entertainment within walking distance of our hotel as well as sugar-sand beaches a short drive away.
          </span>
        </div>
        {/* transportation */}
        <div id="transportation-container" className="secondary-card flex-col-start">
          <div id="transport-header-container" className="flex-row-start flex-row-gap">
            <div className="rsvp-registry-icon-container flex-col" style={{ backgroundColor: "var(--accent)" }}>
              <FlightTakeoff style={{ color: "var(--secondary-text)", fontSize: "2rem" }} />
            </div>
            <span className="alt-text strong-text font-sm-med">Getting there</span>
          </div>
          <div className="divider"></div>
          <div id="transport-info-container" className="flex-col-start">
            <div className="flex-row-start flex-row-gap">
              <div style={{ backgroundColor: "#1b434d12" }} className="rsvp-registry-icon-container flex-col">
                <span className="alt-text strong-text font-sm">VPS</span>
              </div>
              <div className="flex-col-start-sm">
                <span className="alt-text strong-text font-sm">Destin–Fort Walton Beach Airport</span>
                <span style={{ color: "var(--secondary-text-transparent)" }} className="font-xs">~20 miles west of the venue</span>
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex-row-start flex-row-gap">
              <div style={{ backgroundColor: "#1b434d12" }} className="rsvp-registry-icon-container flex-col">
                <span className="alt-text weight-medium font-sm">ECP</span>
              </div>
              <div className="flex-col-start-sm">
                <span className="alt-text weight-medium font-sm">Northwest Florida Beaches Intl.</span>
                <span style={{ color: "var(--secondary-text-transparent)" }} className="font-xs">~30 miles east of the venue</span>
              </div>
            </div>
            <span style={{ color: "var(--secondary-text-transparent)" }} className="font-xs">
              Two airports serve the Santa Rosa Beach area — either works depending on your origin.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelPage;
