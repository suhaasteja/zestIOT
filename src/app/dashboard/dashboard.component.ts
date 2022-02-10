import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface employee {
  id: string;
  name: string;
  role: string;
}

const employeeData: employee[] = [];

for (let i = 1; i <= 30; i++) {
  employeeData.push(createEmployee(i));
}

function createEmployee(id: number) {
  return {
    id: id.toString(),
    name: 'employee ' + id.toString(),
    role: 'developer',
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'role'];

  dataSource = new MatTableDataSource(employeeData);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
