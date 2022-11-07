import { ThemeProvider } from "@emotion/react";
import { CssBaseline, PaletteMode, ThemeOptions } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { selectTheme } from "../../slices/themeSlice";
import { useAppSelector } from "../hooks";

const AppThemeProvider = ({ children }) => {
  const themeMode = useAppSelector(selectTheme);

  const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            //palette for light mode
            primary: grey,
            secondary: grey,
            divider: grey[400],
            background: {
              default: grey[100],
              paper: grey[300]
            },
            text: {
              primary: "#000000",
              secondary: grey[800]
            },
            header: grey[200],
            border: grey[300]
          }
        : {
            //palette for dark mode
            primary: grey,
            secondary: grey,
            divider: grey[400],
            background: {
              default: grey[900],
              paper: grey[800]
            },
            text: {
              primary: "#fff",
              secondary: grey[500]
            },
            header: grey[900],
            border: grey[700]
          })
    },
    shape: {
      borderRadius: 4
    }
  });

  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode.theme)),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
