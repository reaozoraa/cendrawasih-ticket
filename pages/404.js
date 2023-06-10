import Navbar from "@/components/layouts/Navbar";

import { Box, Typography } from "@mui/material/";

export default function Custom404() {
  return (
    <>
      <main>
        <Navbar />
        <Typography
          variant="h3"
          fontWeight={400}
          color="grey"
          sx={{ textAlign: "center" }}
        >
          404 not found
        </Typography>
        <Typography
          variant="h3"
          fontWeight={400}
          color="grey"
          sx={{ textAlign: "center" }}
        >
          :(
        </Typography>
      </main>
    </>
  );
}
