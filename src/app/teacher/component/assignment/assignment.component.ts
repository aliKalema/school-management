import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [],
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
  private navigationService: NavigationService = inject(NavigationService);
  ngOnInit() {
    this.navigationService.setCurrentLocation(this.currentLocation);
  }
}
