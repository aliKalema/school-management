import {inject, Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Teacher} from "../interface/teacher";
import {HttpClient} from "@angular/common/http";
import {Student} from "../interface/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private httpClient = inject(HttpClient);

  getStudents(): Observable<Array<Student>> {
    return this.httpClient.get<Student[]>('assets/json/student.json');
  }

  getStudent(id: number): Observable<Student | undefined>{
    return this.getStudents().pipe(
      map(students => students.find(student => student.id === id))
    );
  }

  getByClass(id: string) {

  }

  getStudentsByGrade(grade: string): Observable<Student[]> {
    return this.getStudents().pipe(
      map(students => students.filter(student => student.class === grade))
    );
  }
}
