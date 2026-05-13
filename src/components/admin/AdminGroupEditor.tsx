import { TextField } from "@mui/material";
import React, { useState } from "react";
import { CustomResponseType, ErrorType, Group, Guest } from "../../utility/types";
import { useMutation } from "@tanstack/react-query";
import { Delete } from "@mui/icons-material";
import AlertDialog from "../utility/AlertDialog";

export type NewGuest = {
  name: string;
  email: null;
  plusOneAllowed: boolean;
  hasDependents: boolean;
  groupId: number;
  songRequests: number;
};

function AdminGroupEditor({
  groupData,
  handleDataRefresh,
  handleMenuClick,
}: {
  groupData: Group[];
  handleDataRefresh: () => void;
  handleMenuClick: () => void;
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const [newGroupName, setNewGroupName] = useState<string | null>(null);

  const handleGroupAdd = () => {
    addGroupMutation.mutate();
  };

  const handleGroupDelete = (group: Group) => {
    setGroupToDelete(group);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = (action: string) => {
    if (action === "confirm" && groupToDelete !== null) {
      deleteGroupMutation.mutate();
    }
    setDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  const handleGroupNameChange = (name: string) => {
    setNewGroupName(name);
  };

  const deleteGroupMutation = useMutation<CustomResponseType, ErrorType>({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/groups/${groupToDelete?.id}`, {
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

  const addGroupMutation = useMutation<CustomResponseType, ErrorType>({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newGroupName }),
      });

      if (!response.ok) {
        const errorBody: ErrorType = await response.json();
        throw errorBody;
      }

      return response.json() as Promise<CustomResponseType>;
    },
    onSuccess: (data) => {
      handleDataRefresh();
      setNewGroupName("");
      console.log("Response from server:", data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
      console.error("Error adding Guest:", error.message);
    },
  });
  return (
    <div id="admin-group-editor" className="flex-col flex-col-lg">
      <p className="font-sm-med strong underline">Group Editor</p>
      <div id="admin-group-editor-container">
        <div id="admin-group-list" className="admin-group-editor-item">
          <p className="font-med strong underline contain-text-center">Groups:</p>
          {groupData.map((group) => {
            return (
              <div key={group.id} className="flex-row">
                <p>{group.group_name}</p>
                <button
                  className="btn-stripped"
                  onClick={() => {
                    handleGroupDelete(group);
                  }}
                >
                  <Delete />
                </button>
              </div>
            );
          })}
        </div>
        <div id="admin-group-editor-guest-add" className="flex-col-start admin-group-editor-item">
          <p className="font-med strong underline contain-text-center">Add Group</p>
          <div>
            <p className="font-sm">New Group Name</p>
            <TextField
              value={newGroupName}
              onChange={(e) => handleGroupNameChange(e.target.value)}
              label="Enter Group Name"
              variant="standard"
              fullWidth
            />
          </div>
          <div className="btn-container">
            <button disabled={addGroupMutation.isPending || !newGroupName} onClick={handleGroupAdd}>
              Add Group
            </button>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn-rsvp" onClick={handleMenuClick}>
          Admin Menu
        </button>{" "}
      </div>
      <AlertDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        title={`Delete ${groupToDelete?.group_name}'s Group?`}
        content="Warning: Deleting a group also includes deleting all guests and RSVPs associated with the group."
        confirmText="Delete"
      />
    </div>
  );
}

export default AdminGroupEditor;
