import axios from "axios";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setPatientForDetails, useStateValue } from "../state";
import { Patient } from "../types";

const PatientDetails = () => {
  const [{ patientForDetails }, dispatch] = useStateValue();
  const match = useMatch("/patients/:id");

  useEffect(() => {
    const fetchPatientList = async () => {
      if (typeof match?.params.id === "undefined") return;
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${match.params.id}`
        );
        dispatch(setPatientForDetails(patient));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <>
      <h1>{patientForDetails.name}</h1>
      <p>occupation: {patientForDetails.occupation}</p>
    </>
  );
};

export default PatientDetails;
