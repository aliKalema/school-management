import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../interface/subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private httpClient: HttpClient = inject(HttpClient);

  public getSubjects(): Observable<Array<Subject>>{
    return this.httpClient.get<Array<Subject>>('assets/json/subject.json');
  }
}
