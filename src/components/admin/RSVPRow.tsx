import { TableCell, TableRow } from "@mui/material";
import { CustomResponseType, ErrorType, Guest, RSVP } from "../../utility/types";
import { useMutation } from "@tanstack/react-query";

export interface RSVPRowProps {
  rsvp?: RSVP;
  handleDataRefresh: () => void;
  status: string;
  guest: Guest;
}

const RSVPRow = (props: RSVPRowProps) => {
  const separator = "\u00A7";

  const { rsvp, handleDataRefresh, status, guest } = props;

  const handleAttendanceChange = (attendance: boolean) => {
    editAttendanceMutation.mutate({ attendance: attendance });
  };

  const editAttendanceMutation = useMutation<CustomResponseType, ErrorType, { attendance: any }>({
    mutationFn: async ({ attendance }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rsvps/attendance/${rsvp?.rsvp_id}`, {
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
          <TableCell align="right">
            <div className="flex-col-start" style={{ alignItems: "end" }}>
              {rsvp.spotify.split(separator).map((song) => (
                <div style={{ maxWidth: "250px" }}>{song}</div>
              ))}
            </div>
          </TableCell>
          <TableCell align="right" style={{ maxWidth: "250px" }}>
            <div>{rsvp.dietary_restrictions}</div>
          </TableCell>
          <TableCell align="right">{rsvp.updated_at ? rsvp.updated_at : rsvp.created_at}</TableCell>
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
          <TableCell align="right">{rsvp.updated_at ? rsvp.updated_at : rsvp.created_at}</TableCell>
          <TableCell align="right">
            <button
              className="rsvp-btn-accept"
              onClick={() => {
                handleAttendanceChange(true);
              }}
            >
              Mark as Attending
            </button>
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

export default RSVPRow;
