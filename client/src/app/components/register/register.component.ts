import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { PersonM } from 'src/app/models/person';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //registerServie: any;
  //model:
  tz: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private registerService: RegisterService) { }

  ngOnInit() { }
  validatePassword() {
    if (this.password != this.confirmPassword) {
      alert("Passwords Don't Match");
      this.confirmPassword = '';
      return false;
    } else {
      return true;
    }
  }

  addPerson1() {
    alert('password'+this.password);
    if (this.validatePassword()) {
      //debugger;
      this.registerService.addPersonStep1({
        id: -1,
        tz: this.tz,
        email: this.email,
        password: this.password,
        firstName: '',
        lastName: '',
        cityId: '-1',
        street: '',
        roleId: -1
      });
    }
  }
}
