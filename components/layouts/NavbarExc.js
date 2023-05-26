import * as React from "react";

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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function NavbarExc() {
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
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "black" }}
      className="shadow-xl border-b"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Image
              src="/brand/title.png"
              alt="the logo"
              width={230}
              height={230}
            />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Image
              src="/brand/logoonly.png"
              alt="the logo"
              width={50}
              height={50}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} className=""></Box>
          <Box sx={{ flexGrow: 0 }} className="">
            <Stepper nonLinear>
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
  );
}
