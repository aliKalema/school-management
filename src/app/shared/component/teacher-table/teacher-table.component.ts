import {Component, Input} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MaterialModule} from "../../../material.module";
import {Teacher} from "../../interface/teacher";

@Component({
  selector: 'app-teacher-table',
  standalone: true,
    imports: [
        MaterialModule
    ],
  templateUrl: './teacher-table.component.html',
  styleUrl: './teacher-table.component.css'
})
export class TeacherTableComponent {
  @Input()
  teachers!: Teacher[];

  selection = new SelectionModel<Teacher>(true, []);

  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'phone', 'email', 'employeeId', 'subjectsTaught'];
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === this.teachers.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.teachers);
  }
}
