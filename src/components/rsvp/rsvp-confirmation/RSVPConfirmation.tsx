import { FavoriteBorder, Check } from "@mui/icons-material";
import RSVPRegistryDesktop from "./RSVPConfirmationHeroDesktop";
import RSVPRegistryMobile from "./RSVPConfirmationHeroMobile";

export interface RSVPConfirmationProps {
  onlyRegistry: boolean;
}

const RSVPConfirmation = (props: RSVPConfirmationProps) => {
  const { onlyRegistry } = props;
  return (
    <div className="flex-col flex-col-lg" style={{ marginTop: "2rem" }}>
      {onlyRegistry ? (
        <>
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "var(--secondary-background)",
              width: "5rem",
              height: "5rem",
            }}
            className="flex-col"
          >
            <FavoriteBorder style={{ fontSize: "2.5rem", color: "var(--base-background)" }} />
          </div>
          <div className="flex-col">
            <span className="font-med-lg strong-text">We'll miss you!</span>
            <span
              className="font-sm"
              style={{ color: "var(--secondary-background-lite)", fontWeight: "var(--weight-light)" }}
            >
              Your response has been received. We're sorry you can't make it, but we appreciate you letting us know.
            </span>
          </div>
        </>
      ) : (
        <>
          <div
            style={{ borderRadius: "50%", backgroundColor: "var(--accent)", width: "5rem", height: "5rem" }}
            className="flex-col"
          >
            <Check style={{ fontSize: "2.5rem", color: "var(--secondary-text)" }} />
          </div>
          <div className="flex-col">
            <span className="font-med-lg strong-text">You're on the list!</span>
            <span
              className="font-sm"
              style={{ color: "var(--secondary-background-lite)", fontWeight: "var(--weight-light)" }}
            >
              Your RSVP(s) was submitted successfully. We can't wait to celebrate with you.
            </span>
          </div>
        </>
      )}
      <div className="desktop">
        <RSVPRegistryDesktop onlyRegistry={onlyRegistry} />
      </div>
      <div className="mobile">
        <RSVPRegistryMobile onlyRegistry={onlyRegistry} />
      </div>
    </div>
  );
};

export default RSVPConfirmation;
