import { Gender, newPatient } from "../src/types";

const parseToString = (name: unknown, value: string): string => {
  if (!name || !isString(name)) throw new Error(`incorrect or missing ${value}`);
  return name;
};
const isString = (text: unknown): text is string => typeof text === "string" || text instanceof String;

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) throw new Error(`incorrect or missing gender`);
  return gender;
};
const isGender = (gender: any): gender is Gender => Object.values(Gender).includes(gender);

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const toNewPatient = (object: any): newPatient | undefined => {
  const newEntry: newPatient = {
    name: parseToString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseToString(object.occupation, "occupation"),
  };
  console.log(object.ssn, Boolean(object.ssn));
  if (object.ssn) newEntry["ssn"] = object.ssn;
  console.log(newEntry);
  return newEntry;
};
