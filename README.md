# Flagging Down the Answer

## Project Summary

The aim of this project was to create a fun and engaging Javascript challenge that would test its user's ability to interact with object arguments and use the provided information to return an array of valid matches.

## Project Description

For this project, you are aiming to create a function that filters a list of countries based on the characteristics of their flags. The function, filterFlag, takes two arguments: an object containing the search terms (characteristics of the flag) and an array of flag data (FULL_FLAG_LIST). The function returns an array of country names that match the given characteristics.

- [Installation](#installation)
- [Data Structure](#data-structure)
- [Testing](#testing)
- [Function Requirements](#Function-Requirements)
- [Constraints](#Constraints)
- [Example Usage](#Example-Usage)
- [Evaluation Criteria](#Evaluation-Criteria)
- [Project Requirements](#Project-Requirements)

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:samannetts8/Flagging-Down-the-Answer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Flagging-Down-the-Answer
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

### Data Structures

Each country's flag is represented by an object with the following keys:

- `country`: string
- `hasStripes`: boolean
- `numberOfColors`: int
- `hasStars`: boolean
- `stripeDirection`: string (can be "horizontal", "vertical" or null)
- `hasCircles`: boolean
- `colours`: [string, string, string] (an array containing varying number of strings)

### Testing

To run the tests, use the following command:

```sh
npm test
```

Ensure that Vitest is installed as a development dependency:

```sh
npm install --save-dev vitest
```

Ensure that Vitest is installed as a development dependency:

### Function Requirements

The `filterFlag` function should:

1. Handle input objects with varying sets of characteristics.
2. Return the names of the countries that match the given characteristics.

### Constraints

Input Constraints:

- The function must handle input objects with up to 6 keys.
- Input will never be null.
- All input keys will have corresponding values in the `FULL_FLAG_LIST` object.
- The function should return an array of strings representing country names.

Output Format:

- Output should be returned as a array of strings, e.g. ['Belgium', 'Germany', 'Venezuela', 'Romania']

### Example Usage

- `filterFlag({hasStripes: true, hasCircles: true}, FULL_FLAG_LIST)` should return `['Argentina']` as this is the only flag with both stripes and a circle.
- `filterFlag({colours: ['red', 'yellow'], numberOfColors: 3}, FULL_FLAG_LIST)` should return `['Belgium', 'Germany', 'Venezuela', 'Romania']`.
- `filterFlag({hasStripes: false, numberOfColors: 2, stripeDirection: null}, FULL_FLAG_LIST)` should return `['China', 'European Union', 'Japan', 'Switzerland']`.

### Evaluation Criteria

- Correctness: Your code must pass all test cases
- Input will never be null
- All input keys will have a corresponding value in the object FULL_FLAG_LIST

## Project Requirements

- Design a full suite of tests to evaluate the proposed solution against various input objects.
- Ensure the function meets all technical constraints and limitations.
- Provide clear and comprehensive documentation for users and contributors.
