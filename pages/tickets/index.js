import React from "react";
import Layout from "./../layout";
import { useEffect } from "react";

import pb from "@/lib/pocketbase";

import {
  Box,
  Typography,
  Container,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material/";

function Tickets() {
  useEffect(() => {
    if (!pb.authStore.isValid) {
      console.log("heck");
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  });

  return (
    <Layout>
      <Container
        maxWidth="auto"
        sx={{
          position: "relative",
          backgroundColor: "white",
          minHeight: "100vh",
          height: "auto",
          // position: "absolute",
          color: "black",
        }}
      >
        test
      </Container>
    </Layout>
  );
}

export default Tickets;
