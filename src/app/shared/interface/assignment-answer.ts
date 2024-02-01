export interface AssignmentAnswer {
  assignmentId: number;
  studentId: number;
  answers: Map<string,string>;
  submitionDate: string;
  attachementUrl: Array<string>;
}
