import { ThemeProvider } from "@emotion/react";
import { CssBaseline, PaletteMode, ThemeOptions } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { selectThemeMode } from "../../slices/themeSlice";
import { useAppSelector } from "../storeHooks";

const commonPalette = {
  white: grey[50],
  black: "#000000"
};

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          //palette for light mode
          ...commonPalette,
          primary: grey,
          secondary: indigo,
          divider: grey[300],
          background: {
            default: grey[50],
            paper: grey[100]
          },
          text: {
            primary: "#000000",
            secondary: grey[800]
          },
          header: grey[100],
          border: grey[300],
          link: grey[500],
          linkHover: grey[700],
          chartColors: {
            primaryText: "#000000",
            secondaryText: grey[800]
          }
        }
      : {
          //palette for dark mode
          ...commonPalette,
          primary: grey,
          secondary: indigo,
          divider: grey[800],
          background: {
            default: grey[900],
            paper: grey[900]
          },
          text: {
            primary: grey[100],
            secondary: grey[500]
          },
          header: grey[900],
          border: grey[800],
          link: grey[200],
          linkHover: grey[300],
          chartColors: {
            primaryText: grey[100],
            secondaryText: grey[500]
          }
        })
  },
  shape: {
    borderRadius: 6
  }
});

const AppThemeProvider = ({ children }) => {
  const themeMode = useAppSelector(selectThemeMode);

  const theme = useMemo(() => {
    return createTheme(getDesignTokens(themeMode));
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
