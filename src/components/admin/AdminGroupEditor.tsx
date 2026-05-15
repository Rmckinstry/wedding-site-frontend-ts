import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomResponseType, ErrorType, Group, Guest } from "../../utility/types";
import { useMutation } from "@tanstack/react-query";
import { Delete } from "@mui/icons-material";
import AlertDialog from "../utility/AlertDialog";

function AdminGroupEditor({ groupData, handleDataRefresh }: { groupData: Group[]; handleDataRefresh: () => void }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);
  const [newGroupName, setNewGroupName] = useState<string>("");

  useEffect(() => {
    // This runs only once when the component mounts
    console.log("AdminGroupEditor mounted");

    return () => {
      // This runs only once when the component unmounts
      console.log("AdminGroupEditor unmounted");
    };
  }, []);

  const handleGroupNameChange = (name: string) => {
    setNewGroupName(name);
  };

  //#region Add Group
  const handleGroupAdd = () => {
    addGroupMutation.mutate();
  };

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
  //#endregion

  //#region Delete Group
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
  //#endregion

  return (
    <div id="admin-group-editor-container">
      <div className="box flex-col-start-sm border-box-100 admin-group-form-container">
        <p className="font-sm-med strong-text admin-header">Groups</p>
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
      <div className="box flex-col-start border-box-100 admin-group-form-container">
        <p className="font-sm-med strong-text admin-header">Create Group</p>
        <div className="flex-col-start-sm">
          <span className="secondary-text">Group Name</span>
          <TextField
            value={newGroupName}
            onChange={(e) => handleGroupNameChange(e.target.value)}
            placeholder="e.g Smith Family"
            variant="outlined"
            fullWidth
          />
          <div className="btn-container" style={{ width: "100%" }}>
            <button
              className="btn-rsvp-sm"
              disabled={addGroupMutation.isPending || !newGroupName}
              onClick={handleGroupAdd}
              style={{ width: "100%" }}
            >
              Add Group
            </button>
          </div>
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
