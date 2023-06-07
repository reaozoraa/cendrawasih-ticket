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

export default function FlightResult() {
  const [flights, setFlights] = useState([]);
  const router = useRouter();
  const { fp, tp, dt, ps, st } = router.query;

  const handleBookingChoice = (e) => {
    e.preventDefault();
    pb.authStore.isValid
      ? router.push("../booking/flight-booking")
      : router.push("/sign-in");
  };

  // const [airlines, setAirlines] = useState([]);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  async function getFlight() {
    // const datas = seeder(fp, tp, dt, ps, st);
    // console.log(dt);
    // const resultList = await pb.collection("flight_result").getFullList({
    //   expand: "origin,destination,airline,price,depature,arrival",
    // });
    // setFlights(resultList);
  }
  useEffect(() => {
    getFlight();
  }, []);

  // useEffect(() => {
  //   getFlight();
  //   console.log(seeder(fp, tp, dt, ps, st));
  // }, [fp, tp, dt, ps, st]);

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
                <CardHeader
                  title={flight.expand.airline.name}
                  subheader={flight.airplane_code}
                />
                <Box sx={{ mx: "10px" }} className="flex wrap items-end">
                  <Box
                    sx={{ minWidth: "600px" }}
                    className="flex grow items-center justify-between"
                  >
                    <Box className="text-center">
                      <Typography variant="p">
                        {flight.expand.origin.airport_name}(
                        {flight.expand.origin.airport_code})
                      </Typography>
                      <Typography variant="h6">
                        {flight.expand.origin.airport_location}
                      </Typography>
                      <Typography variant="p">
                        {new Date(flight.departure).toLocaleDateString(
                          "id-ID",
                          options
                        )}
                      </Typography>
                    </Box>
                    <TrendingFlatIcon
                      sx={{ fontSize: "50px" }}
                      className="text-blue-500"
                    />
                    <Box className="text-center">
                      <Typography variant="p">
                        {flight.expand.destination.airport_name}(
                        {flight.expand.destination.airport_code})
                      </Typography>
                      <Typography variant="h6">
                        {flight.expand.destination.airport_location}
                      </Typography>
                      <Typography variant="p">
                        {new Date(flight.arrival).toLocaleDateString(
                          "id-ID",
                          options
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ ml: "5%" }}>
                    <ThemeProvider theme={buttonTheme}>
                      <Box sx={{ maxWidth: "200px" }} className="text-right">
                        <Typography wrap variant="p">
                          <span className="text-orange-600">
                            {flight.price}
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
                          onClick={handleBookingChoice}
                        >
                          Pilih
                        </Button>
                      </Box>
                    </ThemeProvider>
                  </Box>
                </Box>
                <CardContent></CardContent>
              </Card>
            ))
          : none}
      </Box>
    </Layout>
  );
}
