import {Component, Input} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {MaterialModule} from "../../../material.module";
import {Student} from "../../../shared/interface/student";

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.css'
})
export class StudentTableComponent{
  @Input()
  students!: Array<Student>;

  selection = new SelectionModel<Student>(true, []);

  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'dob', 'class', 'address', 'parentName', 'parentContact'];
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected === this.students.length;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.students);
  }

}
