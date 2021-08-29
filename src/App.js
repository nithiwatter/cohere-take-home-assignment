import { CssBaseline, makeStyles } from "@material-ui/core";

import MainContainer from "./MainContainer";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <MainContainer />
      </div>
    </>
  );
}

export default App;
