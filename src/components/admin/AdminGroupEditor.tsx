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

function AdminGroupEditor({ groupData, handleDataRefresh }: { groupData: Group[]; handleDataRefresh: () => void }) {
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
    <div id="admin-group-editor-container">
      <div className="box flex-col-start-sm border-box-100 admin-group-form-container">
        <p className="secondary-text font-sm-med">Groups</p>
        <div className="flex-col-start-sm border-box-100">
          {groupData.map((group) => {
            return (
              <div key={group.id} className="flex-row flex-row-gap border-box-100 admin-group-item">
                <p className="font-sm">{group.group_name}</p>
                <button
                  className="btn-stripped icon"
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
      </div>
      <div className="box flex-col-start-sm border-box-100 admin-group-form-container">
        <p className="secondary-text font-sm-med">Create Group</p>
        <TextField
          value={newGroupName}
          onChange={(e) => handleGroupNameChange(e.target.value)}
          label="Group Name"
          variant="outlined"
          fullWidth
        />
        <div className="btn-container">
          <button
            className="btn-rsvp-sm"
            disabled={addGroupMutation.isPending || !newGroupName}
            onClick={handleGroupAdd}
          >
            Add Group
          </button>
        </div>
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
