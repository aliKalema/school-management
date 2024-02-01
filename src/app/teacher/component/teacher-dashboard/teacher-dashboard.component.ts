import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType} from "chart.js";
import {AngularSplitModule} from "angular-split";
import {AsyncPipe, DatePipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemIcon, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatTooltip} from "@angular/material/tooltip";
import {StudentTableComponent} from "../../../shared/component/student-table/student-table.component";
import {StudentService} from "../../../shared/service/student.service";
import {Student} from "../../../shared/interface/student";
import {MaterialModule} from "../../../material.module";
import {TeacherService} from "../../../shared/service/teacher.service";
import {Teacher} from "../../../shared/interface/teacher";
import {SubjectService} from "../../../shared/service/subject.service";
import {Session} from "../../../shared/interface/session";
import {map} from "rxjs";
import {GraphService} from "../../../shared/service/graph.service";

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    NgChartsModule,
    AngularSplitModule,
    DatePipe,
    MaterialModule,
    StudentTableComponent,
    AsyncPipe
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {
  currentLocation: Link = {
    path: ["teacher", "dashboard"],
    title: "Dashboard",
    url: "",
    expanded: false
  }
  employeeId: string = 'T010';
  students: Array<Student> = [];
  currentClass= "";
  teacher!: Teacher;
  private studentService: StudentService = inject(StudentService);
  private teacherService: TeacherService = inject(TeacherService);
  private navigationService: NavigationService = inject(NavigationService);
  protected  subjectService = inject(SubjectService);
  private graphService = inject(GraphService);
  public pieChartData!: ChartData<'pie', number[], string | string[]>;
  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartLegend = false;
  public lineChartOptions: ChartOptions<'line'> = { responsive: true };
  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData!: ChartData<'bar'>;

  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartType: ChartType = 'pie';
  ngOnInit(): void {
    this.navigationService.setCurrentLocation(this.currentLocation);
    this.teacherService.getTeacher(this.employeeId).subscribe((res)=>{
      if(res){
        this.teacher = res;
        if(this.teacher && this.teacher.sessions.length>0){
          this.getStudentByClass(this.teacher.sessions[0].class);
          const sessions = this.reduceSessionsBySubjectId(this.teacher.sessions);
          const pieLabels: string[] =[];
          const pieValue: number[] = [];
          sessions.forEach(session=>{
            pieLabels.push(session.subjectId);
            pieValue.push(session.minutes);
          })
        this.pieChartData= {
            labels: pieLabels,
            datasets: [
              {
                data: pieValue,
              },
            ],
          };
        }
      }
      else{
        alert("Teacher Not Found");
      }
    });
    this.graphService.getTeacherPerformance().subscribe((res)=>{
      const summaries = res;
      if(summaries.length>0){
        const labels:string[] = [];
        const values:number[] = [];
        summaries.forEach((sm)=>{
          labels.push(sm.period);
          values.push(sm.value);
        })
        this.lineChartData = {
          labels: labels,
          datasets: [
            {
              data: values,
              fill: true,
              tension: 0.5,
              borderColor: 'rgba(148,159,177,1)',
              backgroundColor: 'rgb(59 130 246)',
              pointBorderColor: '#fff',
              pointBackgroundColor: 'rgba(148,159,177,1)',
            }
          ]
        };
      }
    })
    this.graphService.getSubjectPerformance().subscribe((res)=>{
      const data = res;
      let lb1 = "";
      let lb2 = "";
      const data1: number[] = []
      const data2: number[] = []
      const labels: string[] = [];
      data.forEach(d=>{
        labels.push(d.period);
        lb1 = d.data[0].period;
        lb2 = d.data[1].period;
        data1.push(d.data[0].value)
        data2.push(d.data[1].value)
      })
    console.log(labels);
    this.barChartData= {
        labels: labels,
        datasets: [
          {data: data1, label: lb1},
          {data: data2, label: lb2},
        ],
      };
    })
  }


  protected getStudentByClass(id: string): void{
    this.currentClass = id;
    this.studentService.getStudentsByGrade(id).subscribe(res=>{
      this.students = res;
    })
  }

   reduceSessionsBySubjectId(sessions: Session[]): Session[] {
    const reducedSessionsMap = sessions.reduce((map, session) => {
      const { subjectId, minutes } = session;

      if (map.has(subjectId)) {
        map.set(subjectId, {class: "", subjectId: "", time: "", ...map.get(subjectId), minutes: map.get(subjectId)!.minutes + minutes });
      } else {
        map.set(subjectId, session);
      }

      return map;
    }, new Map<string, Session>());

    return Array.from(reducedSessionsMap.values());
  }

}

