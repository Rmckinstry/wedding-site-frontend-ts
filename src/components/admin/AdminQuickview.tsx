import { useEffect, useState } from "react";
import { Guest, RSVP } from "../../utility/types";

export interface AdminQuickviewProps {
  guests: Guest[] | undefined;
  rsvps: RSVP[] | undefined;
}
const AdminQuickview = (props: AdminQuickviewProps) => {
  const { guests, rsvps } = props;

  const [acceptedRsvpsCount, setAcceptedRsvpsCount] = useState<number>(0);
  const [declinedRsvpsCount, setDeclinedRsvpsCount] = useState<number>(0);
  const [plusOneCount, setPlusOneCount] = useState<number>(0);
  const [dependentCount, setDependentCount] = useState<number>(0);

  // quick view data update effect
  useEffect(() => {
    if (guests) {
      const plusOneCount = guests.filter((guest) => guest.additional_guest_type === "plus_one").length;
      const dependentCount = guests.filter((guest) => guest.additional_guest_type === "dependent").length;

      setPlusOneCount(plusOneCount);
      setDependentCount(dependentCount);
    }

    if (rsvps) {
      const acceptedCount = rsvps.filter((rsvp) => rsvp.attendance === true).length;
      const declinedCount = rsvps.filter((rsvp) => rsvp.attendance === false).length;

      setAcceptedRsvpsCount(acceptedCount);
      setDeclinedRsvpsCount(declinedCount);
    }
  }, [guests, rsvps]);

  return (
    <>
      <div id="admin-quickview-container-desktop" className="flex-row">
        <div className="quickview-item">
          <p className="font-sm secondary-text underline">Total Guests</p>
          <p className="font-sm-med">{guests?.length}</p>
        </div>
        <div className="quickview-item">
          <p className="font-sm secondary-text underline">No Response</p>
          <p className="font-sm-med">{guests ? guests.length - (acceptedRsvpsCount + declinedRsvpsCount) : 0}</p>
        </div>
        <div className="quickview-item">
          <p className="font-sm secondary-text underline">Declined</p>
          <p className="font-sm-med">{declinedRsvpsCount}</p>
        </div>
        <div className="quickview-item">
          <p className="font-sm secondary-text underline">Accepted</p>
          <p className="font-sm-med">{acceptedRsvpsCount}</p>
        </div>
        <div className="quickview-item">
          <p className="font-sm secondary-text underline">Plus One</p>
          <p className="font-sm-med">{plusOneCount}</p>
        </div>
        <div className="quickview-item">
          <p className="font-sm secondary-text underline">Children</p>
          <p className="font-sm-med">{dependentCount}</p>
        </div>
      </div>
      <div id="admin-quickview-container-mobile" className="flex-col">
        <div className="flex-row mobile-quick-row">
          <div className="quickview-item">
            <p className="font-sm secondary-text underline">No Response</p>
            <p className="font-sm-med">{guests ? guests.length - (acceptedRsvpsCount + declinedRsvpsCount) : 0}</p>
          </div>
          <div className="quickview-item">
            <p className="font-sm secondary-text underline">Declined</p>
            <p className="font-sm-med">{declinedRsvpsCount}</p>
          </div>
          <div className="quickview-item">
            <p className="font-sm secondary-text underline">Accepted</p>
            <p className="font-sm-med">{acceptedRsvpsCount}</p>
          </div>
        </div>
        <div className="flex-row mobile-quick-row">
          <div className="quickview-item">
            <p className="font-sm secondary-text underline">Total Guests</p>
            <p className="font-sm-med">{guests?.length}</p>
          </div>
          <div className="quickview-item">
            <p className="font-sm secondary-text underline">Plus One</p>
            <p className="font-sm-med">{plusOneCount}</p>
          </div>
          <div className="quickview-item">
            <p className="font-sm secondary-text underline">Children</p>
            <p className="font-sm-med">{dependentCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminQuickview;
