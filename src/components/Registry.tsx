import React, { useState } from "react";
import Loading from "./utility/Loading";

function Registry() {
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <>
      <div id="registry-page-container" className="flex-col">
        <div id="registry-info-container" className="flex-col"></div>
        <div id="registry-btn-container" className="btn-container contain-text-center">
          {/* <div id="registry-iframe-container" style={{ position: "relative", width: "100%", minHeight: "500px" }}> */}
          {/* {iframeLoading && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Loading loadingText="Loading Registry Preview ..." />
              </div>
            )} */}
          {/* <iframe
              title="Registry Preview"
              src="https://withjoy.com/tyler-and-shelby-sep-26/registry"
              onLoad={handleIframeLoad}
              className="registry-frame"
              style={{ visibility: iframeLoading ? "hidden" : "visible" }}
              id="registry-iframe"
            ></iframe> */}
          {/* </div> */}
          <a
            href="https://withjoy.com/tyler-and-shelby-sep-26/registry"
            target="_blank"
            id="registry-btn"
            className="btn-link"
            rel="noreferrer"
          >
            Enter Shelby & Tyler's WithJoy Registry
          </a>
        </div>
        <p className="registry-text font-sm-med" style={{ padding: "1rem 5%", textAlign: "center" }}>
          <strong className="underline">Note:</strong> WithJoy defaults to using our shipping address when purchasing
          gifts from the registry. You{" "}
          <strong className="underline">are able to change the address in your cart</strong> to get it shipped to your
          place if you prefer. Thanks!
        </p>
        <p className="registry-text font-sm-med" style={{ padding: "1rem 5%", textAlign: "center" }}>
          <strong className="underline">Note:</strong> To ensure items are not duplicated, when you have purchased an
          item/donated on WithJoy, please make sure to finish the prompt and mark the item as "purchased".
        </p>

        <p className="registry-text font-sm contain-text-center">
          We deeply appreciate any gifts purchased or cash funds donated to. Your generosity means the world to us,
          thank you for being part of our celebration!
        </p>
      </div>
    </>
  );
}

export default Registry;
