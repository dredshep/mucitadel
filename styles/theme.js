import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#9B50FF",
        secondary: "#A57AB9",
        dark: "#130B1E",
        light: "#FFFFFF",
      },
      secondary: {
        main: "#8032FC",
      },
      background: {
        main: "#0D0F1F",
        secondary: "#1B112B",
        light: "#fff",
        dark: "#000",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#A57AB9",
        light: "#fff",
        dark: "#000",
      },
    },
    typography: {
      fontFamily: ["bigjohnpro", "Georgia", "serif"],
      h4: {
        fontWeight: "bold",
      },
      h6: {
        fontWeight: "bold",
      },
    },
    custom: {
      defaultBoxShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)",
      defaultBorder: "1px solid #DDDDDD",
    },
  })
);

export default theme;
