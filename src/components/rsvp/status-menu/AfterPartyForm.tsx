import { useEffect, useState } from "react";
import { CustomResponseType, ErrorType, Guest, RSVP } from "../../../utility/types";
import { FormControl, FormLabel, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../utility/Loading";
import Success from "../../utility/Success";
import Error from "../../utility/Error";

const AfterPartyForm = ({
  guest,
  rsvp,
  handleDataRefresh,
}: {
  guest: Guest;
  rsvp: RSVP;
  handleDataRefresh: () => void;
}) => {
  const [attendance, setAttendance] = useState<boolean>();

  useEffect(() => {
    setAttendance(rsvp.after_party_attending);
  }, [guest, rsvp]);

  const handleToggleChange = (event: any, newToggleValue: string | null) => {
    if (newToggleValue !== null) {
      setAttendance(newToggleValue === "accept" ? true : false);

      handleAttendanceSubmit(newToggleValue === "accept" ? true : false);
    }
  };

  const handleAttendanceSubmit = async (attendance: boolean) => {
    partyAttendanceMutation.mutate({ attendance: attendance, rsvpId: rsvp.rsvp_id });
  };

  const partyAttendanceMutation = useMutation<CustomResponseType, ErrorType, { attendance: boolean; rsvpId: number }>({
    mutationFn: async ({ attendance, rsvpId }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rsvps/party/${rsvpId}`, {
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
      console.log("Response from server:", data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
      console.error("Error editing after party attendance:", error.message);
    },
  });
  return (
    <>
      {partyAttendanceMutation.isPending || partyAttendanceMutation.isError || partyAttendanceMutation.isSuccess ? (
        <div className="state-container">
          {partyAttendanceMutation.isPending && (
            <Loading loadingText={"Saving after party attendance. Please Wait..."} />
          )}
          {partyAttendanceMutation.isError && (
            <Error
              errorInfo={partyAttendanceMutation.error}
              tryEnabled={true}
              handleRetry={partyAttendanceMutation.reset}
            />
          )}
          {partyAttendanceMutation.isSuccess && (
            <Success
              message={`${guest.name}'s attendance was successfully updated!`}
              btnMessage={"Okay"}
              handleAction={() => {
                handleDataRefresh();
                partyAttendanceMutation.reset();
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex-col flex-col-lg">
          <FormControl component="fieldset" fullWidth>
            <div className="rsvp-form-action-container" style={{ gap: "1rem" }}>
              <FormLabel component="legend">{guest.name}:</FormLabel>
              <ToggleButtonGroup
                sx={{
                  display: "flex",
                  gap: "2rem",
                }}
                value={attendance}
                exclusive
                onChange={handleToggleChange}
                aria-label={`RSVP for after party for ${guest?.name}`}
                color="primary"
              >
                <ToggleButton
                  sx={{ width: "10rem", height: "2.5rem" }}
                  value="accept"
                  aria-label="Accept Invitation"
                  selected={attendance}
                >
                  {attendance === true ? "Accepted" : "Accept"}
                </ToggleButton>
                <ToggleButton
                  sx={{ width: "10rem", height: "2.5rem" }}
                  value="decline"
                  aria-label="Decline Invitation"
                  selected={!attendance}
                >
                  {attendance === false ? "Declined" : "Decline"}
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </FormControl>
        </div>
      )}
    </>
  );
};

export default AfterPartyForm;
