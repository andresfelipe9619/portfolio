import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import Particles from "../components/particles/Particles";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
// import Icon from "@material-ui/core/Icon";

function Home() {
  const [t] = useTranslation();
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={5}>
        <Typography
          variant="h2"
          component="h1"
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
            <Text>Full-Stack {t("dev")}.</Text>
          </Typist>
        </Typography>
        {/* <Technologies /> */}
      </Grid>
      <Grid item md={7}>
        <Particles />
      </Grid>
    </Grid>
  );
}

// const Technologies = () => (
//   <>
//     <Box display="flex" mt={2}>
//       <Icon className="fab fa-js" color="primary" fontSize="large" />
//       <Icon className="fab fa-react" color="primary" fontSize="large" />
//       <Icon className="fab fa-html5" color="primary" fontSize="large" />
//       <Icon className="fab fa-css3-alt" color="primary" fontSize="large" />
//     </Box>
//     <Box display="flex" mt={2}>
//       <Icon className="fab fa-aws" color="primary" fontSize="large" />
//       <Icon className="fab fa-node-js" color="primary" fontSize="large" />
//       <Icon className="fab fa-git-alt" color="primary" fontSize="large" />
//       <Icon className="fab fa-github" color="primary" fontSize="large" />
//     </Box>
//     <Box display="flex" mt={2}>
//       <Icon className="fab fa-apple" color="primary" fontSize="large" />
//       <Icon className="fab fa-linux" color="primary" fontSize="large" />
//       <Icon className="fab fa-windows" color="primary" fontSize="large" />
//     </Box>
//   </>
// );

const Text = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.word}>{children}</span>;
};

const useStyles = makeStyles((theme) => ({
  typist: {
    color: theme.palette.primary.main,
    fontWeight: 900,
    userSelect: "none",
  },
  word: {
    margin: [[0, 4]],
    color: theme.palette.text.primary,
  },
}));

export default Home;
