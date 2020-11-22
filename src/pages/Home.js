import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Particles from "../components/particles/Particles";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";

export default function Home() {
  return (
    <Grid container>
      <Grid item md={5}>
        <Typist avgTypingDelay={120}>
          <h1 aria-label="Hi, I'am Andrés Suárez, Full-Stack Developer">
            <Typist.Delay ms={300} />
            <span>Hi,</span>
            <Typist.Delay ms={300} />
            <br />
            <span>{"I'm Andrés Suárez,"}</span>
            <br />
            <span>Full-Stack Developer.</span>
          </h1>
          <Typist.Delay ms={300} />
          <h2>React/Node Developer</h2>
        </Typist>
        <Button variant="outlined">Contact me!</Button>
      </Grid>
      <Grid item md={7}>
        <Particles />
      </Grid>
    </Grid>
  );
}
