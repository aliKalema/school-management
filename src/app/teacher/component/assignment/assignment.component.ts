import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {MaterialModule} from "../../../material.module";
import {AngularSplitModule} from "angular-split";
import {DatePipe} from "@angular/common";
import {Section} from "../feed-back/feed-back.component";

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [MaterialModule, AngularSplitModule, DatePipe],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent implements OnInit{
  currentLocation: Link = {
    path: ["teacher", "assignment"],
    title: "Assignment",
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
