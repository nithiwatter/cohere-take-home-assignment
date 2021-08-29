import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

import EditableTransactionRecord from "./EditableTransactionRecord";
import ProcessedResults from "./ProcessedResults";
import AddNameDialog from "./AddNameDialog";

const defaultOptions = [
  { name: "Alice" },
  { name: "Bill" },
  { name: "Charles" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function MainContainer() {
  const [nameOptions, setNameOptions] = React.useState(defaultOptions);
  const [transactionRecords, setTransactionRecords] = React.useState([
    {
      id: uuidv4(),
      sender: { name: "Alice" },
      receiver: { name: "Bill" },
      amount: 10,
    },
    {
      id: uuidv4(),
      sender: { name: "Bill" },
      receiver: { name: "Alice" },
      amount: 1,
    },
    {
      id: uuidv4(),
      sender: { name: "Bill" },
      receiver: { name: "Charles" },
      amount: 5,
    },
    {
      id: uuidv4(),
      sender: { name: "Charles" },
      receiver: { name: "Alice" },
      amount: 5,
    },
  ]);
  const [showProcessedResults, setShowProcessedResults] = React.useState(false);
  const [processedResults, setProcessedResults] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleAddTransactionRecord = () => {
    setTransactionRecords([
      ...transactionRecords,
      { id: uuidv4(), sender: null, receiver: null, amount: 0 },
    ]);
  };

  const handleEditTransactionRecord = ({ index, transactionRecord }) => {
    const newTransactionRecords = [...transactionRecords];
    newTransactionRecords[index] = transactionRecord;
    setTransactionRecords(newTransactionRecords);
  };

  const handleDeleteTransactionRecord = ({ index }) => {
    const newTransactionRecords = [...transactionRecords];
    newTransactionRecords.splice(index, 1);
    setTransactionRecords(newTransactionRecords);
  };

  const handleProcessResults = () => {
    const netAmounts = {};
    const sortedNetAmounts = [];
    const newProcessedResults = [];

    transactionRecords.forEach((transactionRecord) => {
      if (!transactionRecord.sender || !transactionRecord.receiver) return;
      const sender = transactionRecord.sender.name;
      const receiver = transactionRecord.receiver.name;

      if (!netAmounts[sender]) {
        netAmounts[sender] = 0;
      }

      if (!netAmounts[receiver]) {
        netAmounts[receiver] = 0;
      }

      netAmounts[sender] -= transactionRecord.amount;
      netAmounts[receiver] += transactionRecord.amount;
    });

    console.log(netAmounts);

    for (const [key, value] of Object.entries(netAmounts)) {
      sortedNetAmounts.push({ name: key, netAmount: value });
    }

    if (sortedNetAmounts.length === 0) {
      setShowProcessedResults(true);
      setProcessedResults([]);
      return;
    }

    sortedNetAmounts.sort((firstEl, secondEl) => {
      if (firstEl.netAmount > secondEl.netAmount) {
        return -1;
      } else if (firstEl.netAmount < secondEl.netAmount) {
        return 1;
      }
      return 0;
    });

    let maxCreditIndex = 0;
    let maxDebitIndex = sortedNetAmounts.length - 1;

    while (maxCreditIndex <= maxDebitIndex) {
      if (
        sortedNetAmounts[maxCreditIndex].netAmount === 0 ||
        sortedNetAmounts[maxDebitIndex].netAmount === 0
      ) {
        break;
      }

      const amountToBePaid = Math.min(
        sortedNetAmounts[maxCreditIndex].netAmount,
        -sortedNetAmounts[maxDebitIndex].netAmount
      );

      sortedNetAmounts[maxCreditIndex].netAmount -= amountToBePaid;
      sortedNetAmounts[maxDebitIndex].netAmount += amountToBePaid;

      newProcessedResults.push({
        debiter: sortedNetAmounts[maxDebitIndex].name,
        crediter: sortedNetAmounts[maxCreditIndex].name,
        amount: amountToBePaid,
      });

      console.log(
        `${sortedNetAmounts[maxDebitIndex].name} pays ${sortedNetAmounts[maxCreditIndex].name} ${amountToBePaid}$`
      );

      if (sortedNetAmounts[maxCreditIndex].netAmount === 0) {
        maxCreditIndex += 1;
      }

      if (sortedNetAmounts[maxDebitIndex].netAmount === 0) {
        maxDebitIndex -= 1;
      }
    }

    setShowProcessedResults(true);
    setProcessedResults(newProcessedResults);
  };

  const handleReset = () => {
    setShowProcessedResults(false);
    setProcessedResults([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddName = (name) => {
    let isThereDuplicate = false;

    nameOptions.forEach((option) => {
      if (option.name === name) {
        isThereDuplicate = true;
      }
    });

    if (isThereDuplicate) {
      setOpen(false);
      return;
    }

    const newNameOptions = [...nameOptions, { name }];
    newNameOptions.sort((firstEl, secondEl) => {
      if (firstEl.name < secondEl.name) {
        return -1;
      } else if (firstEl.name > secondEl.name) {
        return 1;
      }
      return 0;
    });
    setNameOptions(newNameOptions);
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h3" align="center">
          Cohere Take Home Assignment
        </Typography>
        <Box display="flex" justifyContent="center" m={2}>
          <Box>
            <Button variant="contained" onClick={handleAddTransactionRecord}>
              Add a new transaction
            </Button>
          </Box>
          <Box ml={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Add a new person
            </Button>
          </Box>
        </Box>
        {transactionRecords.length !== 0 && (
          <Box m={2}>
            {transactionRecords.map((transactionRecord, i) => (
              <EditableTransactionRecord
                key={transactionRecord.id}
                id={transactionRecord.id}
                index={i}
                options={nameOptions}
                transactionRecord={transactionRecord}
                handleEditTransactionRecord={handleEditTransactionRecord}
                handleDeleteTransactionRecord={handleDeleteTransactionRecord}
              />
            ))}
          </Box>
        )}
        <Box display="flex" alignItems="center" justifyContent="center" m={2}>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProcessResults}
            >
              Process results
            </Button>
          </div>

          {showProcessedResults && (
            <Box ml={2}>
              <IconButton onClick={handleReset}>
                <RefreshIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {showProcessedResults && (
          <Box m={2}>
            <ProcessedResults processedResults={processedResults} />
          </Box>
        )}
      </div>
      <AddNameDialog
        open={open}
        handleAddName={handleAddName}
        handleClose={handleClose}
      />
    </>
  );
}
