import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private httpClient: HttpClient = inject(HttpClient);

  getTeachers(): Observable<Array<Teacher>> {
    return this.httpClient.get<Teacher[]>('assets/json/teacher.json');
  }
}
