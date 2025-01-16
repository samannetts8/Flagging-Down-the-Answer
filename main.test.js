import { full_flag_list } from "./flag_database";
import { describe, expect, test } from "vitest";
import { filterFlag } from "./main.js";

describe("Comparing actual to expected results", () => {
  test.each([
    [
      {
        hasStripes: true,
        hasCircles: true,
      },
      ["Argentina"],
    ],
  ])("An input of %o should return %o", (a, b) => {
    expect(filterFlag(a)).toEqual(expect.arrayContaining(b));
  });
});
