import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  education: string;
  company: string;
  experience: number;
  package: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'net-ninja';
// must match api's keys and matColumnDef 
  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email', 
    'dob', 
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'actions'
  ];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private empService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm(){
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }
  getEmployeeList(){
    this.empService.getEmployeeList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res as UserData[]);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  deleteEmployee(id: number){
    this.empService.deleteEmployee(id).subscribe({
      next: (res)=>{
        alert('Employee Deleted');
        this.getEmployeeList();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
