"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getNonSensitivePatients = void 0;
const uuid_1 = require("uuid");
const patients_1 = require("../data/patients");
const newId = (0, uuid_1.v1)();
const getNonSensitivePatients = () => {
    return patients_1.patients.map(({ id, gender, name, dateOfBirth, occupation }) => ({ id, gender, name, dateOfBirth, occupation }));
};
exports.getNonSensitivePatients = getNonSensitivePatients;
const addPatient = (entry) => {
    if (!entry)
        throw new Error("bad request");
    const newPatient = Object.assign(Object.assign({}, entry), { id: newId });
    patients_1.patients.push(newPatient);
    return newPatient;
};
exports.addPatient = addPatient;
