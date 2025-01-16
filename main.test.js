import { full_flag_list } from "./flag_database";
import { describe, expect, test } from "vitest";
import { filterFlag } from "./main.js";

test("should only return Argentina for hasStripes(true) and hasCircles(true)", () => {
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
  expect(actual).toEqual(expect.arrayContaining(expected));
});
