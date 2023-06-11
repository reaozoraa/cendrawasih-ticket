import { Container, CssBaseline, createTheme } from "@mui/material/";

import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";

import style from "../../styles/Home.module.css";

const buttonTheme = createTheme({
  status: {
    danger: "#FF6610",
  },
  palette: {
    primary: {
      main: "#FF6610",
      darker: "#FF6610",
    },
    neutral: {
      main: "#FF6610",
      contrastText: "#FF6610",
    },
  },
});

export default function Layout({ children }) {
  return (
    <main
      className={style.main}
      style={{
        backgroundImage: "url(/background.jpeg)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <CssBaseline />
      <Navbar />
      <Container
        maxWidth="auto"
        sx={{ height: { xs: "100px", md: "300px" } }}
      />
      <Container
        maxWidth="auto"
        sx={{
          backgroundColor: "white",
          height: "auto",
          // pb: "10px",
          // position: "",
          color: "black",
        }}
      >
        {children}
      </Container>
      <Footer />
    </main>
  );
}
