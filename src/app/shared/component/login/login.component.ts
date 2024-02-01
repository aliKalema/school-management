import {Component, inject} from '@angular/core';
import {MaterialModule} from "../../../material.module";
import {NotificationService} from "../../service/notification.service";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  selectedTabIndex = 0;
  login={
    username: '',
    password: ''
  }

  private notificationService =  inject(NotificationService);
  private authService = inject(AuthService);
  private router = inject(Router);


  onSaveForm(loginForm: NgForm) {
    console.log(this.selectedTabIndex);
    const authenticated = this.authService.authenticate(this.selectedTabIndex, this.login);
    if(authenticated){
      if(this.authService.profile.roles[0]==='admin'){
        this.router.navigate(['admin']).then();
      }
      else if(this.authService.profile.roles[0]==='teacher'){
        this.router.navigate(['teacher']).then();
      }
      else if(this.authService.profile.roles[0]==='student'){
        this.router.navigate(['student']).then();
      }
    }
    else{
      this.notificationService.notify({ message: "Wrong Username or Password", notificationType: "danger" });
    }
  }
}
