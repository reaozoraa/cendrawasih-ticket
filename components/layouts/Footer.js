import { Box, Container, Paper, Typography } from "@mui/material/";
import Link from "next/link";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          position: "relative",
          // top: "100%",
          zIndex: "100",
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
            className=" flex flex-wrap justify-evenly "
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
              Copyright ©2022. Cendrawasih
            </Typography>
          </Box>
        </Container>
      </Paper>
    </>
  );
}
