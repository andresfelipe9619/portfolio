import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Particles from "../components/particles/Particles";
import Title from "../components/text/Title";
import { i18n } from "@lingui/core";

export default function About() {
  return (
    <Grid container>
      <Grid item md={5}>
        <Title>{i18n._("aboutTitle")}</Title>
        <Typography paragraph variant="h6" component="p">
          Professionally connected with the web development industry and
          information technology for many years.
        </Typography>
        <Typography paragraph variant="h6" component="p">
          Well-organised person, problem solver, independent employee with high
          attention to detail. Fan of MMA, outdoor activities, TV series and,
          recently, English literature. A family person, father of two fractious
          boys, therefore remote employment is preferred.
        </Typography>
        <Typography paragraph variant="h6" component="p">
          Interested in the entire frontend spectrum and working on ambitious
          projects with positive people.
        </Typography>
      </Grid>
      <Grid item md={7}>
        <Particles />
      </Grid>
    </Grid>
  );
}
