export interface Assignment {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  subjectId: number;
  questions: Array<String>;
  assignedId: Array<Number>
  attachementUrl: Array<string>;
}
