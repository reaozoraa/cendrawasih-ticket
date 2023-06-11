import React from "react";
import { useRouter } from "next/router";
import Layout from "./layout";

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
  const {
    ctz,
    dpE,
    dpFn,
    dpLn,
    issC,
    pn,
    pspD,
    pspExp,
    pspFn,
    pspG,
    pspLn,
    pspPp,
    fpl,
    tpl,
    dtd,
    dta,
    ps,
    st,
    air,
    tk,
  } = ctx.query;
  if (
    !ctz ||
    !dpE ||
    !dpFn ||
    !dpLn ||
    !issC ||
    !pn ||
    !pspD ||
    !pspExp ||
    !pspFn ||
    !pspG ||
    !pspLn ||
    !pspPp ||
    !fpl ||
    !tpl ||
    !dtd ||
    !dta ||
    !ps ||
    !st ||
    !air ||
    !tk
  ) {
    // return {
    //   redirect: {
    //     destination: "/",
    //   },
    // };
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ctz,
      dpE,
      dpFn,
      dpLn,
      issC,
      pn,
      pspD,
      pspExp,
      pspFn,
      pspG,
      pspLn,
      pspPp,
      fpl,
      tpl,
      dtd,
      dta,
      ps,
      st,
      air,
      tk,
    },
  };
}

function flightPayment({
  ctz,
  dpE,
  dpFn,
  dpLn,
  issC,
  pn,
  pspD,
  pspExp,
  pspFn,
  pspG,
  pspLn,
  pspPp,
  fpl,
  tpl,
  dtd,
  dta,
  ps,
  st,
  air,
  tk,
}) {
  const handlePayment = (e) => {
    e.preventDefault();
    console.log(
      ctz,
      dpE,
      dpFn,
      dpLn,
      issC,
      pn,
      pspD,
      pspExp,
      pspFn,
      pspG,
      pspLn,
      pspPp,
      fpl,
      tpl,
      dtd,
      dta,
      ps,
      st,
      air,
      tk
    );
  };
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

export default flightPayment;
