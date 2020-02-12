import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';
import { CityService } from 'src/app/services/city/city.service';
import { EnumRole } from '../../../environments/environment';
import { environment } from 'src/environments/environment.prod';

export enum EnumRole1 {
  Admin = 1,
  User = 2
}
@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component{//} implements OnInit {
  
  //model:
  firstName: string;
  lastName:  string;
  street:  string;
  roleId: number;

  errorMessage:string;
  // roleEnum:EnumRole1;
  // keys: any[];

  emitCityId:string;
  router: any;

  constructor(private registerService: RegisterService ) {
    // debugger;
    //todo?
  // this.keys = Object.keys(this.roleEnum).filter(Number);
  
   
   }

  ngOnInit() { 
    debugger;
   }


  getSelectedCityId($event){
    this.emitCityId = $event;
  }

  addPerson2() {
    debugger;
   this.registerService.addPersonStep2({
      id: -1,
      tz:'',
      email: '',
      password:'',// this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      cityId: this.emitCityId,//this.cityId,
      street: this.street,
      roleId: this.roleId 
    }).subscribe(
      data => {
        // debugger;
        this.errorMessage = String(data);
        setTimeout(function() {
          this.errorMessage = '';
      }.bind(this), 3000);
        this.router.navigate(['/first-Page']);
       },
      error => {
        // debugger;
        //edna todo return null
        this.errorMessage = error.error;
        console.log("Error", error);
        setTimeout(function() {
          this.errorMessage = '';
      }.bind(this), 3000);
        // return false;
      }
    )

  }
  

}
