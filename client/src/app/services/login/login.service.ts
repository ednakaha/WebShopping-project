import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, EnumRole } from 'src/environments/environment';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PersonM } from 'src/app/models/person';
//import { CartM } from 'src/app/models/cart';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userToken: string;
  private userData: PersonM;  //todo type

  private subject = new Subject<any>();

 // private <> subject next pulse
  // private cartData: CartM;


  constructor(private http: HttpClient) { }

 
  // sendMessage(message: string) {
  //     this.subject.next({ text: message });
  // }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

  login(u): Observable<Object> {
    return this.http.post(environment.url + '/login', u).pipe(
      catchError((errorRes) => {
        debugger;
        window.localStorage.removeItem(environment.USER_TOKEN);
        window.localStorage.removeItem(environment.USER_DATA);
        window.localStorage.removeItem(environment.USER_ROLE_ID);
        //  window.localStorage.removeItem(environment.CART_DATA);
       // alert('login error ' + errorRes.error);
         console.log(' login error' + errorRes.error);
        return errorRes.error;//of(undefined);
      }),
      map((loginRes: string) => {
        if (loginRes) {
          debugger;
          this.userToken = loginRes['token'];
          this.userData = loginRes['user'];
          window.localStorage.removeItem(environment.USER_TOKEN);
          window.localStorage.removeItem(environment.USER_DATA);
          window.localStorage.removeItem(environment.USER_ROLE_ID);

          window.localStorage.setItem(environment.USER_TOKEN, this.userToken);
          window.localStorage.setItem(environment.USER_DATA, this.userData['_id']);
          window.localStorage.setItem(environment.USER_ROLE_ID,  String(this.userData['roleId']));
          

       //   alert('Login successfully');

          this.subject.next({ userDataSubject: this.userData });

          console.log(loginRes);
         // return loginRes;
         return 'Login successfully';
        }
      })
    );
  }

  getToken(): string {
    return window.localStorage.getItem(environment.USER_TOKEN);
  }

  isLogged() {
    return this.getToken() != null;
  }

  getCartId() {
    return window.localStorage.getItem(environment.CART_DATA);
  }
  getUserId() {
    return window.localStorage.getItem(environment.USER_DATA);
  }
  getRoleId() { //todo Encryption
    return window.localStorage.getItem(environment.USER_ROLE_ID);
  }

}