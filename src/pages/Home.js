import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function Home() {
  return (
    <Grid container>
      <Grid item md={4}>
        <h1 aria-label="Hi, I'am Andrés Suárez, Full-Stack Developer">
          <span>Hi,</span>
          <span>{"I'am Andrés Suárez,"}</span>
          <span>Full-Stack Developer.</span>
        </h1>
        <h2>React/Node Developer</h2>
        <Button variant="outlined">Contact me!</Button>
      </Grid>
      <Grid item md={6}>
        Something awesome
      </Grid>
    </Grid>
  );
}
