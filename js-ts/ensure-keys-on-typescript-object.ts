// Ensures key is on an object.

type Colors = "red" | "green" | "blue";
// Ensure that we have exactly the keys from 'Colors'.
const favoriteColors = {
  red: "yes",
  green: false,
  // blue: "kinda", <-- This will also cause an error on line 11 because blue must be included.
  platypus: false,
  //  ~~~~~~~~~~ error - "platypus" was never listed in 'Colors'.
} satisfies Record<Colors, unknown>;
// All the information about the 'red', 'green', and 'blue' properties are retained.
const g: boolean = favoriteColors.green;
