/* eslint-disable array-callback-return */
import { TextField } from "@mui/material";
import { CustomResponseType, ErrorType, Guest, RSVP } from "../../../utility/types.ts";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Error from "../../utility/Error.tsx";
import Loading from "../../utility/Loading.tsx";

import Success from "../../utility/Success.tsx";
const DietForm = ({ guest, rsvp, handleDataRefresh }: { guest: Guest; rsvp: RSVP; handleDataRefresh: () => void }) => {
  const [restrictions, setRestrictions] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    handleDietChange(guest.guest_id, rsvp.dietary_restrictions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guest, rsvp]);

  const handleDietChange = (guestId: number, restriction: string) => {
    setRestrictions((prevRestrictions) => ({
      ...prevRestrictions,
      [guestId]: restriction,
    }));
  };

  const handleRestrictionSubmit = async (restriction: string | null) => {
    dietSubmitMutation.mutate({ restriction: restriction, rsvpId: rsvp.rsvp_id });
  };

  const dietSubmitMutation = useMutation<CustomResponseType, ErrorType, { restriction: string | null; rsvpId: number }>(
    {
      mutationFn: async ({ restriction, rsvpId }) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/rsvps/diet/${rsvpId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dietaryRestriction: restriction }),
        });

        if (!response.ok) {
          const errorBody: ErrorType = await response.json();
          throw errorBody;
        }

        return response.json() as Promise<CustomResponseType>;
      },
      onSuccess: (data) => {
        console.log("Response from server:", data);
        // handleDataRefresh();
      },
      onError: (error: ErrorType) => {
        console.log(error);
        console.error("Error editing diet restriction:", error.message);
      },
    },
  );

  // #region diet template
  return (
    <>
      {dietSubmitMutation.isPending || dietSubmitMutation.isError || dietSubmitMutation.isSuccess ? (
        <div className="state-container">
          {dietSubmitMutation.isPending && <Loading loadingText={"Saving diet restriction. Please Wait..."} />}
          {dietSubmitMutation.isError && (
            <Error errorInfo={dietSubmitMutation.error} tryEnabled={true} handleRetry={dietSubmitMutation.reset} />
          )}
          {dietSubmitMutation.isSuccess && (
            <Success
              message={"Your diet restriction was successfully updated!"}
              btnMessage={"Okay"}
              handleAction={() => {
                handleDataRefresh();
                dietSubmitMutation.reset();
              }}
            />
          )}
        </div>
      ) : (
        <div className="guest-status-container flex-col flex-col-lg">
          <div className="flex-col-start">
            <p className="font-sm">{guest.name}'s Dietary Restrictions</p>
            <TextField
              value={restrictions[guest.guest_id] || ""}
              onChange={(e) => handleDietChange(guest.guest_id, e.target.value)}
              label="Dietary Restriction"
              variant="standard"
              fullWidth
            />
            <div className="btn-container">
              <button
                onClick={() => {
                  handleRestrictionSubmit("");
                }}
                className="btn-rsvp-sm btn-alt"
              >
                Remove Restriction
              </button>
              <button
                onClick={() => {
                  handleRestrictionSubmit(restrictions[guest.guest_id]);
                }}
                disabled={dietSubmitMutation.isPending}
                className="btn-rsvp-sm"
              >
                Submit Restriction
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DietForm;
