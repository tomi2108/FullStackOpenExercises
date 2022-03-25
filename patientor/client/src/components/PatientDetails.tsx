import axios from "axios";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setDiagnoses, setPatientForDetails, useStateValue } from "../state";
import { Diagnose, Patient } from "../types";
import EntryDetails from "./Entry";

const PatientDetails = () => {
  const [{ patientForDetails, diagnoses }, dispatch] = useStateValue();
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
      </div>
    </>
  );
};

export default PatientDetails;
