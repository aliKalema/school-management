import {AfterViewInit, Component, Input, OnInit, inject, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MaterialModule} from "../../../material.module";
import {Link, NavigationService} from "../../service/navigation.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: [
    MaterialModule,
    NgIf,
    NgClass,
    NgForOf,
    RouterLink,
    RouterLinkActive,
  ],
  standalone: true
})
export class SidenavComponent implements OnInit, AfterViewInit{

  @Input()
  links!: Array<Link>;

  isMinimized!: boolean;

  profile:  undefined;

  @ViewChild('scrollableElement')
  scrollableElement: any;

  private navigationService: NavigationService = inject(NavigationService);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService)

  ngOnInit(): void {
    this.navigationService.isMinimized().subscribe((data : boolean)=>{
      this.isMinimized = data;
    })

    // this.authService.loadUserProfile().then((res)=>{
    //   this.profile = res;
    // })
    const currentRoute = this.router.url.substring(1);
    for(let link of this.links){
      if(this.isUrlInChildren(currentRoute, link)){
        link.expanded = true;
        break;
      }
    }
  }

  ngAfterViewInit() {

  }

  toggleExpanded(link: Link): void {
    link.expanded = !(link.expanded);
  }

  isUrlInChildren(url: string, link: Link): boolean {
    if (link.url === url) {
      return true;
    }

    if (link.children) {
      for (const child of link.children) {
        if (this.isUrlInChildren(url, child)) {
          return true;
        }
      }
    }

    return false;
  }
}
