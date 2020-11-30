import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Title({ children }) {
  const classes = useStyles();
  return (
    <Typography
      variant="h2"
      component="h1"
      color="primary"
      className={classes.root}
      paragraph
    >
      {children}
    </Typography>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    fontWeight: 900,
  },
}));
