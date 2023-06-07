// import React from 'react'
import pb from "@/lib/pocketbase";
import dayjs from "dayjs";

const RNG = () => Math.floor(Math.random() * 11);

async function seeder(fp, tp, dt, ps, st) {
  const airlines = await pb.collection("airlines").getFullList({
    expand: "name, country",
  });

  const generatedData = {};
  for (let rd = 0; rd < 10; rd++) {
    var element = array[rd];
  }

  return airlines;
}

export default seeder;
