import { Button, Container, Divider, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import PatientDetails from "./components/PatientDetails";
import { apiBaseUrl } from "./constants";
import PatientListPage from "./PatientListPage";
import { useStateValue } from "./state";
import { Patient } from "./types";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
