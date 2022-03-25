interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseRequirementsPart extends CourseWithDescription {
  requirements: string[];
  type: "special";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseNormalPart extends CourseWithDescription {
  type: "normal";
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementsPart;
