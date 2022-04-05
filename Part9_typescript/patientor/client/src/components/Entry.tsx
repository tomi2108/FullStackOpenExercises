import FavoriteIcon from "@mui/icons-material/Favorite";
import { Entry, EntryTypes } from "../types";

type EntryProps = {
  entry: Entry;
};

const EntryDetails = ({ entry }: EntryProps) => {
  const entryStyles = {
    border: "solid 1px black",
    borderRadius: "5px",
  };
  switch (entry.type) {
    case EntryTypes.HealthCheck:
      return (
        <div style={entryStyles}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>Health check rating :{entry.healthCheckRating}</p>
          <p>diagnose by {entry.specialist}</p>
          <FavoriteIcon color="success" />
        </div>
      );
    case EntryTypes.Hospital:
      return (
        <div style={entryStyles}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>Discharge date: {entry.discharge.date}</p>
          <p>Discharge criteria: {entry.discharge.criteria}</p>
          <p>diagnose by {entry.specialist}</p>
          <FavoriteIcon color="info" />
        </div>
      );
    case EntryTypes.OccupationalHealthcare:
      return (
        <div style={entryStyles}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>Employer name{entry.employerName}</p>
          <p>Start date: {entry.sickLeave?.startDate}</p>
          <p>End date: {entry.sickLeave?.endDate}</p>

          <p>diagnose by {entry.specialist}</p>
          <FavoriteIcon color="error" />
        </div>
      );
    default:
      return null;
  }
};

export default EntryDetails;
