import { CssBaseline } from "@mui/material";
import { type AppType } from "next/dist/shared/lib/utils";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import "~/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
const theme = createTheme();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MyApp;
