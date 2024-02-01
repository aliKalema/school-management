import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../interface/teacher";
import {Report} from "../interface/report";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private httpClient: HttpClient = inject(HttpClient)

  getPdf(url: string): Observable<any> {
    return this.httpClient.get(url, { responseType: 'arraybuffer' });
  }

  getReport(): Observable<Array<Report>> {
    return this.httpClient.get<Report[]>('assets/json/report.json');
  }
}
