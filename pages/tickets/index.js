import React from "react";
import Layout from "@/pages/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material/";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import moneyFormatter from "@/utils/moneyFormatter";

export default function Tickets() {
  const [ticketHistory, setHistory] = useState([]);
  const router = useRouter();

  async function getHistory() {
    // const resultList = await pb.collection("flight_ticket").getFullList({
    //   expand: "first_name,last_name,phone_number,email,gender,passport_number",
    // });
    // const resultList = await pb.collection("flight_ticket").getFullList(1, 5, {
    //   filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
    //   expand: "origin,destination,airline",
    // });
    const resultList = await pb.collection("flight_ticket").getFullList({
      expand: "origin,destination,airline,customers.costumers",
    });
    setHistory(resultList);
    console.log(resultList);
  }

  useEffect(() => {
    if (pb.authStore.isValid) {
      getHistory();
    }
  }, []);

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push("/sign-up");
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
          color: "black",
        }}
      >
        {ticketHistory
          ? ticketHistory.map((ticket) => (
              <Accordion sx={{ maxWidth: 800 }} key={ticket.id}>
                <AccordionSummary
                  expandIcon={
                    <Typography>
                      Expand
                      <ExpandMoreIcon sx={{ fontSize: "50px" }} />
                    </Typography>
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Box>
                    <Box className="flex justify-between">
                      <Typography variant="h6">
                        {ticket.expand.airline.name}
                      </Typography>
                      <Typography variant="h6">
                        {moneyFormatter(ticket.price, "IDR", "in-ID")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ minWidth: "600px" }}
                      className="flex grow items-center justify-between"
                    >
                      <Box className="text-center">
                        <Typography variant="p">
                          {ticket.expand.origin.airport_name}(
                          {ticket.expand.origin.airport_code})
                        </Typography>
                        <Typography variant="h6">
                          {ticket.expand.origin.airport_location}
                        </Typography>
                        <Typography variant="p">{ticket.departure}</Typography>
                      </Box>
                      <TrendingFlatIcon
                        sx={{ fontSize: "50px" }}
                        className="text-blue-500"
                      />
                      <Box className="text-center">
                        <Typography variant="p">
                          {ticket.expand.destination.airport_name}(
                          {ticket.expand.destination.airport_code})
                        </Typography>
                        <Typography variant="h6">
                          {ticket.expand.destination.airport_location}
                        </Typography>
                        <Typography variant="p">{ticket.arrival}</Typography>
                      </Box>
                    </Box>
                    <Divider></Divider>
                    <Box className="flex justify-between">
                      <Box className="text-center">
                        <Typography>Class</Typography>
                        <Typography fontWeight={800}>
                          {ticket.seat_class}
                        </Typography>
                      </Box>
                      <Box className="text-center">
                        <Typography>Passenger</Typography>
                        <Typography fontWeight={800}>
                          {ticket.total_seats}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {ticket.expand.customers.expand.costumers.map(
                    (identities) => (
                      <>
                        <Box
                          className="flex justify-between"
                          key={identities.id}
                        >
                          <Box>
                            <Typography>Name</Typography>
                            <Typography fontWeight={800}>
                              {identities.first_name}
                              {identities.last_name}
                            </Typography>
                          </Box>
                          <Box className="text-center">
                            <Typography>Gender</Typography>
                            <Typography fontWeight={800}>
                              {identities.gender}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider></Divider>
                      </>
                    )
                  )}
                </AccordionDetails>
              </Accordion>
            ))
          : null}
        {/* ticket.expand.customers.expand.costumers */}
      </Container>
    </Layout>
  );
}

{
  /* {ticketHistory.map((ticket) => (
          <div key={ticket.id}>
            <p>
              <strong>Nama:</strong> {ticket.first_name} {ticket.last_name}
            </p>
            <p>
              <strong>Nomor Telepon:</strong> {ticket.phone_number}
            </p>
            <p>
              <strong>Email:</strong> {ticket.email}
            </p>
            <p>
              <strong>Jenis Kelamin:</strong> {ticket.gender}
            </p>
            <p>
              <strong>Nomor Paspor:</strong> {ticket.passport_number}
            </p>
          </div>
        ))} */
}

{
  /* {ticketHistory
        ? ticketHistory.map((ticket) => (
            <div key={ticket.id}>
              <p>
                <strong>Nama:</strong> {ticket.departure} {ticket.arrival}
              </p>
              <p>
                <strong>Nomor Telepon:</strong> {ticket.price}
              </p>
            </div>
          ))
        : null} */
}
