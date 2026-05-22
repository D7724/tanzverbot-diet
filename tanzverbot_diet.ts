import { Person, Sex } from "./person.ts";

const foodNames: string[] = [
  "Kellogg's Tresor",
  "Weihenstephan Haltbare Milch",
  "Mühle Frikadellen",
  "Volvic Tee",
  "Neuburger lockerer Sahnepudding",
  "Lagnese Viennetta",
  "Schöller 10ForTwo",
  "Ristorante Pizza Salame",
  "Schweppes Ginger Ale",
  "Mini Babybel",
];
const foodCalories: number[] = [137, 64, 271, 40, 297, 125, 482, 835, 37, 59];
const foodServings: number[] = [4, 8, 4, 12, 1, 6, 2, 2, 25, 20];
const CALORIES_PER_KG = 9000;

export function calcDateOnDiet(person: Person): number {
  validationPerson(person);
  const weightGainKg = person.toWeight - person.fromWeight;
  const dailyCaloriesOnDiet = calculateDailyCaloriesOnDiet();
  const dailyCaloriesBasicMetabolicRate = calculateMetabolicRate(person);
  const dailyExcessCalories = dailyCaloriesOnDiet -
    dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil((CALORIES_PER_KG * weightGainKg) / dailyExcessCalories);
}

function validationPerson(person: Person) {
  if (person.toWeight - person.fromWeight < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }
  if (person.age < 16 || person.height < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
}

function calculateDailyCaloriesOnDiet() {
  let dailyCaloriesOnDiet = 0;
  for (const index in foodNames) {
    const calories = foodCalories[index] || 0;
    const servings = foodServings[index] || 0;
    dailyCaloriesOnDiet += calories * servings;
  }
  return dailyCaloriesOnDiet;
}

function calculateMetabolicRate(person: Person) {
  if (person.sex == Sex.Male) {
    return calculateMaleMetabolicRate(person);
  } else {
    return calculateFemaleMetabolicRate(person);
  }
}

function calculateMaleMetabolicRate(person: Person) {
  return Math.ceil(
    // Harris-Benedict-Formula (Male)
    66.47 + 13.7 * person.fromWeight + 5.003 * person.height * 100.0 -
      6.75 * person.age,
  );
}

function calculateFemaleMetabolicRate(person: Person) {
  return Math.ceil(
    // Harris-Benedict-Formula (Female)
    655.1 + 9.563 * person.fromWeight + 1.85 * person.height * 100.0 -
      4.676 * person.age,
  );
}
