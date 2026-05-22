import { Person, Sex } from "./person.ts";
import { calcDateOnDiet } from "./tanzverbot_diet.ts";

const person: Person = {
  fromWeight: 78.0,
  toWeight: 100,
  height: 1.88,
  age: 38,
  sex: Sex.Male,
};
const days = calcDateOnDiet(person);
console.log(`You need to diet for ${days} days to reach your target.`);
