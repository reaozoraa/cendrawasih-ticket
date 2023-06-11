import { CssBaseline, ThemeProvider, createTheme } from "@mui/material/";

import { Questrial } from "next/font/google";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import style from "../styles/Home.module.css";

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
});

const theme = createTheme({
  typography: {
    fontFamily: questrial.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: questrial.style.fontFamily;
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});

function Layout({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <main
          className={style.main}
          style={{
            backgroundImage: "url(/background.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "bottom left",
          }}
        >
          <CssBaseline />
          <Navbar />
          {children}
          <Footer />
        </main>
      </ThemeProvider>
    </>
  );
}
export default Layout;
