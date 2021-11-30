import { useState } from "react";

const primaryColor = "#53ef30";
const secondaryColor = "#F03224";

const Palette = {
  type: "dark",
  primary: {
    main: primaryColor,
  },
  secondary: {
    main: secondaryColor,
  },
  success: {
    main: "#5cb860",
  },
  warning: {
    main: "#ffa21a",
  },
  error: {
    main: "#f55a4e",
  },
  info: {
    main: "#00d3ee",
  },
};

const Typography = {
  fontFamily: ["Montserrat", "open-sans"].join(","),
};

const Theme = {
  palette: Palette,
  typography: Typography,
};

export function useDarkMode() {
  const [theme, setTheme] = useState(Theme);
  const {
    palette: { type },
  } = theme;

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };
    setTheme(updatedTheme);
  };

  return [theme, toggleDarkMode];
}

export default Theme;
