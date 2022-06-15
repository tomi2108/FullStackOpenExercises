"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const uuid_1 = require("uuid");
const types_1 = require("../types");
const parseToString = (name, value) => {
    if (!name || !isString(name))
        throw new Error(`incorrect or missing ${value}`);
    return name;
};
const isString = (text) => typeof text === "string" || text instanceof String;
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseType = (type) => {
    if (isHealthCheck(type) || isHospital(type) || isOccupationalHealthcare(type))
        return type;
    throw new Error("Incorret or missing entry type");
};
const isHealthCheck = (param) => param === "HealthCheck";
const isHospital = (param) => param === "Hospital";
const isOccupationalHealthcare = (param) => param === "OccupationalHealthcare";
const parseHealthCheckRating = (rating) => {
    if (!rating || !isHealtCheckRating(rating))
        throw new Error(`incorrect or missing health check rating`);
    return rating;
};
const isHealtCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseDischarge = (discharge) => {
    if (isDischarge(discharge))
        return discharge;
    throw new Error("incorrect or missing discharge");
};
const isDischarge = (param) => {
    if (isDate(param.date) && isString(param.criteria))
        return true;
    return false;
};
const parseSickLeave = (sickLeave) => {
    if (isSickLeave(sickLeave))
        return sickLeave;
    throw new Error("incorret or missing sick leave");
};
const isSickLeave = (param) => {
    if (isDate(param.startDate) && isDate(param.endDate))
        return true;
    return false;
};
const toNewEntry = ({ description, date, specialist, type, healthCheckRating, discharge, employerName, sickLeave, }) => {
    const newEntry = {
        id: (0, uuid_1.v1)(),
        description: parseToString(description, "description"),
        date: parseDate(date),
        specialist: parseToString(specialist, "specialist"),
    };
    if (parseType(type) === "HealthCheck") {
        const healthEntry = Object.assign(Object.assign({}, newEntry), { type: parseType(type), healthCheckRating: parseHealthCheckRating(healthCheckRating) });
        return healthEntry;
    }
    if (parseType(type) === "Hospital") {
        const hospitalEntry = Object.assign(Object.assign({}, newEntry), { type: parseType(type), discharge: parseDischarge(discharge) });
        return hospitalEntry;
    }
    if (parseType(type) === "OccupationalHealthcare") {
        const OccupationalHealthcareEntry = Object.assign(Object.assign({}, newEntry), { type: parseType(type), employerName: parseToString(employerName, "employer name"), sickLeave: parseSickLeave(sickLeave) });
        return OccupationalHealthcareEntry;
    }
    return undefined;
};
exports.toNewEntry = toNewEntry;
