interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart
