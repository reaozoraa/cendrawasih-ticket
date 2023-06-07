import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

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

import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";

import style from "../../styles/Home.module.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

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
          height: "100%",
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
