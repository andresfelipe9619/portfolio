import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import GamepadIcon from "@material-ui/icons/GamepadOutlined";
import WorkIcon from "@material-ui/icons/WorkOutlineOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import TranslateIcon from "@material-ui/icons/Translate";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

export default function Sidebar({ children, toggleDarkMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>Andrés Suárez</div>
          {/* <div className={classes.buttons}> */}
          <LanguageButton />
          <Button
            color="inherit"
            aria-label="toggle dark mode"
            onClick={toggleDarkMode}
          >
            {theme.palette.type === "light" ? (
              <Brightness4Icon />
            ) : (
              <Brightness5Icon />
            )}
          </Button>
          {/* </div> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, classes.drawerClose)}
        classes={{
          paper: classes.drawerClose,
        }}
      >
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

function LanguageButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n } = useTranslation();

  const getLanguageOption = (lang) =>
    languageOptions.find((o) => o.value === lang);

  const handleClick = (newlang) => () => {
    if (!newlang) return;
    let languageOption = getLanguageOption(newlang);
    console.log("newlang", { newlang, languageOption });
    i18n.changeLanguage(newlang);
    handleClose();
  };

  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const currentLanguage = getLanguageOption(i18n.language);
  if (!currentLanguage) return null;
  return (
    <>
      <Button
        color="inherit"
        startIcon={<TranslateIcon />}
        endIcon={<ExpandMoreIcon />}
        aria-label="change language"
        onClick={handleOpen}
      >
        {currentLanguage.label}
      </Button>
      <Menu
        keepMounted
        id="language-menu"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {languageOptions.map((lo, i) => (
          <MenuItem key={i} onClick={handleClick(lo.value)}>
            {lo.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

const languageOptions = [
  { label: "Español", value: "es" },
  { label: "English", value: "en" },
  { label: "Deutsch", value: "ger" },
  { label: "Français", value: "fre" },
];

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
