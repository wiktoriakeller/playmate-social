import "@emotion/react";
import { Theme as MuiTheme } from "@mui/material/styles";

export interface CustomTheme {}

export interface CustomPalette {
  white: string;
  black: string;
  header: string;
  border: string;
  link: string;
  linkHover: string;
  chartColors: {
    primaryText: string;
    secondaryText: string;
  };
}

declare module "@mui/material/styles" {
  export interface MuiTheme extends CustomTheme {}
  export interface ThemeOptions extends CustomTheme {}
  export interface PaletteOptions extends CustomPalette {}
  export interface Palette extends CustomPalette {}
}

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}
