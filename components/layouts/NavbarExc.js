import * as React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  CssBaseline,
  createTheme,
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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material/";

import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { BookmarkBorder, Route } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
// import logo from '../public/brand/logo.png';

const steps = ["pesan", "bayar", "E-ticket"];

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function NavbarExc({ stage }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
        className="shadow-xl border-b"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { mobile: "none", tablet: "flex" } }}>
              <Image
                src="/brand/title.png"
                alt="the logo"
                width={230}
                height={230}
              />
            </Box>

            <Box sx={{ display: { mobile: "flex", tablet: "none" } }}>
              <Image
                src="/brand/logoonly.png"
                alt="the logo"
                width={50}
                height={50}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} className=""></Box>
            <Box sx={{ flexGrow: 0 }} className="">
              <Stepper nonLinear activeStep={stage}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
