import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder){
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
      console.log(this.empForm.value);
    }
  }
}
