import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "./layout";
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

export function getServerSideProps(ctx) {
  const { fpl, tpl, dtd, dta, pr, ps, st, air, ctsid, tk } = ctx.query;
  if (
    !fpl ||
    !tpl ||
    !dtd ||
    !dta ||
    !pr ||
    !ps ||
    !st ||
    !air ||
    !ctsid ||
    !tk
  ) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      fpl,
      tpl,
      dtd,
      dta,
      pr,
      ps,
      st,
      air,
      ctsid,
      tk,
    },
  };
}

function FlightPayment({ fpl, tpl, dtd, dta, pr, ps, st, air, ctsid, tk }) {
  const router = useRouter();
  const handlePayment = async (e) => {
    e.preventDefault();
    const flightData = {
      origin: fpl,
      destination: tpl,
      departure: dtd,
      arrival: dta,
      price: pr,
      seat_class: st,
      total_seats: ps,
      airline: air,
      customers: ctsid,
    };
    const ticket = await pb.collection("flight_ticket").create(flightData);
    console.log(ticket);
    router.push({
      pathname: "/",
      // openSnackbar: true,
    });
  };
  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/sign-in");
    }
  });
  return (
    <>
      <Layout stage={1}>
        <Container
          maxWidth="auto"
          sx={{
            // backgroundColor: "white",
            height: "100vh",
          }}
          className="flex justify-center items-center"
        >
          <form action="" onSubmit={handlePayment}>
            <Box className="flex flex-col justify-center">
              <FormControlLabel
                required
                control={<Checkbox required />}
                label="Please confirm the payment"
              />
              <Button
                variant="contained"
                className="bg-blue-500"
                type="submit"
                sx={{ borderRadius: "10px" }}
              >
                <Typography variant="h3">Payment</Typography>
              </Button>
            </Box>
          </form>
        </Container>
      </Layout>
    </>
  );
}

export default FlightPayment;
