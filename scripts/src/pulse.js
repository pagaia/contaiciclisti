const { readPulseStations } = require("./googleSheet");
const Fs = require("fs");
const Path = require("path");

/**
 *  this function gets a number, which is the total number of cyclist per hour and return an array of number of cyclist
 *  distributed in 1 hour
 * @param {number} totalPerHour
 * @return {Array} distribution
 */
const pulseDistribution = (totalPerHour) => {
  if (totalPerHour <= 5) {
    return [totalPerHour];
  }
  const random = getRandomArbitrary(5, 20);
  const firstGroup = (totalPerHour / random).toFixed();
  const rest = totalPerHour - firstGroup;

  return [firstGroup, ...pulseDistribution(rest)];
};

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed();
}

const distributePerHour = (numbers) => {
  const distribution = {};
  numbers.forEach((element) => {
    let minutes = getRandomArbitrary(0, 59);
    while (distribution[minutes.padStart(2, "0")]) {
      minutes = getRandomArbitrary(0, 59);
    }
    // add the number at the random minute
    distribution[minutes.padStart(2, "0")] = element;
  });
  return distribution;
};

const spreadCountsPerHour = async () => {
  // read counts per hour
  const counts = await readPulseStations();
  const file = Fs.createWriteStream("cico-pulse-January.csv");

  file.write("created_at\tfield1\tName\tlong\tlat\n");
  // per each count spread in the hour
  counts.forEach((count) => {
    const { created_at, field1, Name, long, lat } = count;
    // console.log({ created_at, entry_id, field1, geometry, Nome, long, lat });
    // distribute the total number per hours in small groups
    const numbers = pulseDistribution(field1);
    // console.log(numbers);
    // console.log({ numbers: numbers.length });
    // distribute the small group per minutes in the hour
    const distribution = distributePerHour(numbers);
    for (const [key, value] of Object.entries(distribution)) {
      //   console.log(`${key}: ${value}`);
      //   console.log(`created_at, entry_id, field1, geometry, Nome, long, lat`);
      const time =
        created_at.substring(0, 14) + key + created_at.substring(16, 23);
      // console.log(`${time}, ${value}, ${Name}, ${long}, ${lat}`);
      file.write(`${time}\t${value}\t${Name}\t${long}\t${lat}\n`);
    }
    const expected = numbers.reduce(
      (a, b) => Number.parseInt(a, 10) + Number.parseInt(b, 10),
      0
    );
    if (Number.parseInt(field1, 10) !== expected) {
      console.log("field1 %d and array %d", field1, expected);
    }

    // console.log("counts per hours");
    // console.log(distribution);

    // file.write(`$created_at, entry_id, field1, geometry, Nome, long, lat``);
  });
  file.end();
};

spreadCountsPerHour();
// module.exports = {
//   pulseDistribution,
//   distributePerHour,
// };
