import express from "express";
import {
  addPatient,
  getNonSensitivePatients,
} from "../services/patientsService";
import { toNewPatient } from "../utils/toNewPatient";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = getNonSensitivePatients().find((p) => p.id === id);
  if (typeof patient === "undefined") {
    res.status(400).send({ error: "patient not found" });
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
