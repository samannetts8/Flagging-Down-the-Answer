/**
 * Hello bootcampers!
 *
 * A career in tech brings with it countless advantages, not least of all being the flexible working arrangements that many roles offer us.
 * However, being that we're all such big thinkers, sometimes smaller details of life evade us, such as:
 * What did I eat for dinner last night? Where did I put my keys?...What country am I in again?...
 *
 * Imagine you've had one of these moments and all you've got to go off is a waving flag in front of you. Your challenge is to write a function that,
 * when given some characteristics of the flag, interact with the provided flag 'library' (full_flag_list) and return the country/countries that you may be in!
 *
 * For reference, for each country held within the list, all details for that country's flag is stored in an object with the following keys:
 *
 *  {
 *   country: string,
 *   hasStripes: boolean,
 *   numberOfColors: int,
 *   hasStars: boolean,
 *   stripeDirection: string, (can be "horizontal", "vertical" or null)
 *   hasCircles: boolean,
 *   colours: [string, string, string], (Can be an array containing varying number of strings)
 * }
 *
 * A couple of extra notes for this challenge include:
 *      Any images of the sun is counted as a circle
 *      Flags with crosses (e.g. the UK) or no stripes will be marked as null
 *
 * Your function should handle input objects with varying sets of characteristics, and only return the names of the countries. You can assume that all provided attributes have corresponding entries in the full_flag_list object.
 *
 * A few examples:
 *      filterFlag({hasStripes: true, hasCircles: true},full_flag_list) should return ['Argentina'] as this is the only flag with both stripes and a circle
 *      filterFlag({colours: [ 'red', 'yellow' ], numberOfColors: 3}) should return [ 'Belgium', 'Germany', 'Venezuela', 'Romania']
 *      filterFlag({hasStripes: false, numberOfColors: 2, stripeDirection: null}) should return [ 'China', 'European Union', 'Japan', 'Switzerland' ])
 *
 * Best of luck!!
 */
export function filterFlag(search_terms, full_flag_list) {
  let filtered_list = full_flag_list;
  for (const attribute in search_terms) {
    if (attribute === "colours") {
      for (const colour of search_terms[attribute]) {
        filtered_list = filtered_list.filter((country_data) =>
          country_data[attribute].includes(colour)
        );
      }
    } else {
      filtered_list = filtered_list.filter(
        (country_data) => search_terms[attribute] === country_data[attribute]
      );
    }
  }
  let output = [];
  for (const country_data of filtered_list) {
    output.push(country_data.country);
  }
  return output;
}
