import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  colors: {
    blue: {
      50: "#E7F1FE",
      100: "#BCD9FB",
      200: "#90C0F8",
      300: "#65A7F6",
      400: "#3A8FF3",
      500: "#0E76F1",
      600: "#0B5FC1",
      700: "#094790",
      800: "#062F60",
      900: "#031830"
    }
  }
});

export default theme;
