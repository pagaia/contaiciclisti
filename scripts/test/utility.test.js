const assert = require("assert");
const { getLastMonthStartEnd, sleep, formatDate } = require("../src/utility");

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

  it("should return current month start and end date", () => {
    const today = new Date();

    const y = today.getFullYear(),
      m = today.getMonth() - 1;

    var start = new Date(y, m, 1);
    var end = new Date(y, m + 1, 1);

    const expected = {
      start: formatDate(start),
      end: formatDate(end)
    };

    const result = getLastMonthStartEnd(start);
    assert.deepStrictEqual(result.start, expected.start);
    assert.deepStrictEqual(result.end, expected.end);
  });
});
