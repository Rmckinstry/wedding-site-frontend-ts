import { Redeem, BorderColor, Newspaper } from "@mui/icons-material";
import { useNavigation } from "../../../context/NavigationContext";

export interface RSVPConfirmationHeroMobileProps {
  onlyRegistry: boolean;
  sendRefresh: () => void;
}

const RSVPConfirmationHeroMobile = (props: RSVPConfirmationHeroMobileProps) => {
  const { onlyRegistry, sendRefresh } = props;
  const { navigateTo } = useNavigation();

  const handleClick = (page: string) => {
    if (page === "registry") {
      window.open("https://withjoy.com/tyler-and-shelby-sep-26/registry", "_blank", "noreferrer");
    }

    if (page === "portal") {
      sendRefresh();
    }

    if (page === "faq") {
      navigateTo(4);
    }
  };

  return (
    <div className="flex-col-start" id="rsvp-registry-container" style={{ gap: "3rem" }}>
      <div className="flex-col-start border-box-100">
        <div className="rsvp-registry-section">
          <div style={{ backgroundColor: "var(--secondary-text)" }} className="flex-col rsvp-registry-icon-container">
            <Redeem sx={{ color: "var(--secondary-background)", fontSize: "2rem" }} />
          </div>
          <span className="alt-text strong-text font-sm-med">Browse the Registry</span>
          <div className="flex-col rsvp-registry-icon-container"></div>
        </div>
        <span className="alt-text-lite font-sm">
          Needing gift ideas? Check out the registry that we have curated just for the occasion.
        </span>
        <div className="btn-container border-box-100">
          <button
            onClick={() => {
              handleClick("registry");
            }}
            style={{ width: "100%" }}
            className="btn-rsvp-registry"
          >
            Registry
          </button>
        </div>
      </div>

      {!onlyRegistry && (
        <>
          <div className="divider"></div>

          <div className="flex-col-start border-box-100">
            <div className="rsvp-registry-section">
              <div style={{ backgroundColor: "var(--accent)" }} className="flex-col rsvp-registry-icon-container">
                <BorderColor sx={{ color: "var(--secondary-text)", fontSize: "2rem" }} />
              </div>
              <span className="alt-text strong-text font-sm-med">Need to make a change?</span>
              <div className="flex-col rsvp-registry-icon-container"></div>
            </div>
            <span className="alt-text-lite font-sm">
              Update your dietary restrictions, song requests or other information any time before the deadline.
            </span>
            <div className="btn-container border-box-100">
              <button
                onClick={() => {
                  handleClick("portal");
                }}
                style={{ width: "100%" }}
                className="btn-rsvp-registry"
              >
                RSVP Portal
              </button>
            </div>
          </div>
        </>
      )}
      <div className="divider"></div>
      <div className="flex-col-start border-box-100">
        <div className="rsvp-registry-section">
          <div
            style={{ backgroundColor: "var(--secondary-text-lite)" }}
            className="flex-col rsvp-registry-icon-container"
          >
            <Newspaper sx={{ color: "var(--secondary-text)", fontSize: "2rem" }} />
          </div>
          <span className="alt-text strong-text font-sm-med">Learn more about the day</span>
          <div className="flex-col rsvp-registry-icon-container"></div>
        </div>
        <span className="alt-text-lite font-sm">
          Read the FAQ page for more details about the day, travel, and more.
        </span>
        <div className="btn-container border-box-100">
          <button
            onClick={() => {
              handleClick("faq");
            }}
            style={{ width: "100%" }}
            className="btn-rsvp-registry"
          >
            FAQ Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSVPConfirmationHeroMobile;
