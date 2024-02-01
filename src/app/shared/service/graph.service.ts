import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../interface/teacher";
import {Summary} from "../interface/summary";
import {BarSummary} from "../interface/bar-summary";
import {LatenessSummary} from "../interface/lateness-summary";

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private httpClient = inject(HttpClient);

  getTeacherPerformance(): Observable<Array<Summary>> {
    return this.httpClient.get<Summary[]>('assets/json/teacher_perfomance.json');
  }

  getSubjectPerformance(): Observable<Array<BarSummary>> {
    return this.httpClient.get<BarSummary[]>('assets/json/subject_rank.json');
  }

  getLateness(): Observable<LatenessSummary> {
    return this.httpClient.get<LatenessSummary>('assets/json/lateness.json');
  }
}
