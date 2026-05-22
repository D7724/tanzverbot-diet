import { assertEquals, assertGreater } from "@std/assert";
import { calcDateOnDiet } from "./tanzverbot_diet.ts";
import { Person, Sex } from "./person.ts";

Deno.test("Tanzverbot Diet", () => {
  const person: Person = {
    fromWeight: 74,
    toWeight: 100,
    height: 1.86,
    age: 38,
    sex: Sex.Male,
  };
  assertGreater(calcDateOnDiet(person), 0.0);
});

Deno.test("Tanzverbot Diet Female", () => {
  const person: Person = {
    fromWeight: 74,
    toWeight: 100,
    height: 1.86,
    age: 38,
    sex: Sex.Female,
  };
  assertEquals(calcDateOnDiet(person), 35);
});
