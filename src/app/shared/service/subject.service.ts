import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Subject} from "../interface/subject";
import {Teacher} from "../interface/teacher";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private httpClient: HttpClient = inject(HttpClient);

  public getSubjects(): Observable<Array<Subject>>{
    return this.httpClient.get<Array<Subject>>('assets/json/subject.json');
  }

  public getSubject(id: number): Observable<Subject | undefined>{
    return this.getSubjects().pipe(
      map(subjects => subjects.find(subject => subject.id === id)),
    );
  }
}
