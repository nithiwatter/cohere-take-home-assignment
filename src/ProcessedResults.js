import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  resultsContainer: {
    backgroundColor: theme.palette.common.white,
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
  },
}));

export default function ProcessedResults({ processedResults }) {
  const classes = useStyles();

  return (
    <Box className={classes.resultsContainer} p={2}>
      <Typography variant="h6" align="center">
        Results
      </Typography>

      <Box mt={2}>
        <div>
          {processedResults.map((processedResult) => {
            const textValue = `${processedResult.debiter} pays ${processedResult.crediter} ${processedResult.amount}$`;

            return (
              <Box key={textValue} mb={1}>
                <Typography variant="body1" align="center">
                  {textValue}
                </Typography>
              </Box>
            );
          })}
        </div>
      </Box>
    </Box>
  );
}
