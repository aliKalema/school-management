import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Teacher} from "../interface/teacher";
import {HttpClient} from "@angular/common/http";
import {Feedback} from "../interface/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private httpClient = inject(HttpClient);

  getFeedBacks(): Observable<Array<Feedback>> {
    return this.httpClient.get<Feedback[]>('assets/json/feedback.json');
  }
}
