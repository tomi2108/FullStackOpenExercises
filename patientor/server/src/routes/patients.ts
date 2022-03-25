import express from "express";
import {
  addPatient,
  getNonSensitivePatients,
  patients,
  updatePatient,
} from "../services/patientsService";
import { toNewEntry } from "../utils/toNewEntry";
import { toNewPatient } from "../utils/toNewPatient";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const entry = toNewEntry(req.body);
  if (typeof entry === "undefined") {
    res.status(400).json({ error: "bad entry" });
    return;
  }
  const newPatient = updatePatient(id, entry);
  res.json(newPatient);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patients.find((p) => p.id === id);
  if (typeof patient === "undefined") {
    res.status(400).send({ error: "patient not found" });
    return;
  }
  res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const patientToAdd = toNewPatient(req.body);
    const newPatient = addPatient(patientToAdd);
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error) errorMessage += " Error: " + error.message;

    res.status(400).send(errorMessage);
  }
});

export default router;
