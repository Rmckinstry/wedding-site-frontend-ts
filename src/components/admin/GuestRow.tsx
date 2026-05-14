import { Edit, Delete, Save, Close } from "@mui/icons-material";
import { TableRow, TableCell, Checkbox, TextField } from "@mui/material";
import { CustomResponseType, ErrorType, Guest } from "../../utility/types";
import { useEffect, useState } from "react";
import AlertDialog from "../utility/AlertDialog";
import { useMutation } from "@tanstack/react-query";

export interface GuestRowProps {
  guest: Guest;
  handleDataRefresh: () => void;
}

export type NewGuest = {
  plusOneAllowed: boolean;
  hasDependents: boolean;
  songRequests: number;
  afterParty: boolean;
};

const GuestRow = (props: GuestRowProps) => {
  const { guest, handleDataRefresh } = props;

  const [editable, setEditable] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tempGuest, setTempGuest] = useState<NewGuest>({
    plusOneAllowed: guest.plus_one_allowed || false,
    hasDependents: guest.has_dependents || false,
    songRequests: guest.song_requests || 0,
    afterParty: guest.after_party || false,
  });

  useEffect(() => {
    setTempGuest({
      plusOneAllowed: guest.plus_one_allowed,
      hasDependents: guest.has_dependents,
      songRequests: guest.song_requests,
      afterParty: guest.after_party,
    });
  }, [guest]);

  useEffect(() => {
    console.log(tempGuest);
  }, [tempGuest]);

  const resetTempGuest = () => {
    setTempGuest({
      plusOneAllowed: guest.plus_one_allowed,
      hasDependents: guest.has_dependents,
      songRequests: guest.song_requests,
      afterParty: guest.after_party,
    });
  };

  //#region Guest Delete
  const handleGuestDelete = (action: string) => {
    setDeleteDialogOpen(false);

    if (action === "confirm") {
      deleteGuestMutation.mutate();
    }
  };

  const deleteGuestMutation = useMutation<CustomResponseType, ErrorType>({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/guests/${guest.guest_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
      console.error("Error deleting Group:", error.message);
    },
  });
  //#endregion

  //#region Guest Save
  // Generic handler for all form fields
  const handleNewGuestInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = event.target;

    // For checkbox inputs, 'checked' property is on HTMLInputElement
    if (type === "checkbox") {
      const target = event.target as HTMLInputElement;
      setTempGuest((prevData) => ({
        ...prevData,
        [name]: target.checked,
      }));
    }
  };

  const handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTempGuest((prevData) => ({
      ...prevData,
      [name]: Number(value), // Ensure it's stored as a number
    }));
  };

  const handleGuestSave = () => {
    const guestPutBody = {
      name: guest.name,
      plusOneAllowed: tempGuest.plusOneAllowed,
      hasDependents: tempGuest.hasDependents,
      groupId: guest.group_id,
      addedByGuestId: guest.added_by_guest_id,
      additionalGuestType: guest.additional_guest_type,
      songRequests: tempGuest.songRequests,
      afterParty: tempGuest.afterParty,
    };
    editGuestsMutation.mutate({ body: guestPutBody });
  };

  const editGuestsMutation = useMutation<CustomResponseType, ErrorType, { body: any }>({
    mutationFn: async ({ body }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/guests/${guest.guest_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Now 'body' is defined
      });

      if (!response.ok) {
        const errorBody: ErrorType = await response.json();
        throw errorBody;
      }

      return response.json() as Promise<CustomResponseType>;
    },
    onSuccess: (data) => {
      handleDataRefresh();
      resetTempGuest();
      setEditable(false);
      console.log("Response from server:", data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
      console.error("Error updating Guest:", error.message);
    },
  });

  //#endregion

  return (
    <>
      {editGuestsMutation.isError ? (
        <span>There was an error updating the guest.</span>
      ) : (
        <TableRow key={guest.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row">
            {guest.name}
          </TableCell>
          <TableCell align="right">
            <Checkbox
              disabled={!editable}
              checked={tempGuest?.hasDependents}
              name="hasDependents"
              onChange={handleNewGuestInputChange}
            />
          </TableCell>
          <TableCell align="right">
            <Checkbox
              disabled={!editable}
              checked={tempGuest?.plusOneAllowed}
              name="plusOneAllowed"
              onChange={handleNewGuestInputChange}
            />
          </TableCell>
          <TableCell align="right">
            {editable ? (
              <TextField
                variant="outlined"
                name="songRequests" // Important for generic handler
                type="number"
                margin="dense"
                sx={{ width: "5rem" }}
                value={tempGuest?.songRequests}
                onChange={handleNumberInputChange}
              />
            ) : (
              <span>{guest.song_requests}</span>
            )}
          </TableCell>
          <TableCell align="right">
            <Checkbox
              disabled={!editable}
              checked={tempGuest?.afterParty}
              name="afterParty"
              onChange={handleNewGuestInputChange}
            />
          </TableCell>
          <TableCell align="right">
            <div>
              {editable ? (
                <button
                  className="btn-stripped icon"
                  onClick={() => {
                    setEditable(!editable);
                    resetTempGuest();
                  }}
                >
                  <Close />
                </button>
              ) : (
                <button
                  className="btn-stripped icon"
                  onClick={() => {
                    setEditable(!editable);
                  }}
                >
                  <Edit />
                </button>
              )}

              <button
                className="btn-stripped icon"
                onClick={() => {
                  setDeleteDialogOpen(true);
                }}
                disabled={deleteGuestMutation.isPending}
              >
                <Delete />
              </button>
              {editable && (
                <button
                  className="btn-stripped icon"
                  onClick={() => {
                    handleGuestSave();
                  }}
                >
                  <Save />
                </button>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}

      <AlertDialog
        open={deleteDialogOpen}
        onClose={handleGuestDelete}
        title={`Delete ${guest.name}?`}
        content="Warning: Deleting a guest also includes deleting any dependents/plus one's and alls RSVPs associated with the guest."
        confirmText="Delete"
      />
    </>
  );
};

export default GuestRow;
