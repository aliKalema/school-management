import { Injectable } from '@angular/core';
import {ADMIN_PROFILE, STUDENT_PROFILE, TEACHER_PROFILE} from "../auth_constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public profile: any;
  public authenticated: boolean =  false;
  constructor() { }

  public authenticate(index: number, login: any): boolean{
    if(index ===2){
      if(login.username=== ADMIN_PROFILE.username && login.password=== ADMIN_PROFILE.password){
        this.profile = ADMIN_PROFILE;
        this.authenticated = true;
        return true;
      }
    }
    if(index ===1){
      if(login.username=== TEACHER_PROFILE.username && login.password=== TEACHER_PROFILE.password){
        this.profile = TEACHER_PROFILE;
        this.authenticated = true;
        return true;
      }
    }

    if(index ===0){
      if(login.username=== STUDENT_PROFILE.username && login.password=== STUDENT_PROFILE.password){
        this.profile = STUDENT_PROFILE;
        this.authenticated = true;
        return true;
      }
    }

    return false;
  }
}
