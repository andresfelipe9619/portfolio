import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Particles from "../components/particles/Particles";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import { makeStyles } from "@material-ui/core/styles";
import { i18n } from "@lingui/core";
import Icon from "@material-ui/core/Icon";
import { motion } from "framer-motion";

function Home() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={12}>
        <Particles />
        <Typography
          variant="h3"
          component="h1"
          aria-label="Hi, I'am Andrés Suárez, Full-Stack Developer"
          className={classes.typist}
        >
          <Typist avgTypingDelay={120}>
            <Typist.Delay ms={300} />
            <Text>{i18n._("hi")}, </Text>
            <Typist.Delay ms={300} />
            <br />
            <Text>{i18n._("iam")} Andrés Suárez</Text>
            <br />
            <Text>{i18n._("dev")}.</Text>
          </Typist>
        </Typography>
        <Technologies classes={classes} />
      </Grid>
    </Grid>
  );
}

const Technologies = ({ classes }) => (
  <div className={classes.tech}>
    <Box display="flex" mt={2} justifyContent="space-around">
      <AnimatedIcon icon="fa-js" />
      <AnimatedIcon icon="fa-react" />
      <AnimatedIcon icon="fa-html5" />
      <AnimatedIcon icon="fa-figma" />
      <AnimatedIcon icon="fa-css3-alt" />
      <AnimatedIcon icon="fa-sass" />
    </Box>
    <Box display="flex" mt={2} justifyContent="space-around">
      <AnimatedIcon icon="fa-aws" />
      <AnimatedIcon icon="fa-yarn" />
      <AnimatedIcon icon="fa-npm" />
      <AnimatedIcon icon="fa-node-js" />
      <AnimatedIcon icon="fa-git-alt" />
      <AnimatedIcon icon="fa-github" />
      <AnimatedIcon icon="fa-bitbucket" />
    </Box>
    <Box display="flex" mt={2} justifyContent="space-around">
      <AnimatedIcon icon="fa-docker" />
      <AnimatedIcon icon="fa-apple" />
      <AnimatedIcon icon="fa-android" />
      <AnimatedIcon icon="fa-linux" />
      <AnimatedIcon icon="fa-windows" />
    </Box>
  </div>
);

const variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: (i) => ({
    opacity: 0,
    y: 100,
    transition: {
      delay: i * 0.8,
      duration: i + 6,
      loop: Infinity,
      ease: "linear",
    },
  }),
};

function getRandomArbitrary(min = 1, max = 10) {
  return Math.random() * (max - min) + min;
}

const AnimatedIcon = ({ icon }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      boxShadow={10}
      component={motion.div}
      custom={getRandomArbitrary()}
      initial="visible"
      animate="hidden"
      variants={variants}
      className={classes.icon}
    >
      <Icon className={`fab ${icon}`} color="secondary" fontSize="small" />
    </Box>
  );
};

const Text = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.word}>{children}</span>;
};

const useStyles = makeStyles((theme) => ({
  typist: {
    color: theme.palette.primary.main,
    fontWeight: 900,
    userSelect: "none",
    position: "absolute",
    top: "20%",
  },
  tech: {
    position: "absolute",
    bottom: "20%",
    zIndex: -10,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  icon: {
    borderRadius: "50%",
    backgroundColor: theme.palette.text.primary,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  word: {
    margin: [[0, 4]],
    color: theme.palette.text.primary,
  },
}));

export default Home;
