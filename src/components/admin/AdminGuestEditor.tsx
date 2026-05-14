import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomResponseType, ErrorType, Group, Guest } from "../../utility/types";
import { useMutation } from "@tanstack/react-query";
import GuestRow from "./GuestRow";

export type NewGuest = {
  name: string;
  email: null;
  plusOneAllowed: boolean;
  hasDependents: boolean;
  groupId: number;
  songRequests: number;
  afterParty: boolean;
};

function AdminGuestEditor({
  groupData,
  guestData,
  handleDataRefresh,
}: {
  groupData: Group[];
  guestData: Guest[];
  handleDataRefresh: () => void;
}) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedGuests, setSelectedGuests] = useState<Guest[] | null>(null);

  useEffect(() => {
    // This runs only once when the component mounts
    console.log("AdminGuestEditor mounted");

    return () => {
      // This runs only once when the component unmounts
      console.log("AdminGuestEditor unmounted");
    };
  }, []);

  const initialNewGuestState: NewGuest = {
    name: "",
    email: null,
    plusOneAllowed: false,
    hasDependents: false,
    groupId: selectedGroup?.id || 0,
    songRequests: 1,
    afterParty: false,
  };
  const [newGuestData, setNewGuestData] = useState<NewGuest>(initialNewGuestState);

  useEffect(() => {
    setNewGuestData(initialNewGuestState);

    if (selectedGroup) {
      const newGuests = guestData.filter((guest) => {
        return guest.group_id === selectedGroup.id;
      });

      if (newGuests) setSelectedGuests(newGuests);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, guestData, groupData]);

  const handleGroupChange = (event: any) => {
    // Find the selected group object from the fetched data
    const selectedGroupByName = groupData.find((group) => group.group_name === event.target.value);
    if (selectedGroupByName) setSelectedGroup(selectedGroupByName);
  };

  // #region New Guest
  // Generic handler for all form fields
  const handleNewGuestInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;

    // For checkbox inputs, 'checked' property is on HTMLInputElement
    if (type === "checkbox") {
      const target = event.target as HTMLInputElement;
      setNewGuestData((prevData) => ({
        ...prevData,
        [name]: target.checked,
      }));
    } else {
      setNewGuestData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handler for number inputs specifically (e.g., song_requests)
  const handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewGuestData((prevData) => ({
      ...prevData,
      [name]: Number(value), // Ensure it's stored as a number
    }));
  };

  const handleGuestAdd = () => {
    addGuestsMutation.mutate();
  };

  const addGuestsMutation = useMutation<CustomResponseType, ErrorType>({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuestData),
      });

      if (!response.ok) {
        const errorBody: ErrorType = await response.json();
        throw errorBody;
      }

      return response.json() as Promise<CustomResponseType>;
    },
    onSuccess: (data) => {
      handleDataRefresh();
      setNewGuestData(initialNewGuestState);
      console.log("Response from server:", data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
      console.error("Error adding Guest:", error.message);
    },
  });
  //#endregion

  return (
    <div id="admin-group-editor" className="flex-col flex-col-lg">
      <div id="admin-groups-select-container" className="box border-box-100" style={{ padding: "1rem 2rem" }}>
        <FormControl className="border-box-100">
          <InputLabel id="group-select-label">Select Group</InputLabel>
          <Select
            labelId="group-select-label"
            id="group-select"
            value={selectedGroup?.group_name || ""}
            label="Groups"
            onChange={handleGroupChange}
            fullWidth
          >
            {/* Map over the fetched groups to create MenuItem components */}
            {groupData.map((group) => (
              <MenuItem key={group.id} value={group.group_name}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {selectedGroup !== null ? (
        <>
          <div className="box border-box-100">
            <p className="secondary-text font-sm-med">Edit Guests in Group</p>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Dependents Allowed</TableCell>
                    <TableCell align="right">Plus One Allowed</TableCell>
                    <TableCell align="right">Song Requests</TableCell>
                    <TableCell align="right">Afterparty</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedGuests &&
                    selectedGuests.map((guest) => <GuestRow guest={guest} handleDataRefresh={handleDataRefresh} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="box border-box-100">
            <p className="secondary-text font-sm-med">Add Guest to Group</p>
            <FormGroup>
              <TextField
                label="Guest Name"
                variant="outlined"
                name="name" // Important for generic handler
                value={newGuestData.name}
                onChange={handleNewGuestInputChange}
                size="small"
                fullWidth
                margin="dense"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newGuestData.hasDependents}
                    onChange={handleNewGuestInputChange}
                    name="hasDependents" // Important for generic handler
                  />
                }
                label="Has Dependents"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newGuestData.plusOneAllowed}
                    onChange={handleNewGuestInputChange}
                    name="plusOneAllowed" // Important for generic handler
                  />
                }
                label="Plus One Allowed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newGuestData.afterParty}
                    onChange={handleNewGuestInputChange}
                    name="afterParty" // Important for generic handler
                  />
                }
                label="After Party"
              />
              <TextField
                label="Song Requests"
                variant="outlined"
                name="songRequests" // Important for generic handler
                value={newGuestData.songRequests}
                onChange={handleNumberInputChange} // Use specific handler for numbers
                type="number" // Only allow number input
                size="small"
                margin="dense"
                sx={{ width: "10rem" }}
              />
            </FormGroup>
            <Button
              disabled={addGuestsMutation.isPending || newGuestData.name === ""}
              variant="contained"
              onClick={handleGuestAdd}
              sx={{ marginTop: 2 }}
            >
              Add Guest
            </Button>
          </div>
        </>
      ) : (
        <p className="contain-text-center strong font-sm">Select Group Name to edit group</p>
      )}
    </div>
  );
}

export default AdminGuestEditor;
