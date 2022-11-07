import { Theme as MuiTheme } from "@mui/material/styles";
import "@emotion/react";

interface CustomTheme {}

interface CustomPalette {
  header: string;
  border: string;
}

declare module "@mui/material/styles" {
  interface MuiTheme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
  interface PaletteOptions extends CustomPalette {}
  interface Palette extends CustomPalette {}
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
