import {Component, inject, OnInit} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";

@Component({
  selector: 'app-feed-back',
  standalone: true,
  imports: [],
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
  private navigationService: NavigationService = inject(NavigationService);
  ngOnInit() {
    this.navigationService.setCurrentLocation(this.currentLocation);
  }
}
