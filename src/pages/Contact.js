import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Map from "../components/map/Map";
import Title from "../components/text/Title";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import { i18n } from "@lingui/core";

export default function Contact() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid container item md={5}>
        <Title>{i18n._("contactTitle")}</Title>
        <Typography variant="h6" component="p">
          I am interested in freelance opportunities – especially ambitious or
          large projects. However, if you have other request or question, don’t
          hesitate to contact me using below form either.
        </Typography>
        <Formik
          initialValues={{ name: "", email: "", subject: "", message: "" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.subject}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={6}
                    id="message"
                    label="Message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.message}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} container justify="flex-end">
                  <Button color="primary" variant="outlined">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
      <Grid item md={7}>
        <div classes={classes.root}>
          <Map />
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  root: { height: "100%", width: "100%" },
}));
