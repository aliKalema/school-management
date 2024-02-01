import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from "../../../material.module";
import {StudentService} from "../../../shared/service/student.service";
import {AuthService} from "../../../shared/service/auth.service";
import {Subscription} from "rxjs";
import {Student} from "../../../shared/interface/student";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit, OnDestroy{
  private studentService = inject(StudentService);

  private authService = inject(AuthService);
  private studentSub: Subscription | undefined;
  protected student!: Student;

  ngOnInit(): void {
    this.studentSub = this.studentService.getStudent(this.authService.profile.id).subscribe(res=>{
      if(res){
        this.student = res;
      }
    })
  }


  logout() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    if(this.studentSub){
      this.studentSub.unsubscribe();

    }
  }
}
