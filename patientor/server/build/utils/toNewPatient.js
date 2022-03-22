"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("../types");
const parseToString = (name, value) => {
    if (!name || !isString(name))
        throw new Error(`incorrect or missing ${value}`);
    return name;
};
const isString = (text) => typeof text === "string" || text instanceof String;
const parseGender = (gender) => {
    if (!gender || !isGender(gender))
        throw new Error(`incorrect or missing gender`);
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn }) => {
    const newEntry = {
        name: parseToString(name, "name"),
        dateOfBirth: parseDate(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseToString(occupation, "occupation"),
    };
    if (ssn)
        newEntry["ssn"] = parseToString(ssn, "ssn");
    return newEntry;
};
exports.toNewPatient = toNewPatient;
