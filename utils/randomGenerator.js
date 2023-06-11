const RNG = (range) => Math.floor(Math.random() * range + 1);

/**
 * make random number with choosed probability
 * @param {array} notRN - put the array of probability here bitch
 */
function RNGP(notRN = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]) {
  var idx = Math.floor(Math.random() * notRandomNumbers.length);
  return notRandomNumbers[idx];
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

const funkyRNP = { RNGP, NSR, RNG };

export default funkyRNP;
