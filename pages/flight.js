import pb from "@/lib/pocketbase";
import { useEffect, useState } from "react";

export default function flight() {
  const [flights, setFlights] = useState([]);
  // const [airlines, setAirlines] = useState([]);

  async function getFlight() {
    const resultList = await pb.collection("flight_tickets").getFullList({
      expand: "origin,destination,airline,price",
    });
    setFlights(resultList);
  }
  // async function getAirlines() {
  //   const resultList = await pb.collection("airlines").getFullList({
  //     expand: "name,country",
  //   });
  //   setAirlines(resultList);
  // }

  useEffect(() => {
    getFlight();
  }, []);

  return (
    <>
      <div>
        {flights.map((flight) => (
          <div key={flight.id}>
            {flight.expand.origin.airport_name} menuju{" "}
            {flight.expand.destination.airport_name} Menggunakan Maskapai {""}
            {flight.expand.airline.name} terbang pada tanggal {flight.departure}{" "}
            sampai tanggal {flight.arrival} dengan Harga penerbangan Rp.
            {flight.price}
          </div>
        ))}
      </div>
      <input></input>
    </>
  );
}
