import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export default function AddNameDialog({ open, handleAddName, handleClose }) {
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleDone = () => {
    if (name) {
      handleAddName(name);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a new name to be used as either a sender or a receiver.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDone} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
