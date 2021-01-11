import React from "react";
import Title from "../components/text/Title";
import { i18n } from "@lingui/core";
import Grid from "@material-ui/core/Grid";
import Work from "../components/work/Work";

export default function MyWork() {
  return (
    <Grid container>
      <Grid item md={12}>
        <Title>{i18n._("workTitle")}</Title>
        <Work />
      </Grid>
    </Grid>
  );
}
