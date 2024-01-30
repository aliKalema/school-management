import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit{
  currentLocation: Link = {
    path: ["dashboard"],
    title: "Dashboard",
    url: "",
    expanded: false
  }
  private navigationService: NavigationService = inject(NavigationService);

  ngOnInit(): void {
    this.navigationService.setCurrentLocation(this.currentLocation);
  }
}
