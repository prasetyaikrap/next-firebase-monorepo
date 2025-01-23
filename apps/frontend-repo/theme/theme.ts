"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: { light: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  palette: {
    primary: {
      main: "#1e88e5",
      dark: "#155fa0",
      light: "#4b9fea",
    },
    secondary: {
      main: "#00bfa5",
      dark: "#008573",
      light: "#33cbb7",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: "info" },
              style: {
                backgroundColor: "#60a5fa",
              },
            },
          ],
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          typography: theme.typography.caption,
          marginBottom: 8,
        }),
      },
    },
  },
});

export default theme;
