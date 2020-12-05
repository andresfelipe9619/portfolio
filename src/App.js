import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useDarkMode } from "./theme";
import RouterApp from "./router/router.app";
import Sidebar from "./components/sidebar/Sidebar";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { defaultLocale, dynamicActivate } from "./i18n";

function App() {
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme);

  useEffect(() => {
    // With this method we dynamically load the catalogs
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <I18nProvider i18n={i18n}>
        <Sidebar toggleDarkMode={toggleDarkMode}>
          <RouterApp />
        </Sidebar>
      </I18nProvider>
    </MuiThemeProvider>
  );
}
export default App;
