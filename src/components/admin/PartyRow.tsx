import { TableCell, TableRow } from "@mui/material";
import { CustomResponseType, ErrorType, Guest, RSVP } from "../../utility/types";
import { useMutation } from "@tanstack/react-query";
import { convertUtcToCst } from "../../utility/util";

export interface PartyRowProps {
  rsvp?: RSVP;
  handleDataRefresh: () => void;
  status: string;
  guest: Guest;
}

const PartyRow = (props: PartyRowProps) => {
  const { rsvp, handleDataRefresh, status, guest } = props;

  const handleAttendanceChange = (attendance: boolean) => {
    editPartyAttendanceMutation.mutate({ attendance: attendance });
  };

  const editPartyAttendanceMutation = useMutation<CustomResponseType, ErrorType, { attendance: any }>({
    mutationFn: async ({ attendance }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rsvps/party/${rsvp?.rsvp_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance: attendance }),
      });

      if (!response.ok) {
        const errorBody: ErrorType = await response.json();
        throw errorBody;
      }

      return response.json() as Promise<CustomResponseType>;
    },
    onSuccess: (data) => {
      handleDataRefresh();
      console.log("Response from server:", data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
      console.error("Error updating Guest:", error.message);
    },
  });
  return (
    <>
      {status === "accepted" && rsvp && (
        <TableRow key={rsvp.guest_id}>
          <TableCell>{guest.name}</TableCell>
          <TableCell align="right">{convertUtcToCst(rsvp.updated_at ? rsvp.updated_at : rsvp.created_at)}</TableCell>
          <TableCell align="right">
            <button
              className="rsvp-btn-decline"
              onClick={() => {
                handleAttendanceChange(false);
              }}
            >
              Mark as Declined
            </button>
          </TableCell>
        </TableRow>
      )}
      {status === "declined" && rsvp && (
        <TableRow key={rsvp.guest_id}>
          <TableCell>{guest.name}</TableCell>
          <TableCell align="right">{convertUtcToCst(rsvp.updated_at ? rsvp.updated_at : rsvp.created_at)}</TableCell>
          <TableCell align="right">
            {!rsvp.attendance ? (
              <span className="secondary-text">Guest declined wedding invite</span>
            ) : (
              <button
                className="rsvp-btn-accept"
                onClick={() => {
                  handleAttendanceChange(true);
                }}
              >
                Mark as Attending
              </button>
            )}
          </TableCell>
        </TableRow>
      )}
      {status === "not responded" && (
        <TableRow key={guest.guest_id}>
          <TableCell>{guest.name}</TableCell>
        </TableRow>
      )}
    </>
  );
};

export default PartyRow;
