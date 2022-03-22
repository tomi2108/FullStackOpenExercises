import { Gender, newPatient } from "../types";

const parseToString = (name: unknown, value: string): string => {
  if (!name || !isString(name)) throw new Error(`incorrect or missing ${value}`);
  return name;
};
const isString = (text: unknown): text is string => typeof text === "string" || text instanceof String;

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) throw new Error(`incorrect or missing gender`);
  return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

type Fields = { name: unknown; dateOfBirth: unknown; gender: unknown; occupation: unknown; ssn?: unknown };

export const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn }: Fields): newPatient => {
  const newEntry: newPatient = {
    name: parseToString(name, "name"),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseToString(occupation, "occupation"),
  };
  if (ssn) newEntry["ssn"] = parseToString(ssn, "ssn");
  return newEntry;
};
