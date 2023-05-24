import pb from "@/lib/pocketbase";
import { data } from "autoprefixer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function createFlight() {
  const router = useRouter();
  const [airport, setAirport] = useState([]);
  const [airlines, setAirlines] = useState([]);

  async function getAirport() {
    try {
      const airports = await pb.collection("indonesian_airport").getFullList();
      console.log(airports);
      setAirport(airports);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAirlines() {
    try {
      const airlines = await pb.collection("airlines").getFullList();
      console.log(airlines);
      setAirlines(airlines);
    } catch (error) {
      console.log(error);
    }
  }

  async function createFlight(event) {
    event.preventDefault();
    // const formData = new FormData(event.target);
    try {
      const data = {
        origin: event.target.origin.value,
        destination: event.target.destination.value,
        departure: new Date(event.target.departure.value),
        arrival: new Date(event.target.arrival.value),
        price: event.target.price.value,
        airplane_code: event.target.airplane_code.value,
        airline: event.target.airline.value,
        total_seat: event.target.total_seat.value,
      };
      console.log(data);

      const record = await pb.collection("flight_result").create(data);
      console.log(record);
      console.log("success");
      router.push("/flight");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAirport(), getAirlines();
  }, []);
  return (
    <form onSubmit={createFlight}>
      <div>
        <label>
          origin :
          <select name="origin">
            {airport.map((apt) => (
              <option value={apt.id} key={apt.id}>
                {apt.airport_code +
                  " " +
                  apt.airport_name +
                  " ," +
                  apt.airport_location}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Destination
          <select name="destination" id="destination">
            {airport.map((apt) => (
              <option value={apt.id} key={apt.id}>
                {apt.airport_code +
                  " " +
                  apt.airport_name +
                  " " +
                  apt.airport_location}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Derpature Date :
          <input type="datetime-local" name="departure" id="departure" />
        </label>
      </div>
      <div>
        <label>
          Arrival Date :{" "}
          <input type="datetime-local" name="arrival" id="arrival" />
        </label>
      </div>
      <div>
        <label>
          Airline :
          <select name="airline" id="airlines">
            {airlines.map((air) => (
              <option value={air.id} key={air.id}>
                {air.name + " " + air.country}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Airline Code :<input name="airplane_code" />
        </label>
      </div>
      <div>
        <label>
          Price :<input type="number" name="price" />
        </label>
      </div>
      <div>
        <label>
          Total Seat: <input type="number" name="total_seat" />
        </label>
      </div>
      <button type="submit">Create flight</button>
    </form>
  );
}
