import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {StudentTableComponent} from "../../../shared/component/student-table/student-table.component";
import {StudentService} from "../../../shared/service/student.service";
import {Subscription} from "rxjs";
import {Student} from "../../../shared/interface/student";
import {Link, NavigationService} from "../../../shared/service/navigation.service";

@Component({
  selector: 'app-admin-student',
  standalone: true,
  imports: [
    StudentTableComponent
  ],
  templateUrl: './admin-student.component.html',
  styleUrl: './admin-student.component.css'
})
export class AdminStudentComponent implements OnInit, OnDestroy{
  private studentsService: StudentService = inject(StudentService);
  private navigationService: NavigationService = inject(NavigationService);
  currentLocation: Link = {
    path: ["admin", "student"],
    title: "Student",
    url: "",
    expanded: false
  }

  students: Array<Student> = [];

  private studentSub: Subscription | undefined;
  private studentService = inject(StudentService);

  ngOnInit(): void {
    this.navigationService.setCurrentLocation(this.currentLocation);
    this.studentSub = this.studentService.getStudents().subscribe((res)=>{
      this.students = res;
    })
  }

  ngOnDestroy(): void {
    if(this.studentSub){
      this.studentSub.unsubscribe();
    }
  }

}
