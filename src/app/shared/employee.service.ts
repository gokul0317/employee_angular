import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   selectedEmployee : Employee;
   employees : Employee[];
   readonly baseURL = "http://localhost:3000/employees";
  constructor(private _http:HttpClient) { }
  
 postEmployee (emp : Employee){

  return this._http.post( this.baseURL, emp);

 } 

 getEmployee (){
  return this._http.get( this.baseURL)
 }

 putEmployee (emp : Employee){
   return this._http.put(this.baseURL+`/${emp._id}`,emp);
 }

 deleteEmployee(_id:String){
   return this._http.delete(this.baseURL+`/${_id}`);
 }
}
