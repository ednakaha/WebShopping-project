import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { PersonM } from 'src/app/models/person';
import { Router } from '@angular/router';

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

  errorMessage: string;

  constructor(private registerService: RegisterService,private router: Router) { }

  ngOnInit() { }
  validatePassword() {
    if (this.password != this.confirmPassword) {
      // alert("Passwords Don't Match");
      this.errorMessage = "Passwords don't Match";
      this.confirmPassword = '';
      return false;
    } else {
      return true;
    }
  }

  addPerson1() {
 //   alert('password' + this.password);
    if (this.validatePassword()) {
      debugger;
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
      }).subscribe(
        data => {
          debugger;
          this.errorMessage = String(data);
          this.router.navigate(['/register2']);
         },
        error => {
          debugger;
          this.errorMessage = error.error;
          console.log("Error", error);
          // return false;
        }
      );
    }
  }
}
