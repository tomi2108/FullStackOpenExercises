"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNonSensitivePatients = void 0;
const patients_1 = require("../data/patients");
const getNonSensitivePatients = () => {
    return patients_1.patients.map(({ id, gender, name, dateOfBirth, occupation }) => ({ id, gender, name, dateOfBirth, occupation }));
};
exports.getNonSensitivePatients = getNonSensitivePatients;
