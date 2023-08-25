import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {
  empForm: FormGroup;

  education: string[] = [
    'Akaki Tsereteli State Univeristy',
    'Ivane Javakhishvili State Univeristy',
    'Georgian Techcnial University'
  ]

  constructor(
    private fb: FormBuilder, 
    private empService: EmployeeService, 
    private dialogRef: DialogRef<EmpAddEditComponent>
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
  onFormSubmit(){
    if(this.empForm.valid){
      this.empService.addEmployee(this.empForm.value)
      .subscribe({
        next: (val)=>{
          // if it success
          alert('employee added successfully');
          this.dialogRef.close();
        },
        error: (err: any)=>{
          console.log(err);
        }
      })
    }
  }
}
