import { v1 as uuid } from "uuid";
import { patients } from "../data/patients";
import { newPatient, nonSensitivePatient, Patient } from "../types";

const newId = uuid();

export const getNonSensitivePatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, gender, name, dateOfBirth, occupation }) => ({ id, gender, name, dateOfBirth, occupation }));
};

export const addPatient = (entry: newPatient | undefined): Patient | null => {
  if (!entry) throw new Error("bad request");
  const newPatient: Patient = { ...entry, id: newId };
  patients.push(newPatient);
  return newPatient;
};
