import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';
import { CityService } from 'src/app/services/city/city.service';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {
  
  //model:
  firstName: string;
  lastName:  string;
  street:  string;
  roleId: number;

  emitCityId:string;

  constructor(private registerService: RegisterService ) { }

  ngOnInit() {  }


  getSelectedCityId($event){
    this.emitCityId = $event;
  }

  addPerson2() {
    //debugger;
   this.registerService.addPersonStep2({
      id: -1,
      tz:'',
      email: '',
      password:'',// this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      cityId: this.emitCityId,//this.cityId,
      street: this.street,
      roleId: -1 //todo 
    }); 
  }
  

}
