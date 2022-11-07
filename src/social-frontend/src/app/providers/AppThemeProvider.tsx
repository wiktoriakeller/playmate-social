import { ThemeProvider } from "@emotion/react";
import { CssBaseline, PaletteMode, ThemeOptions } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { selectTheme } from "../../slices/themeSlice";
import { useAppSelector } from "../hooks";

const AppThemeProvider = ({ children }) => {
  const themeMode = useAppSelector(selectTheme);

  const commonPalette = {
    white: "#ffffff",
    black: "#000000"
  };

  const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            //palette for light mode
            ...commonPalette,
            primary: grey,
            secondary: indigo,
            divider: grey[600],
            background: {
              default: grey[50],
              paper: grey[100]
            },
            text: {
              primary: "#000000",
              secondary: grey[800]
            },
            header: grey[100],
            border: grey[200],
            link: grey[600],
            linkHover: grey[700]
          }
        : {
            //palette for dark mode
            ...commonPalette,
            primary: grey,
            secondary: indigo,
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
            border: grey[800],
            link: grey[500],
            linkHover: grey[400]
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
