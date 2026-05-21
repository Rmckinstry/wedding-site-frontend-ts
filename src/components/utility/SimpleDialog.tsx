import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export interface SimpleDialgProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  confirmText: string;
}

const SimpleDialog = (props: SimpleDialgProps) => {
  const { open, onClose, title, content, confirmText } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          onClick={onClose}
          className="btn-rsvp-sm"
          style={{ backgroundColor: "var(--base-background)", color: "var(--default-text)" }}
        >
          {confirmText}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
