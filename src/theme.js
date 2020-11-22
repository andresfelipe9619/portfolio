import { useState } from "react";

const primaryColor = "#00ff3f";
const secondaryColor = "#FF006A";

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
