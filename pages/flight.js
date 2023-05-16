import pb from "@/lib/pocketbase";
import { useEffect, useState } from "react";

export default function flight() {
  const [flights, setFlights] = useState([]);

  async function getFlight() {
    const resultList = await pb.collection("flight_tickets").getFullList({
      expand: "origin,destination",
    });
    setFlights(resultList);
  }

  useEffect(() => {
    getFlight();
  }, []);

  return (
    <>
      <div>
        {flights.map((flight) => (
          <div key={flight.id}>
            {flight.expand.origin.airport_name} ke{" "}
            {flight.expand.destination.airport_name}
          </div>
        ))}
      </div>
      <input></input>
    </>
  );
}
