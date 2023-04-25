import _ from "lodash";

export default function getRandomNumberInRange(
  min: Number,
  max: Number,
  exclude: Number
) {
  let randomNumber;

  do {
    randomNumber = _.random(min.valueOf(), max.valueOf());
  } while (randomNumber.valueOf() === exclude.valueOf()); // Loop until a number other than exclude is generated

  return randomNumber;
}
