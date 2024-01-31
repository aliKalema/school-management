import {Component, inject, OnInit} from '@angular/core';
import {LayoutComponent} from "../../../shared/component/layout/layout.component";
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {MaterialModule} from "../../../material.module";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent{
  protected links: Array<Link>=[
    {
      title: "Dashboard",
      url: 'dashboard',
      icon: 'dashboard',
      expanded: false
    },
  ];

}
