export interface Person {
  fromWeight: number;
  toWeight: number;
  height: number;
  age: number;
  sex: Sex;
}

export enum Sex {
  Male = "m",
  Female = "f",
}
