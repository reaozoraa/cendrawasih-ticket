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
  Paper,
} from "@mui/material/";
import Link from "next/link";
import { styled } from "@mui/material/styles";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          position: "relative",
          // top: "100%",
          zIndex: "999",
        }}
        component="footer"
        square
        variant="outlined"
        className="bg-blue-500"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my: 1,
            }}
          >
            <div>
              {/* <Image priority src="/Logo.svg" width={75} height={30} alt="Logo" /> */}
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              mb: 2,
            }}
            className=" flex flex-wrap justify-evenly text-white"
          >
            <Box>
              <Typography variant="h5">Ikuti Kami</Typography>
              <h3>
                <Link href="https://www.instagram.com/cendrawasihtravel10/">
                  <InstagramIcon sx={{ fontSize: 30 }} />
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=100092747504784">
                  <FacebookIcon sx={{ fontSize: 30 }} />
                </Link>
                <Link href="https://twitter.com/Cendrawasih1010">
                  <TwitterIcon sx={{ fontSize: 30 }} />
                </Link>
              </h3>
            </Box>

            <Box>
              <Typography variant="h5">Layanan</Typography>
              <h3>Bantuan</h3>
              <h3>Travel</h3>
              <h3>Hotel</h3>
            </Box>

            <Box>
              <Typography variant="h5">Jelajahi</Typography>
              <h3></h3>
              <h3>Tentang Kami</h3>
              <h3>Kontak Media</h3>
              <h3>Blog</h3>
            </Box>

            <Box>
              <Typography variant="h5">Toko Kami</Typography>
              <h3>
                <Link href="https://www.google.com">Tiket Pesawat</Link>
              </h3>
              <h3>Tiket Hotel</h3>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
            className=""
          >
            <Typography variant="caption" color="white">
              Copyright ©2022. Cendrawasih Limited
            </Typography>
          </Box>
        </Container>
      </Paper>
    </>
  );
}
