import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
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
