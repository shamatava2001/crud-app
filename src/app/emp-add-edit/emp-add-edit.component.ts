import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;

  education: string[] = [
    'Akaki Tsereteli State Univeristy',
    'Ivane Javakhishvili State Univeristy',
    'Georgian Techcnial University'
  ]

  constructor(
    private fb: FormBuilder, 
    private empService: EmployeeService, 
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      experience: '',
      company: '',
      package: ''
    }); 
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit(){
    // თუ edit - რეჟიმია გააქტიურებული
    if(this.data){
      this.empService.editEmployee(this.data.id, this.empForm.value)
      .subscribe({
        next: (val)=>{
          // if it success
          alert('employee updated');
          this.dialogRef.close(true);
        },
        error: (err: any)=>{
          console.log(err);
        }
      })
    } else
    if(this.empForm.valid){
      this.empService.addEmployee(this.empForm.value)
      .subscribe({
        next: (val)=>{
          // if it success
          alert('employee added successfully');
          this.dialogRef.close(true);
        },
        error: (err: any)=>{
          console.log(err);
        }
      })
    }
  }
}
