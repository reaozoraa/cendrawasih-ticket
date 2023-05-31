// import pb, { newPb } from "@/lib/pocketbase";
// import { useState } from "react";
// import { useEffect } from "react";

// const Seeder = () => {
//   //   const [airportss, setAirpotss] = useState(null);

//   async function getAirport() {
//     try {
//       const airports = await pb.collection("airlines").getFullList();
//       console.log(airports);

//       let count = 0;
//       for (const airport of airports) {
//         const data = {
//           name: airport.name,
//           country: airport.country,
//         };
//         const record = await newPb.collection("airlines").create(data);
//         count++;
//         console.log(count, record);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getAirport();
//   }, []);

//   return <div>test</div>;
// };

// export default Seeder;
