import { Component } from '@angular/core';
import {Link} from "../../../shared/service/navigation.service";
import {LayoutComponent} from "../../../shared/component/layout/layout.component";

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    LayoutComponent
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  protected links: Array<Link>=[
    {
      title: "Dashboard",
      url: 'dashboard',
      icon: 'dashboard',
      expanded: false
    },
    {
      title: "FeedBack",
      url: 'feedback',
      icon: 'forum',
      expanded: false
    },
  ];
}
