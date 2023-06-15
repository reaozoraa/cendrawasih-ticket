// import React from 'react'
import pb from "@/lib/pocketbase";
import dayjs from "dayjs";
// import { RNGP, NSR, RNG } from "./randomGenerator";

const priceRandomTableEconomy = [
    ...NSR(1, 2),
    ...NSR(1.3, 3),
    ...NSR(1.5, 3),
    ...NSR(2, 5),
    ...NSR(2.5, 4),
    ...NSR(3, 2),
    ...NSR(3.3, 3),
    ...NSR(3.6, 2),
    ...NSR(4, 2),
  ],
  priceRandomTableBusiness = [
    ...NSR(5, 1),
    ...NSR(6.3, 3),
    ...NSR(6.6, 2),
    ...NSR(7.2, 4),
    ...NSR(8, 3),
    ...NSR(10.3, 5),
    ...NSR(12.5, 6),
    ...NSR(14, 4),
    ...NSR(19.7, 4),
  ],
  priceRandomTableFirstClass = [
    ...NSR(10, 1),
    ...NSR(14.3, 3),
    ...NSR(18.5, 3),
    ...NSR(20, 5),
    ...NSR(26.5, 4),
    ...NSR(30.4, 6),
    ...NSR(34.3, 5),
    ...NSR(39.6, 2),
    ...NSR(45, 1),
  ];

// RNG SECTION -----------------------
const RNG = (range) => Math.floor(Math.random() * range + 1);

/**
 * make random number with choosed probability
 * @param {array} notRN - put the array of probability here bitch
 */
function RNGP(notRN = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]) {
  var idx = Math.floor(Math.random() * notRN.length);
  return notRN[idx];
}

/**
 * make sure to USE SPREAD, ya know, the one with the 3 dots...
 * @param {int} number
 * @param {int} howMuch
 */
function NSR(number, howMuch) {
  const numArray = [];
  for (let n = 0; n < howMuch; n++) {
    numArray.push(number);
  }
  return numArray;
}
// -----------------------------------

function prAdd(money) {
  let newPrice = money * 1000000;
  return parseInt(newPrice);
}

async function seeder(fp, tp, dt, ps, st) {
  try {
    const airlines = await pb
      .collection("airlines")
      .getFullList({ expand: "name, country" });
    const newFrom = await pb
      .collection("indonesian_airport")
      .getFirstListItem(`id="${fp}"`);
    const newTo = await pb
      .collection("indonesian_airport")
      .getFirstListItem(`id="${tp}"`);

    const dateNewFormat = dayjs(dt).add(RNG(12) + 1, "hours");
    const generatedDatas = [];
    let pricePoint = priceRandomTableEconomy;
    switch (st) {
      case "business":
        pricePoint = priceRandomTableBusiness;
        break;
      case "first-class":
        pricePoint = priceRandomTableFirstClass;
        break;
      default:
        break;
    }

    for (let rd = 0; rd < 10; rd++) {
      let rng = RNG(2);
      generatedDatas.push({
        origin: newFrom,
        destination: newTo,
        depart: dateNewFormat.add(rng, "hours"),
        arrive: dateNewFormat.add(rng + RNG(2) + 1, "hours"),
        price: prAdd(RNGP(pricePoint)),
        // seat: "",
        airline: airlines[RNG(10)],
      });
    }
    return generatedDatas;
  } catch (error) {
    return false;
  }
}

export default seeder;
