import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmployee(data: any){
    return this.http.post('http://localhost:3000/employees', data);
  }
}
