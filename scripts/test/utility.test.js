const assert = require("assert");
const { getLastMonthStartEnd, sleep } = require("../src/utility");

describe("testing getLastMonthStartEnd function", () => {
  it("should return last month start and end date", () => {
    const today = new Date("2021-01-10");
    const expected = {
      start: "2021-01-01",
      end: "2021-02-01",
    };

    const result = getLastMonthStartEnd(today);
    assert.deepStrictEqual(result.start, expected.start);
    assert.deepStrictEqual(result.end, expected.end);
  });
});

