const assert = require("assert");
const { pulseDistribution } = require("../src/pulse.js");

describe("test pulseDistribution function", () => {
  it("should return the input if the number less than 5", () => {
    for (let i = 5; i > 0; i--) {
      let expected = pulseDistribution(i);
      assert.equal(expected, i);
    }
  });
  it("should return an array of numbers which sums to the input", () => {
    for (let i = 400; i > 0; i--) {
      let myArray = pulseDistribution(i);
      // console.log(myArray)
      const expected = myArray.reduce((a, b) => Number.parseInt(a, 10) + Number.parseInt(b, 10), 0)
      assert.equal(expected, i);
    }
  });
});
