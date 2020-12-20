import React from "react";
import SkillsChart from "../components/skills/Skills";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Title from "../components/text/Title";
import { i18n } from "@lingui/core";
import { Typography } from "@material-ui/core";

export default function Skills() {
  return (
    <Grid container spacing={2} component={Box} height="100%">
      <Grid item md={5}>
        <Title>{i18n._("skillsTitle")}</Title>
        <Typography paragraph>
          The main area of expertise is front end development
        </Typography>
        <Typography paragraph>
          HTML, CSS, JS (TypeScript), building small and medium web apps with
          Angular 2+, custom plugins, features, animations, and coding
          interactive layouts.
        </Typography>
        <Typography paragraph>
          I have also full-stack developer experience with open source CMS like
          (WordPress, Drupal, Magento, Keystone.js and other).
        </Typography>
        <Typography>
          Visit my LinkedIn profile for more details or just contact.
        </Typography>
      </Grid>
      <Grid item md={7} component={Box} maxHeight="80%">
        <SkillsChart />
      </Grid>
    </Grid>
  );
}
