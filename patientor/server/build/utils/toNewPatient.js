"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("../src/types");
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
const isGender = (gender) => Object.values(types_1.Gender).includes(gender);
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const toNewPatient = (object) => {
    const newEntry = {
        name: parseToString(object.name, "name"),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseToString(object.occupation, "occupation"),
    };
    if (object.ssn)
        newEntry["ssn"] = object.ssn;
    return newEntry;
};
exports.toNewPatient = toNewPatient;
