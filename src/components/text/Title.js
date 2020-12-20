import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Typist from "react-typist";

export default function Title({ children }) {
  const classes = useStyles();
  return (
    <Typography
      variant="h3"
      component="h1"
      color="primary"
      className={classes.root}
      paragraph
    >
      <Typist avgTypingDelay={120}>{children}</Typist>
    </Typography>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    fontWeight: 900,
    userSelect: "none",
  },
}));
