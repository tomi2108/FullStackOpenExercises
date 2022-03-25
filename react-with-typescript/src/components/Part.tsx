import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <>
          <h4>{part.name}</h4>
          <p>{part.description}</p>
          <p>Exercise count {part.exerciseCount}</p>
        </>
      );
    case "groupProject":
      return (
        <>
          <h4>{part.name}</h4>
          <p> Exercise count {part.exerciseCount}</p>
          <p>Group project Count {part.groupProjectCount}</p>
        </>
      );
    case "submission":
      return (
        <>
          <h4>{part.name}</h4>
          <p>{part.description}</p>
          <p>Exercise count {part.exerciseCount}</p>
          <a>{part.exerciseSubmissionLink}</a>
        </>
      );
    case "special":
      return (
        <>
          <h4>{part.name}</h4>
          <p>{part.description}</p>
          <p>Exercise Count {part.exerciseCount}</p>
          <ul>
            Requirements:
            {part.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      );
    default:
      return null;
  }
};

export default Part;
