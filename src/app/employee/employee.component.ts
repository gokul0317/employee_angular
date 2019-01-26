import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { EmployeeService} from '../shared/employee.service';
import { Employee} from '../shared/employee.model';

import { DeclareVarStmt } from '@angular/compiler';


declare var M : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers : [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor( private employeeService : EmployeeService) { }

  ngOnInit() {
    
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = {
        _id : "",
        name : "",
        position : "",
        office : "",
        salary : null,
  
      }
    }


  }


  onSubmit(form : NgForm){
    console.log(form.value)
    if(form.value._id == "") {

      this.employeeService.postEmployee(form.value).subscribe( (res) =>{
        this.resetForm(form);
        M.toast( {html : "Employee Saved" , classes: 'rounded' });
        this.refreshEmployeeList();
      });
    }else{
      this.employeeService.putEmployee(form.value).subscribe( (res) =>{
        this.resetForm(form);
        M.toast( {html : "Employee Updated" , classes: 'rounded' });
        this.refreshEmployeeList();
      });
    }
  }

  refreshEmployeeList(){
    this.employeeService.getEmployee().subscribe ( (res)=>{
      console.log(res)
      this.employeeService.employees = res as Employee[];
    })
  }

  onEdit(emp : Employee){
    this.employeeService.selectedEmployee=emp;

  }

  onDelete(_id:String, form: NgForm){
    if(confirm('Are You sure to delete') == true){
      this.employeeService.deleteEmployee(_id).subscribe((res)=>{
               this.refreshEmployeeList();
               this.resetForm(form);
               M.toast({html:'Record Deleted',classes:'rounded'})        
      })
    }
  }
}
