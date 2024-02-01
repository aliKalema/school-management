import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {AngularSplitModule} from "angular-split";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MaterialModule} from "../../../material.module";
import {DatePipe} from "@angular/common";
import {Feedback, Message} from "../../../shared/interface/feedback";
import {FeedbackService} from "../../../shared/service/feedback.service";

export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-feed-back',
  standalone: true,
  imports: [
    AngularSplitModule,
    MaterialModule,
    DatePipe
  ],
  templateUrl: './feed-back.component.html',
  styleUrl: './feed-back.component.css'
})
export class FeedBackComponent implements OnInit{
  currentLocation: Link = {
    path: ["teacher", "feedback"],
    title: "Feedback",
    url: "",
    expanded: false
  }
  private feedbackService = inject(FeedbackService);
  private navigationService: NavigationService = inject(NavigationService);
  feedBacks: Array<Feedback> =[];
  messages: Array<Message> = [];
  ngOnInit() {
    this.navigationService.setCurrentLocation(this.currentLocation);
    this.feedbackService.getFeedBacks().subscribe((res)=>{
      this.feedBacks = res;
      if(this.feedBacks.length>0){
        this.updateMessages(this.feedBacks[0]);
      }
    })
  }

  updateMessages(feedBack: Feedback) {
    this.messages = feedBack.messages;
  }
}
