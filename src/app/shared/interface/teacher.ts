import {Session} from "./session";

export interface Teacher {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjectsTaught: string[];
  sessions: Array<Session>
}
