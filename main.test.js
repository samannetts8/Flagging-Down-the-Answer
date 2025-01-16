import { full_flag_list } from "./flag_database";
import { describe, expect, test } from "vitest";
import { filterFlag } from "./main.js";

// describe("Comparing actual to expected results", () => {
//   test.each([
//     [
//       {
//         hasStripes: true,
//         hasCircles: true,
//       },
//       ["Argentina"],
//     ],
//     [
//       {
//         hasStripes: true,
//         hasCircles: false,
//       },
//       ["Canada"],
//     ],
//   ])("An input of %o should return %o", (a, b) => {
//     expect(filterFlag(a)).toEqual(expect.arrayContaining(b));
//   });
// });

describe("Comparing filtering on individual keys", () => {
  test.each([
    [
      {
        hasStripes: true,
      },
      [
        "Argentina",
        "Canada",
        "Belgium",
        "Germany",
        "United States",
        "Ukraine",
        "Venezuela",
        "Netherlands",
        "Romania",
      ],
      full_flag_list,
    ],
    [
      {
        hasStripes: false,
      },
      [
        "China",
        "Australia",
        "United Kingdom",
        "European Union",
        "Japan",
        "Switzerland",
      ],
      full_flag_list,
    ],
  ])("An input of %o should return %o", (a, b, c) => {
    expect(filterFlag(a, c)).toEqual(expect.arrayContaining(b));
  });

  test.each([
    [
      {
        numberOfColors: 2,
      },
      ["Canada", "China", "Ukraine", "European Union", "Japan", "Switzerland"],
      full_flag_list,
    ],
    [
      {
        numberOfColors: 3,
      },
      [
        "Argentina",
        "Belgium",
        "Australia",
        "United States",
        "United Kingdom",
        "Venezuela",
        "Netherlands",
        "Romania",
      ],
      full_flag_list,
    ],
  ])("An input of %o should return %o", (a, b, c) => {
    expect(filterFlag(a, c)).toEqual(expect.arrayContaining(b));
  });
});
