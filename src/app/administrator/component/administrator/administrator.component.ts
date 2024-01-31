import {Component, OnInit} from '@angular/core';
import {SidenavComponent} from "../../../shared/component/sidenav/sidenav.component";
import {NavbarComponent} from "../../../shared/component/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {LayoutComponent} from "../../../shared/component/layout/layout.component";

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [
    LayoutComponent
  ],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})

export class AdministratorComponent{
  protected links: Array<Link>=[
    {
      title: "Dashboard",
      url: 'dashboard',
      icon: 'dashboard',
      expanded: false
    },
    {
      title: "Student",
      url: 'student',
      icon: 'groups',
      expanded: false
    },
    {
      title: "Report",
      url: 'report',
      icon: 'article',
      expanded: false
    },
  ];
}

