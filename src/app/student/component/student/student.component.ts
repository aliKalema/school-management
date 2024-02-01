import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from "../../../material.module";
import {StudentService} from "../../../shared/service/student.service";
import {AuthService} from "../../../shared/service/auth.service";
import {Subscription} from "rxjs";
import {Student} from "../../../shared/interface/student";
import {TeacherService} from "../../../shared/service/teacher.service";
import {Teacher} from "../../../shared/interface/teacher";
import {FormsModule, NgForm} from "@angular/forms";
import {NotificationService} from "../../../shared/service/notification.service";

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit, OnDestroy{
  private studentService = inject(StudentService);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);
  private studentSub: Subscription | undefined;
  protected student!: Student;

  feedBack = {
    teacher:"",
    message: ""
  }

  private teacherService = inject(TeacherService);
  private teacherSub: Subscription | undefined;
  protected teachers: Array<Teacher> = [];

  ngOnInit(): void {
    this.studentSub = this.studentService.getStudent(this.authService.profile.id).subscribe(res=>{
      if(res){
        this.student = res;
      }
    })

    this.teacherSub = this.teacherService.getTeachers().subscribe(res=>{
      if(res){
        this.teachers = res;
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
    if(this.teacherSub){
      this.teacherSub.unsubscribe();
    }
  }

  onSaveForm(form: NgForm) {
    this.notificationService.notify({ message: "Feed Back Submitted", notificationType: "success" });
    form.resetForm();
    console.log(this.feedBack);
  }
}
