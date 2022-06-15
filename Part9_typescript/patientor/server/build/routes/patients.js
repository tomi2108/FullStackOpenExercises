"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = require("../services/patientsService");
const toNewEntry_1 = require("../utils/toNewEntry");
const toNewPatient_1 = require("../utils/toNewPatient");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send((0, patientsService_1.getNonSensitivePatients)());
});
router.post("/:id/entries", (req, res) => {
    const id = req.params.id;
    const entry = (0, toNewEntry_1.toNewEntry)(req.body);
    if (typeof entry === "undefined") {
        res.status(400).json({ error: "bad entry" });
        return;
    }
    const newPatient = (0, patientsService_1.updatePatient)(id, entry);
    res.json(newPatient);
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = patientsService_1.patients.find((p) => p.id === id);
    if (typeof patient === "undefined") {
        res.status(400).send({ error: "patient not found" });
        return;
    }
    res.json(patient);
});
router.post("/", (req, res) => {
    try {
        const patientToAdd = (0, toNewPatient_1.toNewPatient)(req.body);
        const newPatient = (0, patientsService_1.addPatient)(patientToAdd);
        res.json(newPatient);
    }
    catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error)
            errorMessage += " Error: " + error.message;
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
