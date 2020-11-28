import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Particles from "../components/particles/Particles";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation, Trans } from "react-i18next";

function Home() {
  const [t] = useTranslation();
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={5}>
        <h1
          aria-label="Hi, I'am Andrés Suárez, Full-Stack Developer"
          className={classes.typist}
        >
          <Typist avgTypingDelay={120}>
            <Typist.Delay ms={300} />
            <Text>{t("hi")}, </Text>
            <Typist.Delay ms={300} />
            <br />
            <Text>{t("iam")} Andrés Suárez</Text>
            <br />
            <Text>Full-Stack Developer.</Text>
          </Typist>
        </h1>
        {/* <Typist.Delay ms={300} /> */}
        {/* <h2>React/Node Developer</h2> */}
        <Button variant="outlined" color="primary">
          Contact me!
        </Button>
      </Grid>
      <Grid item md={7}>
        <Particles />
      </Grid>
    </Grid>
  );
}

const Text = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.word}>{children}</span>;
};

const useStyles = makeStyles((theme) => ({
  typist: {
    color: theme.palette.primary.main,
  },
  word: {
    margin: [[0, 4]],
    color: theme.palette.common.white,
  },
}));

export default Home;
