import {inject, Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Teacher} from "../interface/teacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private httpClient: HttpClient = inject(HttpClient);

  getTeachers(): Observable<Array<Teacher>> {
    return this.httpClient.get<Teacher[]>('assets/json/teacher.json');
  }

  getTeacher(employeeId: string): Observable<Teacher | undefined>{
    return this.getTeachers().pipe(
      map(teachers => teachers.find(teacher => teacher.employeeId === employeeId))
    );
  }
}
