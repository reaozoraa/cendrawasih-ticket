import { useRouter } from "next/router";
import * as React from "react";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material/";

import pb from "@/lib/pocketbase";
import { History } from "@mui/icons-material";
import Image from "next/image";
// import logo from '../public/brand/logo.png';
import useLogout from "@/hooks/useLogout";
import dynamic from "next/dynamic";

// import { userAccessToken, fetchUser } from "../../utils/fetchUserDetail";

// import logo from '../public/brand/logo.png';

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

// const pages = ["Saved"];
// const settings = [
//   {
//     label: "Profile",
//     link: "profile",
//   },
//   {
//     label: "Logout",
//     link: "sign-in",
//   },
// ];
// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();
  const logout = useLogout();

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
        className="shadow-xl"
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
                priority
                alt="the logo"
                width={50}
                height={50}
              />
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { mobile: "none", tablet: "flex" } }}
              className="flex justify-end"
            >
              <Button
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "inherit", display: "block" }}
                className="flex items-center"
                onClick={() => {
                  handleCloseNavMenu();
                  router.push("/tickets");
                }}
              >
                <History />
                <Typography variant="p" sx={{ display: "inline" }}>
                  Tiket Booking
                </Typography>
              </Button>
            </Box>

            {pb.authStore.isValid ? (
              <Box sx={{ flexGrow: 0 }} className="">
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      // src={user?.photoURL}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center" onClick={logout}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  className="mx-1"
                  color="inherit"
                  onClick={() => router.push("/sign-in")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => router.push("/sign-up")}
                  className="bg-blue-500 mx-1"
                >
                  Register
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
