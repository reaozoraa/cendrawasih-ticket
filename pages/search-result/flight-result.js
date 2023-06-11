import { useEffect, useState } from "react";
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
import Layout from "./layout";

import style from "../../styles/Home.module.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import pb from "@/lib/pocketbase";
import seeder from "@/utils/seeder";
import moneyFormatter from "@/utils/moneyFormatter";
import dayjs from "dayjs";

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

export function getServerSideProps(ctx) {
  const { fp, tp, dt, ps, st, tk } = ctx.query;
  if (!fp || !tp || !dt || !ps || !st || !tk) {
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
      fp,
      tp,
      dt,
      ps,
      st,
      tk,
    },
  };
}

export default function FlightResult({ fp, tp, dt, ps, st, tk }) {
  const [flights, setFlights] = useState([]);
  const router = useRouter();

  const handleBookingChoice = (e, leFlight) => {
    e.preventDefault();
    if (pb.authStore.isValid) {
      console.log(leFlight);
      router.push({
        pathname: "../booking/flight-booking",
        query: {
          fpl: leFlight.origin.id,
          tpl: leFlight.destination.id,
          dtd: leFlight.depart.toString(),
          dta: leFlight.arrive.toString(),
          ps: ps,
          st: st,
          air: leFlight.airline.id,
          tk: tk,
        },
      });
    } else {
      router.push("/sign-in");
    }
    // pb.authStore.isValid
    //   ? router.push("../booking/flight-booking")
    //   : router.push("/sign-in");
  };

  // const [airlines, setAirlines] = useState([]);
  async function getFlightResult() {
    // const datas = seeder(fp, tp, dt, ps, st);
    // console.log(dt);
    // const resultList = await pb.collection("flight_result").getFullList({
    //   expand: "origin,destination,airline,price,depature,arrival",
    // });
    // setFlights(resultList);
    const results = await seeder(fp, tp, dt, ps, st);
    console.log(results[0]);
    setFlights(results);
  }
  // useEffect(() => {
  //   getFlight();
  //   console.log(dt);
  // }, []);

  useEffect(() => {
    getFlightResult();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" className="text-blue-500">
        Hasil Pencarian...
      </Typography>

      {/* <div>
        {flights.map((flight) => (
          <div key={flight.id}>
            {flight.expand.origin.airport_name} tanggal{" "}
            {new Date(flight.departure).toLocaleDateString("id-ID", options)}{" "}
            menuju {flight.expand.destination.airport_name} sampai pada tanggal{" "}
            {new Date(flight.arrival).toLocaleDateString("id-ID", options)}{" "}
            Menggunakan Maskapai {""}
            {flight.expand.airline.name} terbang dengan Harga penerbangan Rp.
            {flight.price}
          </div>
        ))}
      </div> */}

      <Box>
        {flights
          ? flights.map((flight) => (
              <Card sx={{ minWidth: 275, my: "10px" }} key={flight.id}>
                <CardHeader title={flight.airline.name} subheader={st} />
                <Box sx={{ mx: "10px" }} className="flex flex items-start ">
                  <Box
                    sx={{ minWidth: "600px", pb: "20px" }}
                    className="flex grow items-center justify-between"
                  >
                    <Box className="text-center">
                      <Typography variant="p">
                        {flight.origin.airport_name}(
                        {flight.origin.airport_code})
                      </Typography>
                      <Typography variant="h6">
                        {flight.origin.airport_location}
                      </Typography>
                      <Typography variant="p">
                        {/* {new Date(flight.departure).toLocaleDateString(
                          "id-ID",
                          options
                        )} */}
                        {flight.depart.toString()}
                      </Typography>
                    </Box>
                    <TrendingFlatIcon
                      sx={{ fontSize: "50px" }}
                      className="text-blue-500"
                    />
                    <Box className="text-center">
                      <Typography variant="p">
                        {flight.destination.airport_name}(
                        {flight.destination.airport_code})
                      </Typography>
                      <Typography variant="h6">
                        {flight.destination.airport_location}
                      </Typography>
                      <Typography variant="p">
                        {/* {new Date(flight.arrival).toLocaleDateString(
                          "id-ID",
                          options
                        )} */}
                        {flight.arrive.toString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ ml: "5%", pb: "20px" }}>
                    <ThemeProvider theme={buttonTheme}>
                      <Box sx={{ maxWidth: "200px" }} className="text-right">
                        <Typography wrap variant="p">
                          <span className="text-orange-600">
                            {moneyFormatter(flight.price, "IDR", "in-ID")}
                          </span>
                          /org
                        </Typography>
                        <Button
                          variant="contained"
                          className="bg-orange-500 text-white"
                          sx={{ width: "200px" }}
                          // onClick={() =>
                          //   pb.authStore.isValid
                          //     ? router.push("/tiket")
                          //     : router.push("/sign-in")
                          // }
                          onClick={(e) => handleBookingChoice(e, flight)}
                        >
                          Pilih
                        </Button>
                      </Box>
                    </ThemeProvider>
                  </Box>
                </Box>
                {/* <CardContent></CardContent> */}
              </Card>
            ))
          : null}

        <Box sx={{ height: "100px" }}></Box>
      </Box>
    </Layout>
  );
}
