import pb from "@/lib/pocketbase";
import { useEffect, useState } from "react";

export default function flight() {
  const [flights, setFlights] = useState([]);
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
    const resultList = await pb.collection("flight_result").getFullList({
      expand: "origin,destination,airline,price,depature,arrival",
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
            {flight.expand.origin.airport_name} tanggal{" "}
            {new Date(flight.departure).toLocaleDateString("id-ID", options)}{" "}
            menuju {flight.expand.destination.airport_name} sampai pada tanggal{" "}
            {new Date(flight.arrival).toLocaleDateString("id-ID", options)}{" "}
            Menggunakan Maskapai {""}
            {flight.expand.airline.name} terbang dengan Harga penerbangan Rp.
            {flight.price}
          </div>
        ))}
      </div>
      <input></input>
    </>
  );
}
