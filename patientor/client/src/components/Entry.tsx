import FavoriteIcon from "@mui/icons-material/Favorite";
import { Entry } from "../types";

type EntryProps = {
  entry: Entry;
};

const EntryDetails = ({ entry }: EntryProps) => {
  const entryStyles = {
    border: "solid 1px black",
    borderRadius: "5px",
  };
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div style={entryStyles}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
          <FavoriteIcon color="success" />
        </div>
      );
    case "Hospital":
      return (
        <div style={entryStyles}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
          <FavoriteIcon color="warning" />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={entryStyles}>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>diagnose by {entry.specialist}</p>
          <FavoriteIcon color="error" />
        </div>
      );
    default:
      return null;
  }
};

export default EntryDetails;
