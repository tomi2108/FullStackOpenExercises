import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import {
  setDiagnoses,
  setPatientForDetails,
  setPatientList,
  useStateValue,
} from "../state";
import { Diagnose, EntryTypes, Patient } from "../types";
import { EntryFormValues } from "./AddEntryForm";
import AddEntryModal from "./AddEntryModal";
import EntryDetails from "./Entry";

const PatientDetails = () => {
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError;
    undefined;
  };

  const [{ patientForDetails, diagnoses, patients }, dispatch] =
    useStateValue();
  const match = useMatch("/patients/:id");

  useEffect(() => {
    const fetchPatientList = async () => {
      if (typeof match?.params.id === "undefined") return;
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${match.params.id}`
        );
        const { data: diagnoses } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setPatientForDetails(patient));
        dispatch(setDiagnoses(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  const submitEntry = async (values: EntryFormValues) => {
    const { type } = values;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newEntry: any = {
      type: type,
      id: values.id,
      description: values.description,
      date: values.date,
      specialist: values.specialist,
    };
    if (newEntry.type === EntryTypes.HealthCheck) {
      newEntry.healthCheckRating = values.healthCheckRating;
    }
    if (newEntry.type === EntryTypes.Hospital) {
      newEntry.discharge = {
        date: values.dischargeDate,
        criteria: values.dischargeCriteria,
      };
      console.log(newEntry);
    }
    console.log(newEntry);
    if (newEntry.type === EntryTypes.OccupationalHealthcare) {
      newEntry.employerName = values.employerName;
      newEntry.sickLeave = {
        startDate: values.startDate,
        endDate: values.endDate,
      };
    }
    try {
      const res = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientForDetails.id}/entries`,
        newEntry
      );
      const newPatient: Patient = res.data;
      const PatientsArray = Object.values(patients);
      const updatedPatients = PatientsArray.map((p) =>
        p.id === patientForDetails.id ? newPatient : p
      );
      dispatch(setPatientList(updatedPatients));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <>
      <h1>
        {patientForDetails.name} {patientForDetails.gender}
      </h1>
      <p>occupation: {patientForDetails.occupation}</p>
      <h3>Entries</h3>
      <div>
        {patientForDetails.entries.map((e) => {
          return (
            <div key={e.id}>
              <EntryDetails entry={e} />
              <ul>
                {e.diagnosisCodes?.map((c) => {
                  const diagnose = diagnoses.find((d) => d.code === c);
                  if (typeof diagnose === "undefined") return null;
                  return (
                    <li key={diagnose.code}>
                      {diagnose.code} {diagnose.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitEntry}
          error={error}
          onClose={closeModal}
        />
        <Button color="primary" variant="contained" onClick={() => openModal()}>
          Add Entry
        </Button>
      </div>
    </>
  );
};

export default PatientDetails;
