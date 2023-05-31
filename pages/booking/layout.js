import {
  AppBar,
  Box,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  Tabs,
  Tab,
  ThemeProvider,
  createTheme,
  CardHeader,
} from "@mui/material/";

import Footer from "@/components/layouts/Footer";
import NavbarExc from "@/components/layouts/NavbarExc";

import style from "../../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <main className={style.main}>
      <CssBaseline />
      <NavbarExc />
      <Container
        maxWidth="auto"
        sx={{
          backgroundColor: "white",
          height: "auto",
          // position: "absolute",
          color: "black",
        }}
      >
        {children}
      </Container>
      <Footer />
    </main>
  );
}
