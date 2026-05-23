import { Redeem, BorderColor, Newspaper } from "@mui/icons-material";

export interface RSVPConfirmationHeroDesktopProps {
  onlyRegistry: boolean;
}

const RSVPConfirmationHeroDesktop = (props: RSVPConfirmationHeroDesktopProps) => {
  const { onlyRegistry } = props;

  return (
    <div className="flex-col-start" id="rsvp-registry-container">
      <div className="rsvp-registry-section">
        <div className="flex-row-start flex-row-gap-lg rsvp-registry-section flex-row-start-sm">
          <div style={{ backgroundColor: "var(--secondary-text)" }} className="flex-col rsvp-registry-icon-container">
            <Redeem sx={{ color: "var(--secondary-background)", fontSize: "2rem" }} />
          </div>
          <div className="flex-col-start-sm">
            <span className="alt-text strong-text font-sm-med">Browse the Registry</span>
            {onlyRegistry ? (
              <span className="alt-text-lite font-sm">Find gift ideas the couple has curated!</span>
            ) : (
              <span className="alt-text-lite font-sm">
                You're still welcome to celebrate with a gift. Find ideas the couple has curated just for the occasion.
              </span>
            )}
          </div>
        </div>
        <button className="btn-rsvp-registry">Registry</button>
      </div>

      {!onlyRegistry && (
        <div className="rsvp-registry-section">
          <div className="flex-row-start flex-row-gap-lg rsvp-registry-section flex-row-start-sm">
            <div style={{ backgroundColor: "var(--accent)" }} className="flex-col rsvp-registry-icon-container">
              <BorderColor sx={{ color: "var(--secondary-text)", fontSize: "2rem" }} />
            </div>
            <div className="flex-col-start-sm">
              <span className="alt-text strong-text font-sm-med">Need to make a change?</span>
              <span className="alt-text-lite font-sm">
                Update your dietary restrictions, song requests or other information any time before the deadline.
              </span>
            </div>
          </div>
          <button className="btn-rsvp-registry">RSVP Portal</button>
        </div>
      )}
      <div className="rsvp-registry-section">
        <div className="flex-row-start flex-row-gap-lg flex-row-start-sm">
          <div
            style={{ backgroundColor: "var(--secondary-text-lite)" }}
            className="flex-col rsvp-registry-icon-container"
          >
            <Newspaper sx={{ color: "var(--secondary-text)", fontSize: "2rem" }} />
          </div>
          <div className="flex-col-start-sm">
            <span className="alt-text strong-text font-sm-med">Learn more about the day</span>
            <span className="alt-text-lite font-sm">
              Read the FAQ page for more details about the day, travel, and more.
            </span>
          </div>
        </div>
        <button className="btn-rsvp-registry">FAQ Page</button>
      </div>
    </div>
  );
};

export default RSVPConfirmationHeroDesktop;
