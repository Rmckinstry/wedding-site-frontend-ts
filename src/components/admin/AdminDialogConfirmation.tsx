import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export interface AdminDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  title: string;
  content: string;
  confirmText: string;
}
const AdminDialogConfirmation = (props: AdminDialogProps) => {
  const { onClose, open, title, content, confirmText } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <button onClick={() => onClose("cancel")} autoFocus>
          Cancel
        </button>
        <button onClick={() => onClose("confirm")}>{confirmText}</button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDialogConfirmation;
