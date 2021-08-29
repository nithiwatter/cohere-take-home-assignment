import React from "react";
import { Box, IconButton, TextField, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  inputsContainer: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function EditableTransactionRecord({
  id,
  index,
  options,
  transactionRecord,
  handleEditTransactionRecord,
  handleDeleteTransactionRecord,
}) {
  const classes = useStyles();

  const getOptionLabel = (option) => option.name;

  const getOptionSelected = (option, value) => option.name === value.name;

  const handleChangeSender = (_, newValue) => {
    handleEditTransactionRecord({
      id,
      index,
      transactionRecord: {
        ...transactionRecord,
        sender: newValue,
      },
    });
  };

  const handleChangeReceiver = (_, newValue) => {
    handleEditTransactionRecord({
      id,
      index,
      transactionRecord: {
        ...transactionRecord,
        receiver: newValue,
      },
    });
  };

  const handleChangeAmount = (event) => {
    const newValue = parseFloat(event.target.value);
    if (newValue < 0) return;
    handleEditTransactionRecord({
      id,
      index,
      transactionRecord: {
        ...transactionRecord,
        amount: newValue,
      },
    });
  };

  const handleDelete = () => {
    handleDeleteTransactionRecord({ index });
  };

  return (
    <div className={classes.inputsContainer}>
      <Box mr={2}>
        <Autocomplete
          value={transactionRecord.sender}
          onChange={handleChangeSender}
          id={`sender-${id}`}
          options={options}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Sender" variant="outlined" />
          )}
        />
      </Box>

      <Box mr={2}>
        <Autocomplete
          value={transactionRecord.receiver}
          onChange={handleChangeReceiver}
          id={`receiver-${id}`}
          options={options}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Receiver" variant="outlined" />
          )}
        />
      </Box>

      <Box mr={2}>
        <TextField
          value={transactionRecord.amount}
          onChange={handleChangeAmount}
          label="Amount"
          type="Number"
          variant="outlined"
        />
      </Box>

      <div>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}
