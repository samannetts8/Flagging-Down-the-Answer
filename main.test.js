import { FULL_FLAG_LIST } from "./flag_database";
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
    ],
    [
      {
        hasStripes: false,
        numberOfColors: 2,
        stripeDirection: null,
      },
      ["China", "European Union", "Japan", "Switzerland"],
      FULL_FLAG_LIST,
    ],
    [
      {
        hasStripes: true,
        numberOfColors: 3,
        stripeDirection: "horizontal",
      },
      ["Argentina", "Germany", "United States", "Venezuela", "Netherlands"],
      FULL_FLAG_LIST,
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
      FULL_FLAG_LIST,
    ],
    [
      {
        colours: ["red", "yellow"],
        numberOfColors: 3,
      },
      ["Belgium", "Germany", "Venezuela", "Romania"],
      FULL_FLAG_LIST,
    ],
    [
      {
        hasStripes: true,
        numberOfColors: 2,
        hasStars: false,
        stripeDirection: "vertical",
        hasCircles: false,
        colours: ["red", "white"],
      },
      ["Canada"],
      FULL_FLAG_LIST,
    ],
  ])("An input of %o should return %o", (a, b, c) => {
    expect(filterFlag(a, c)).toEqual(b);
  });
});

describe("Output is appropriate datatype ", () => {
  test("Output should be an array", () => {
    //Arrange
    const a = {
      hasStripes: true,
      hasCircles: true,
    };
    const b = FULL_FLAG_LIST;

    //Act
    const actual = filterFlag(a, b);
    //Assert
    expect(actual).toBeInstanceOf(Array);
  });
});
