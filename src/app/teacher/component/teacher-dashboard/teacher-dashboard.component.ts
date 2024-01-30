import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit{
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
