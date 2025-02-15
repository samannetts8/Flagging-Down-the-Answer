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

describe("Comparing filtering on individual keys (ex. colours)", () => {
  test("An input of hasStripes: true should return the correct flags", () => {
    const a = { hasStripes: true };
    const b = [
      "Argentina",
      "Canada",
      "Belgium",
      "Germany",
      "United States",
      "Ukraine",
      "Venezuela",
      "Netherlands",
      "Romania",
    ];
    expect(filterFlag(a, FULL_FLAG_LIST)).toEqual(b);
  });

  test("An input of hasStripes: false should return the correct flags", () => {
    const a = { hasStripes: false };
    const b = [
      "China",
      "Australia",
      "United Kingdom",
      "European Union",
      "Japan",
      "Switzerland",
    ];
    expect(filterFlag(a, FULL_FLAG_LIST)).toEqual(b);
  });
});

describe("Filtering flags based on search criteria (incl. colours)", () => {
  test("Should return flags with hasStripes: true", () => {
    const searchTerm = { hasStripes: true };
    const expectedOutput = [
      "Argentina",
      "Canada",
      "Belgium",
      "Germany",
      "United States",
      "Ukraine",
      "Venezuela",
      "Netherlands",
      "Romania",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['red']", () => {
    const searchTerm = { colours: ["red"] };
    const expectedOutput = [
      "Canada",
      "Belgium",
      "China",
      "Australia",
      "Germany",
      "United States",
      "United Kingdom",
      "Venezuela",
      "Netherlands",
      "Japan",
      "Switzerland",
      "Romania",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStripes: true and colours: ['red', 'yellow']", () => {
    const searchTerm = { hasStripes: true, colours: ["red", "yellow"] };
    const expectedOutput = ["Belgium", "Germany", "Venezuela", "Romania"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });
});

describe("Output is appropriate datatype", () => {
  test("Output should be an array", () => {
    const a = { hasStripes: true, hasCircles: true };
    const actual = filterFlag(a, FULL_FLAG_LIST);
    expect(Array.isArray(actual)).toBe(true);
  });
});

describe("Additional Tests", () => {
  test("Should return flags with hasCircles: true", () => {
    const searchTerm = { hasCircles: true };
    const expectedOutput = ["Argentina", "Japan"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with stripeDirection: 'vertical'", () => {
    const searchTerm = { stripeDirection: "vertical" };
    const expectedOutput = ["Canada", "Belgium", "Romania"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['blue', 'white']", () => {
    const searchTerm = { colours: ["blue", "white"] };
    const expectedOutput = [
      "Argentina",
      "Australia",
      "United States",
      "United Kingdom",
      "Netherlands",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStripes: false and hasStars: true", () => {
    const searchTerm = { hasStripes: false, hasStars: true };
    const expectedOutput = ["China", "Australia", "European Union"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['red', 'white', 'blue']", () => {
    const searchTerm = { colours: ["red", "white", "blue"] };
    const expectedOutput = [
      "Australia",
      "United States",
      "United Kingdom",
      "Netherlands",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStripes: true and hasCircles: false", () => {
    const searchTerm = { hasStripes: true, hasCircles: false };
    const expectedOutput = [
      "Canada",
      "Belgium",
      "Germany",
      "United States",
      "Ukraine",
      "Venezuela",
      "Netherlands",
      "Romania",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['yellow']", () => {
    const searchTerm = { colours: ["yellow"] };
    const expectedOutput = [
      "Argentina",
      "Belgium",
      "China",
      "Germany",
      "Ukraine",
      "Venezuela",
      "European Union",
      "Romania",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStripes: true and hasStars: true", () => {
    const searchTerm = { hasStripes: true, hasStars: true };
    const expectedOutput = ["United States", "Venezuela"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with stripeDirection: null and hasStars: false", () => {
    const searchTerm = { stripeDirection: null, hasStars: false };
    const expectedOutput = ["United Kingdom", "Japan", "Switzerland"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['black', 'red', 'yellow']", () => {
    const searchTerm = { colours: ["black", "red", "yellow"] };
    const expectedOutput = ["Belgium", "Germany"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStripes: true and stripeDirection: 'vertical'", () => {
    const searchTerm = { hasStripes: true, stripeDirection: "vertical" };
    const expectedOutput = ["Canada", "Belgium", "Romania"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['white', 'red']", () => {
    const searchTerm = { colours: ["white", "red"] };
    const expectedOutput = [
      "Canada",
      "Australia",
      "United States",
      "United Kingdom",
      "Netherlands",
      "Japan",
      "Switzerland",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStars: true and stripeDirection: null", () => {
    const searchTerm = { hasStars: true, stripeDirection: null };
    const expectedOutput = ["China", "Australia", "European Union"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['blue', 'yellow']", () => {
    const searchTerm = { colours: ["blue", "yellow"] };
    const expectedOutput = [
      "Argentina",
      "Ukraine",
      "Venezuela",
      "European Union",
      "Romania",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasCircles: false and stripeDirection: 'horizontal'", () => {
    const searchTerm = { hasCircles: false, stripeDirection: "horizontal" };
    const expectedOutput = [
      "Germany",
      "United States",
      "Ukraine",
      "Venezuela",
      "Netherlands",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStripes: false and hasCircles: true", () => {
    const searchTerm = { hasStripes: false, hasCircles: true };
    const expectedOutput = ["Japan"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with stripeDirection: 'horizontal' and hasStars: false", () => {
    const searchTerm = { stripeDirection: "horizontal", hasStars: false };
    const expectedOutput = ["Argentina", "Germany", "Ukraine", "Netherlands"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with colours: ['red', 'blue']", () => {
    const searchTerm = { colours: ["red", "blue"] };
    const expectedOutput = [
      "Australia",
      "United States",
      "United Kingdom",
      "Venezuela",
      "Netherlands",
      "Romania",
    ];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with hasStripes: true and hasCircles: true", () => {
    const searchTerm = { hasStripes: true, hasCircles: true };
    const expectedOutput = ["Argentina"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });

  test("Should return flags with stripeDirection: 'vertical' and colours: ['red']", () => {
    const searchTerm = { stripeDirection: "vertical", colours: ["red"] };
    const expectedOutput = ["Canada", "Belgium", "Romania"];
    expect(filterFlag(searchTerm, FULL_FLAG_LIST)).toEqual(expectedOutput);
  });
});

describe("random tests", () => {
  // Helper function to generate random search terms
  function generateRandomSearchTerms() {
    const keys = [
      "hasStripes",
      "numberOfColours",
      "hasStars",
      "stripeDirection",
      "hasCircles",
      "colours",
    ];
    const searchTerms = {};

    // Randomly select 1 to 6 keys to include in searchTerms
    const numKeys = Math.floor(Math.random() * 6) + 1;
    const selectedKeys = keys.sort(() => 0.5 - Math.random()).slice(0, numKeys);

    selectedKeys.forEach((key) => {
      if (key === "colours") {
        // Randomly select 1 to 3 colours
        const allColours = [
          "blue",
          "white",
          "yellow",
          "red",
          "black",
          "green",
          "orange",
        ];
        const numColours = Math.floor(Math.random() * 3) + 1;
        searchTerms[key] = allColours
          .sort(() => 0.5 - Math.random())
          .slice(0, numColours);
      } else if (key === "stripeDirection") {
        // Randomly select a stripe direction
        const directions = ["horizontal", "vertical", null];
        searchTerms[key] =
          directions[Math.floor(Math.random() * directions.length)];
      } else if (key === "numberOfColours") {
        // Randomly select a number of colours (1 to 5)
        searchTerms[key] = Math.floor(Math.random() * 5) + 1;
      } else {
        // Randomly assign true/false for boolean keys
        searchTerms[key] = Math.random() < 0.5;
      }
    });

    return searchTerms;
  }

  // Helper function to manually filter the flag list based on search terms
  function manualFilter(searchTerms, fullFlagList) {
    return fullFlagList
      .filter((countryData) => {
        return Object.entries(searchTerms).every(([key, value]) => {
          if (key === "colours") {
            return value.every((colour) => countryData[key].includes(colour));
          }
          return countryData[key] === value;
        });
      })
      .map((countryData) => countryData.country);
  }

  // Randomized test cases
  test("Should pass randomized tests", () => {
    for (let i = 0; i < 20; i++) {
      // Generate random search terms
      const searchTerms = generateRandomSearchTerms();

      // Get the result from your function
      const result = filterFlag(searchTerms, FULL_FLAG_LIST);

      // Get the expected result using manual filtering
      const expected = manualFilter(searchTerms, FULL_FLAG_LIST);

      // Assert that the results match
      expect(result).toEqual(expected);
    }
  });
});
