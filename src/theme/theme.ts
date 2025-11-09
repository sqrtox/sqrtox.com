"use client";

import { blue, grey, lightBlue, orange, yellow } from "@mui/material/colors";
import { createTheme, emphasize } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import {
  dark,
  light,
} from "#src/../node_modules/@mui/material/esm/styles/createPalette";

declare module "@mui/material/styles" {
  interface SkyPalette {
    default: string;
    light: string;
  }

  interface PaletteOptions {
    sky: SkyPalette;
    wave: string;
  }

  interface Palette {
    sky: SkyPalette;
    wave: string;
  }

  interface TypeBackground {
    paperSecondary: string;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "var(--primary-font)",
    fontSize: 16,
  },
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  defaultColorScheme: "dark",
  colorSchemes: {
    dark: {
      palette: {
        background: {
          paper: "#111",
          paperSecondary: emphasize(dark.background.default, 0.1),
        },
        primary: {
          main: lightBlue[400],
        },
        text: {
          primary: grey[300],
        },
        sky: {
          default: blue[800],
          light: yellow[800],
        },
        wave: blue[500],
      },
    },
    light: {
      palette: {
        background: {
          paper: grey[100],
          paperSecondary: emphasize(light.background.default, 0.1),
        },
        primary: {
          main: blue[600],
        },
        text: {
          primary: grey[800],
        },
        sky: {
          default: blue[300],
          light: orange[600],
        },
        wave: blue.A200,
      },
    },
  },
});
