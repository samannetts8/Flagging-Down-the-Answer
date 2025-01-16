import { full_flag_list } from "./flag_database";
import { describe, expect, test } from "vitest";
import { filterFlag } from "./main.js";

describe("Comparing filtering on individual keys (ex. colours)", () => {
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
    expect(filterFlag(a, c)).toEqual(b);
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
        "Germany",
        "United States",
        "United Kingdom",
        "Venezuela",
        "Netherlands",
        "Romania",
      ],
      full_flag_list,
    ],
  ])("An input of %o should return %o", (a, b, c) => {
    expect(filterFlag(a, c)).toEqual(b);
  });

  test.each([
    [
      {
        hasStars: true,
      },
      ["China", "Australia", "United States", "Venezuela", "European Union"],
      full_flag_list,
    ],
    [
      {
        hasStars: false,
      },
      [
        "Argentina",
        "Canada",
        "Belgium",
        "Germany",
        "United Kingdom",
        "Ukraine",
        "Netherlands",
        "Japan",
        "Switzerland",
        "Romania",
      ],
      full_flag_list,
    ],
  ])("An input of %o should return %o", (a, b, c) => {
    expect(filterFlag(a, c)).toEqual(b);
  });

  test.each([
    [
      {
        stripeDirection: "vertical",
      },
      ["Canada", "Belgium", "Romania"],
      full_flag_list,
    ],
    [
      {
        stripeDirection: "horizontal",
      },
      [
        "Argentina",
        "Germany",
        "United States",
        "Ukraine",
        "Venezuela",
        "Netherlands",
      ],
      full_flag_list,
    ],
    [
      {
        stripeDirection: null,
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
    expect(filterFlag(a, c)).toEqual(b);
  });
});

describe("Comparing filtering on multiple keys (ex. colours)", () => {
  test.each([
    [
      {
        hasStripes: true,
        numberOfColors: 3,
      },
      [
        "Argentina",
        "Belgium",
        "Germany",
        "United States",
        "Venezuela",
        "Netherlands",
        "Romania",
      ],
      full_flag_list,
    ],
    [
      {
        hasStripes: false,
        numberOfColors: 2,
        stripeDirection: null,
      },
      ["China", "European Union", "Japan", "Switzerland"],
      full_flag_list,
    ],
    [
      {
        hasStripes: true,
        numberOfColors: 3,
        stripeDirection: "horizontal",
      },
      ["Argentina", "Germany", "United States", "Venezuela", "Netherlands"],
      full_flag_list,
    ],
  ])("An input of %o should return %o", (a, b, c) => {
    expect(filterFlag(a, c)).toEqual(b);
  });
});

describe("Comparing filtering on multiple keys (incl colours)", () => {
  test.each([
    [
      {
        colours: ["red"],
        numberOfColors: 3,
      },
      [
        "Belgium",
        "Australia",
        "Germany",
        "United States",
        "United Kingdom",
        "Venezuela",
        "Netherlands",
        "Romania",
      ],
      full_flag_list,
    ],
    [
      {
        colours: ["red", "yellow"],
        numberOfColors: 3,
      },
      ["Belgium", "Germany", "Venezuela", "Romania"],
      full_flag_list,
    ],
  ])("An input of %o should return %o", (a, b, c) => {
    expect(filterFlag(a, c)).toEqual(b);
  });
});

describe("Output is appropriate datatype ", () => {
  test("Output should be a array", () => {
    //Arrange
    const a = {
      hasStripes: true,
      hasCircles: true,
    };
    const b = full_flag_list;
    const expected = ["Argentina"];
    //Act
    const actual = filterFlag(a, b);
    //Assert
    expect(actual).toBeInstanceOf(Array);
  });
});
