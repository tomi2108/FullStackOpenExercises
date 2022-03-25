import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((p) => {
        return <Part key={p.name} part={p} />;
      })}
    </div>
  );
};

export default Content;
