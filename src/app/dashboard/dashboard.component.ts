import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'role', 'designation', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  openDialog() {
    this.dialog
      .open(DialogComponent, {})
      .afterClosed()
      .subscribe({
        next: () => {
          this.getAllEmployees();
        },
      });
  }

  getAllEmployees() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('error while fetching records');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(row: any) {
    this.dialog
      .open(DialogComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          this.getAllEmployees();
        },
      });
  }

  deleteEmployee(id: number) {
    this.api.deleteEmployee(id).subscribe({
      next: () => {
        this.getAllEmployees();
        alert('employee info deleted succesfully');
      },
      error: () => {
        alert('error while deleting employee');
      },
    });
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  ngAfterViewInit() {}
}
