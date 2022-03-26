import {
  Discharge,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
} from "../types";

const parseToString = (name: unknown, value: string): string => {
  if (!name || !isString(name))
    throw new Error(`incorrect or missing ${value}`);
  return name;
};
const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String;

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

type Fields = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  healthCheckRating?: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
};

const parseType = (
  type: unknown
): "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  if (isHealthCheck(type) || isHospital(type) || isOccupationalHealthcare(type))
    return type;
  throw new Error("Incorret or missing entry type");
};
const isHealthCheck = (param: any): param is "HealthCheck" =>
  param === "HealthCheck";

const isHospital = (param: any): param is "Hospital" => param === "Hospital";

const isOccupationalHealthcare = (
  param: any
): param is "OccupationalHealthcare" => param === "OccupationalHealthcare";

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealtCheckRating(rating))
    throw new Error(`incorrect or missing health check rating`);
  return rating;
};

const isHealtCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseDischarge = (discharge: unknown): Discharge => {
  console.log(discharge);
  if (isDischarge(discharge)) return discharge;
  throw new Error("incorrect or missing discharge");
};

const isDischarge = (param: any): param is Discharge => {
  if (isDate(param.date) && isString(param.criteria)) return true;
  return false;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (isSickLeave(sickLeave)) return sickLeave;
  throw new Error("incorret or missing sick leave");
};
const isSickLeave = (param: any): param is SickLeave => {
  if (isDate(param.startDate) && isDate(param.endDate)) return true;
  return false;
};

export const toNewEntry = ({
  id,
  description,
  date,
  specialist,
  type,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: Fields): Entry | undefined => {
  const newEntry = {
    id: parseToString(id, "id"),
    description: parseToString(description, "description"),
    date: parseDate(date),
    specialist: parseToString(specialist, "specialist"),
  };
  if (parseType(type) === "HealthCheck") {
    const healthEntry: HealthCheckEntry = {
      ...newEntry,
      type: parseType(type) as "HealthCheck",
      healthCheckRating: parseHealthCheckRating(healthCheckRating),
    };
    return healthEntry;
  }
  if (parseType(type) === "Hospital") {
    console.log(discharge);
    const hospitalEntry: HospitalEntry = {
      ...newEntry,
      type: parseType(type) as "Hospital",
      discharge: parseDischarge(discharge),
    };
    return hospitalEntry;
  }

  if (parseType(type) === "OccupationalHealthcare") {
    const OccupationalHealthcareEntry: OccupationalHealthcareEntry = {
      ...newEntry,
      type: parseType(type) as "OccupationalHealthcare",
      employerName: parseToString(employerName, "employer name"),
      sickLeave: parseSickLeave(sickLeave),
    };
    return OccupationalHealthcareEntry;
  }
  return undefined;
};
