import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerMode, MatSidenav} from "@angular/material/sidenav";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {Link, NavigationService} from "../../service/navigation.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-layout',
  standalone: true,
    imports: [
        MatDrawer,
        MatDrawerContainer,
        NavbarComponent,
        RouterOutlet,
        SidenavComponent
    ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, AfterViewInit{
  isMobile: boolean= false;
  isMinimized: boolean= false;

  @Input()
  links!: Array<Link>;

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @Output()
  maximize = new EventEmitter();
  constructor(private navigationService: NavigationService,
              private breakPointObserver: BreakpointObserver,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.navigationService.isMinimized().subscribe((data)=>{
      this.isMinimized = data;
    })
  }

  ngAfterViewInit(): void {
    this.breakPointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((breakpointState) => {
        if (breakpointState.matches) {
          this.isMobile=true;
          const over:MatDrawerMode ='over';
          if(this.sidenav) {
            this.sidenav.mode = "over";
            this.sidenav.close().then();
            this.navigationService.setMinimized(false);
          }
        }
        else{
          this.isMobile =  false;
          const side:MatDrawerMode ='side';
          if(this.sidenav) {
            this.sidenav.mode = "side";
            this.sidenav.open().then();
            this.navigationService.resetMinimized();
          }
        }
      });
    this.changeDetectorRef.detectChanges();
  }

  toggleSideNav(): void{
    if(this.isMobile){
      this.sidenav.toggle().then();
    }
    else{
      this.navigationService.toggleMinimized();
    }
  }

}
