import { useState } from "react";

const primaryColor = "#05386b";
const secondaryColor = "#5CDB95";

const Palette = {
  type: "light",
  primary: {
    main: primaryColor,
  },
  secondary: {
    light: "#8EE4AF",
    main: secondaryColor,
    dark: "#379683",
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

const Theme = {
  palette: Palette,
  typography: {
    fontSize: 12,
  },
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
