import React from "react";
import SkillsChart from "../components/skills/Skills";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Title from "../components/text/Title";

export default function Skills() {
  return (
    <Grid container spacing={2} component={Box} height="100%">
      <Grid item md={5}>
        <Title>Skills & Experience</Title>
      </Grid>
      <Grid item md={7} component={Box} maxHeight="80%">
        <SkillsChart />
      </Grid>
    </Grid>
  );
}
