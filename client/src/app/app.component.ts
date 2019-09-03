import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firstName: string
  email: string
 // userDataSubject: any;
  subscription: Subscription;
  roleId :number;

  title = 'client';

  constructor(private loginService: LoginService) {
    this.subscription = this.loginService.getMessage().subscribe(message => {
      //debugger;
     //  this.userDataSubject = message;
      this.email = message.userDataSubject.email;
      this.firstName = message.userDataSubject.firstName;
      this.roleId = message.userDataSubject.roleId;
    });


  }
}


