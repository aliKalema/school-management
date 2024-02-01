import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {AngularSplitModule} from "angular-split";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MaterialModule} from "../../../material.module";
import {DatePipe} from "@angular/common";

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
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  private navigationService: NavigationService = inject(NavigationService);
  ngOnInit() {
    this.navigationService.setCurrentLocation(this.currentLocation);
  }
}
