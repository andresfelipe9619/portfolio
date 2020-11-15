import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Map from "../components/map/Map";
import { makeStyles } from "@material-ui/core/styles";

export default function Contact() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item md={5}>
        <Typography component="h1" variant="h3" paragraph>
          Contact me
        </Typography>
        <Typography paragraph>
          I am interested in freelance opportunities – especially ambitious or
          large projects. However, if you have other request or question, don’t
          hesitate to contact me using below form either.
        </Typography>
      </Grid>
      <Grid item md={7}>
        <Map />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  root: { height: "100%", width: "100%" },
}));
