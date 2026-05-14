import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

function Loading({ loadingText }: { loadingText: string }) {
  useEffect(() => {
    // This runs only once when the component mounts
    console.log("Loading mounted");

    return () => {
      // This runs only once when the component unmounts
      console.log("Loading unmounted");
    };
  }, []);
  return (
    <div id="loading-container" className="flex-col">
      <CircularProgress size="4rem" />
      <p className="loading-text font-sm-med">{loadingText}</p>
    </div>
  );
}
export default Loading;
