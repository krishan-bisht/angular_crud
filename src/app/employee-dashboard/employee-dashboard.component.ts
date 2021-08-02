import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from '../employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue :FormGroup;
  employeeData;

  employeeModelObj: EmployeeModel = new EmployeeModel();

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit() {
    this.formValue = this.formBuilder.group({
      firstName :[''],
      lastName : [''],
      email :[''],
      mobile : [''],
      salary :['']
    });

    this.getAllEmployee();
  }

  postEmployeeDetail(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
console.log(this.employeeModelObj);

    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);  
    });

    this.formValue.reset();
    let ref = document.getElementById('cancel');
    ref.click();
    this.getAllEmployee();

  }

  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeeData= res;
    })
  }
 
  deleteEmployee(emp:any){
    this.api.deleteEmploye(emp.id)
    .subscribe(res=>{
      this.getAllEmployee();   
    })
  }

}
