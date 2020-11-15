import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./theme";
import RouterApp from "./router/router.app";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const themeConfig = createMuiTheme(theme);
  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Sidebar>
        <RouterApp />
      </Sidebar>
    </MuiThemeProvider>
  );
}
export default App;
