import { CheckCircleOutline, Favorite, LocalShipping } from "@mui/icons-material";

const Registry = () => {
  return (
    <div id="registry-page-container" className="flex-col flex-col-lg">
      <div className="btn-container contain-text-center" style={{ paddingBottom: "1rem" }}>
        <a
          href="https://withjoy.com/tyler-and-shelby-sep-26/registry"
          target="_blank"
          id="registry-btn"
          className="btn-link uppercase"
          rel="noreferrer"
        >
          Enter Shelby & Tyler's WithJoy Registry
        </a>
      </div>

      <div className="secondary-card flex-col-start">
        <div className="flex-row-start flex-row-gap-lg">
          <div className="rsvp-registry-icon-container flex-col" style={{ backgroundColor: "var(--secondary-text)" }}>
            <LocalShipping style={{ color: "var(--default-text)", fontSize: "2rem" }} />
          </div>
          <div className="flex-col-start" style={{ gap: "1rem" }}>
            <span className="alt-text strong-text font-sm">Shipping address</span>
            <span className="secondary-text font-xs">
              WithJoy defaults to sending gifts directly to us, but if you'd prefer to bring it in person, you can
              change the address in your cart before checkout.
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex-row-start flex-row-gap-lg">
          <div className="rsvp-registry-icon-container flex-col" style={{ backgroundColor: "var(--accent)" }}>
            <CheckCircleOutline style={{ color: "var(--secondary-text)", fontSize: "2rem" }} />
          </div>
          <div className="flex-col-start" style={{ gap: "1rem" }}>
            <span className="alt-text strong-text font-sm">Mark items as purchased</span>
            <span className="secondary-text font-xs">
              To prevent duplicates, please complete the prompt in WithJoy and mark any item as "purchased" once you've
              bought or donated to it. This keeps the list accurate for everyone.
            </span>
          </div>
        </div>
      </div>
      <Favorite style={{ fontSize: "3rem", color: "var(--default-text)" }} />
      <p className="registry-text font-sm contain-text-center">
        We deeply appreciate any gifts purchased or cash funds donated to. Your generosity means the world to us, thank
        you for being part of our celebration!
      </p>
    </div>
  );
};

export default Registry;
