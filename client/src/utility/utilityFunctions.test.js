import { getWeeks } from "utility/utilityFunctions";
import { eachWeekOfInterval } from "date-fns";

describe("testing getAllWeeks", () => {
  it("should return an array with weeks of last year", () => {
    const day = new Date();
    const weeks = getWeeks(day, 5);

    const start = new Date(day);
    start.setFullYear(day.getFullYear() - 1);

    let expected = eachWeekOfInterval(
      {
        start,
        end: day,
      },
      { weekStartsOn: 1 }
    );

    expected = expected.map((week) => {
      const sunday = new Date(week);
      sunday.setDate(sunday.getDate() + 6);
      return {
        monday: week,
        sunday,
      };
    });

    expect(weeks).toEqual(expected);
  });
});
