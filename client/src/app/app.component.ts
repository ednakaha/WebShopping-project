import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';
import { PersonM } from './models/person';

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
  aCurrentUser:PersonM;

  title = 'client';

  constructor(private loginService: LoginService) {

    this.loginService.currentUser.subscribe(cuUser => {
      debugger;
      this.aCurrentUser = cuUser;
      this.firstName = this.aCurrentUser['firstName'];
      this.email = this.aCurrentUser['email'];
      this.roleId = this.aCurrentUser['roleId'];
  });
  

  }
}


