import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export interface AlertDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  title: string;
  content: string;
  confirmText: string;
}
const AlertDialog = (props: AlertDialogProps) => {
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
        <button onClick={() => onClose("cancel")} autoFocus className="btn-rsvp-sm btn-alt">
          Cancel
        </button>
        <button onClick={() => onClose("confirm")} className="btn-rsvp-sm">
          {confirmText}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
