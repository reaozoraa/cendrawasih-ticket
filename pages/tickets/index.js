import React from "react";
import Layout from "./../layout";
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
} from "@mui/material/";

export default function Tickets() {
  const [ticketHistory, setHistory] = useState([]);
  const router = useRouter();

  async function getHistory() {
    const resultList = await pb.collection("flight_ticket").getFullList({
      expand: "first_name,last_name,phone_number,email,gender,passport_number",
    });
    setHistory(resultList);
  }

  useEffect(() => {
    getHistory();
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
        {/* {ticketHistory.map((ticket) => (
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
        ))} */}
      </Container>
    </Layout>
  );
}
