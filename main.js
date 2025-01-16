/**
 * Hello bootcampers!
 *
 * A career in tech brings with it countless advantages, not least of all being the flexible working arrangements that many roles offer us.
 * However, being that we're all such big thinkers, sometimes smaller details of life evade us, such as:
 * What did I eat for dinner last night? Where did I put my keys?...What country am I in again?...
 *
 * Imagine you've had one of these moments and all you've got to go off is a waving flag in front of you. Your challenge is to write a function that,
 * when given some characteristics of the flag, interact with the provided flag 'library' and return the country/countries that you may be in!
 *
 * For reference, for each country held within the list, all details for that country's flag is stored in an object with the following keys:
 *  {
 *   country: "XXX",
 *   hasStripes: boolean,
 *   numberOfColors: int,
 *   hasStars: boolean,
 *   stripeDirection: string, (can be "horizontal", "vertical" or null)
 *   hasCircles: boolean, // The sun is a circle
 *   colours: [string, string, string,etc],
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
 *
 *
 * Best of luck!!
 */
export function filterFlag(search_terms, full_flag_list) {
  const output = [];
  const attribute = Object.keys(search_terms)[0];
  const full_flag_count = full_flag_list.length;
  for (let i = 0; i < full_flag_count; i++) {
    if (full_flag_list[i][attribute] === search_terms[attribute]) {
      output.push(full_flag_list[i].country);
    }
  }
  return output;
}











// for (const country_entry in full_flag_list) {
//     if (full_flag_list[attribute] === search_terms[attribute]) {
//       output.append(full_flag_list[country_entry.country]);
//     }
//   }
