import { diagnoses } from "../data/diagnoses";
import { Diagnose } from "../types";

export const getDiagnoses = (): Array<Diagnose> => diagnoses;
