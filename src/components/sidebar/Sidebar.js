import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import GamepadIcon from "@material-ui/icons/GamepadOutlined";
import WorkIcon from "@material-ui/icons/WorkOutlineOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import TranslateIcon from "@material-ui/icons/Translate";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";

export default function Sidebar({ children, toggleDarkMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>LOGO</div>
          <div className={classes.buttons}>
            <IconButton color="inherit" aria-label="change language">
              <TranslateIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="toggle dark mode"
              onClick={toggleDarkMode}
            >
              {theme.palette.type === "light" ? (
                <Brightness4Icon />
              ) : (
                <Brightness5Icon />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, classes.drawerClose)}
        classes={{
          paper: classes.drawerClose,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {options.map(({ name, path, icon: Icon }, index) => (
            <ListItem button key={name} onClick={() => history.push(path)}>
              <ListItemIcon>
                <Icon color="secondary" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

const options = [
  {
    path: "/",
    name: "Home",
    icon: HomeIcon,
  },
  {
    path: "/about",
    name: "About",
    icon: PersonIcon,
  },
  {
    path: "/skills",
    name: "Skills",
    icon: GamepadIcon,
  },
  {
    path: "/work",
    name: "My Work",
    icon: WorkIcon,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: EmailIcon,
  },
];
