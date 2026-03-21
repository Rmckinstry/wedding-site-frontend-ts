import React from "react";
import FooterImage from "../assets/footer_1280.webp";

function Footer({ showText = false }) {
  return (
    <>
      <div className="flex-col" id="footer-container">
        {showText && (
          <div id="footer-info" className="flex-col">
            <p id="footer-text" className="font-lg">
              S & T
            </p>
            <div id="divider-horiz"></div>
            <p id="footer-date" className="font-med">
              09.19.2026
            </p>
          </div>
        )}
        {/* <img id="footer-img" src={FooterImage} alt={"Flowers"} /> */}
      </div>
    </>
  );
}

export default Footer;
