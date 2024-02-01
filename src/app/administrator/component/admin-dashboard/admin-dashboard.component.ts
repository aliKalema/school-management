import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {MaterialModule} from "../../../material.module";
import {DecimalPipe} from "@angular/common";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType} from "chart.js";
import {Subject} from "../../../shared/interface/subject";
import {Subscription} from "rxjs";
import {TeacherTableComponent} from "../../../shared/component/teacher-table/teacher-table.component";
import {SubjectService} from "../../../shared/service/subject.service";
import {TeacherService} from "../../../shared/service/teacher.service";
import {Teacher} from "../../../shared/interface/teacher";
import {SubjectTableComponent} from "../../../shared/component/subject-table/subject-table.component";
import {GraphService} from "../../../shared/service/graph.service";
import {StudentService} from "../../../shared/service/student.service";


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MaterialModule, NgChartsModule, DecimalPipe, TeacherTableComponent, SubjectTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy{
  currentLocation: Link = {
    path: ["admin", "dashboard"],
    title: "Dashboard",
    url: "",
    expanded: false
  }
  private navigationService: NavigationService = inject(NavigationService);

  private subjectService: SubjectService = inject(SubjectService);
  subjects: Array<Subject> = [];
  subjectSub: Subscription | undefined;

  private teacherService: TeacherService = inject(TeacherService);
  teachers: Array<Teacher> = [];
  teacherSub: Subscription | undefined;

  private studentService = inject(StudentService);
  studentSub: Subscription | undefined;

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
  teachersSize: number =0;
  studentsSize: number = 0;

  ngOnInit(): void {
    this.navigationService.setCurrentLocation(this.currentLocation);
    this.subjectSub = this.subjectService.getSubjects().subscribe((res)=>{
      this.subjects = res;
    })
    this.teacherSub = this.teacherService.getTeachers().subscribe((res)=>{
      this.teachers = res;
    })

    this.studentSub = this.studentService.getStudents().subscribe((res)=>{
      this.studentsSize = res.length;
    })

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
    this.graphService.getLateness().subscribe((res)=>{
      this.pieChartData= {
        labels: res.labels,
        datasets: [
          {
            data: res.values,
          },
        ],
      };
    });
  }

  ngOnDestroy() {
    if(this.teacherSub){
      this.teacherSub.unsubscribe();
    }

    if(this.subjectSub){
      this.subjectSub.unsubscribe();
    }

    if(this.studentSub){
      this.studentSub.unsubscribe();
    }
  }


}
