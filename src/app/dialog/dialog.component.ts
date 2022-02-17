import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  employeeForm: FormGroup;
  actionBtn: string = 'save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  addEmployee(): void {
    if (!this.editData) {
      if (this.employeeForm.valid) {
        this.api.postEmployee(this.employeeForm.value).subscribe({
          next: (res) => {
            alert('employee added');
          },
          error: () => {
            alert('error while adding employee');
          },
        });
      }
    } else {
      this.updateEmployee();
    }
  }

  updateEmployee() {
    this.api
      .updateEmployee(this.employeeForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('employee updated succesfully');
          this.employeeForm.reset();
        },
        error: () => {
          alert('error while updating record');
        },
      });
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      designation: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'update';
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['role'].setValue(this.editData.role);
      this.employeeForm.controls['designation'].setValue(
        this.editData.designation
      );
    }
  }
}
