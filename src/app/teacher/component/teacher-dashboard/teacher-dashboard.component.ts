import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Link, NavigationService} from "../../../shared/service/navigation.service";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType} from "chart.js";
import {AngularSplitModule} from "angular-split";
import {DatePipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemIcon, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatTooltip} from "@angular/material/tooltip";
import {StudentTableComponent} from "../../../shared/component/student-table/student-table.component";
import {StudentService} from "../../../shared/service/student.service";
import {Student} from "../../../shared/interface/student";
import {MaterialModule} from "../../../material.module";

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    NgChartsModule,
    AngularSplitModule,
    DatePipe,
    MaterialModule,
    StudentTableComponent
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
  students: Array<Student> = [];
  private studentService: StudentService = inject(StudentService);
  private navigationService: NavigationService = inject(NavigationService);

  ngOnInit(): void {
    this.navigationService.setCurrentLocation(this.currentLocation);
  }


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],

    datasets: [
      {
        data: [40, 45, 50, 55, 60, 65, 70, 75, 70, 60, 50, 45],
        label: 'Angular',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(148,159,177,1)',
        backgroundColor: 'rgb(59 130 246)',
        pointBorderColor: '#fff',
        pointBackgroundColor: 'rgba(148,159,177,1)',
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  public lineChartLegend = false;


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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
  //public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    ],
  };

  // events
  public chartClicked({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }


  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

}

