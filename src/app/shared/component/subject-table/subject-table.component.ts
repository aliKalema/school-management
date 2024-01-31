import {Component, Input} from '@angular/core';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Subject} from "../../interface/subject";
import {MaterialModule} from "../../../material.module";

@Component({
  selector: 'app-subject-table',
  standalone: true,
    imports: [
      MaterialModule
    ],
  templateUrl: './subject-table.component.html',
  styleUrl: './subject-table.component.css'
})
export class SubjectTableComponent {
  @Input()
  subjects!: Subject[];

  displayedColumns: string[] = [ 'id', 'name', 'hoursWeekly'];
}
