import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, EnumRole } from 'src/environments/environment';
import { Observable, of, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PersonM } from 'src/app/models/person';
//import { CartM } from 'src/app/models/cart';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userToken: string;
  private userData: PersonM;  //todo type
  currentUser:BehaviorSubject<PersonM> = new BehaviorSubject<PersonM>(new PersonM);

 // private subject = new Subject<any>();

 // private <> subject next pulse
  // private cartData: CartM;


  constructor(private http: HttpClient) { }

 
  // sendMessage(message: string) {
  //     this.subject.next({ text: message });
  // }

  clearMessage() {
      this.currentUser.next(new PersonM);
  }

  // getMessage(): Observable<any> {
  //     return this.subject.asObservable();
  // }

  login(u): Observable<Object> {
    return this.http.post(environment.url + '/login', u).pipe(
      catchError((errorRes) => {
        debugger;
        window.localStorage.removeItem(environment.FULL_DATA);
        window.localStorage.removeItem(environment.USER_TOKEN);
        window.localStorage.removeItem(environment.USER_DATA);
        window.localStorage.removeItem(environment.USER_ROLE_ID);
        //  window.localStorage.removeItem(environment.CART_DATA);
       // alert('login error ' + errorRes.error);
       this.clearMessage();
         console.log(' login error' + errorRes.error);
        return errorRes.error;//of(undefined);
      }),
      map((loginRes: string) => {
        if (loginRes) {
          debugger;
          this.userToken = loginRes['token'];
          this.userData = new PersonM();
          this.userData = loginRes['user'];

        
          window.localStorage.removeItem(environment.USER_TOKEN);
          window.localStorage.removeItem(environment.USER_DATA);
          window.localStorage.removeItem(environment.USER_ROLE_ID);
          window.localStorage.removeItem(environment.EMAIL);
          window.localStorage.removeItem(environment.FIRST_NAME);
          window.localStorage.removeItem(environment.FULL_DATA);

          window.localStorage.setItem(environment.FULL_DATA,  JSON.stringify(this.userData));
          window.localStorage.setItem(environment.USER_TOKEN, this.userToken);
          window.localStorage.setItem(environment.USER_DATA, this.userData['_id']);
          window.localStorage.setItem(environment.USER_ROLE_ID,  String(this.userData['roleId']));
          window.localStorage.setItem(environment.EMAIL,  String(this.userData['email']));
          window.localStorage.setItem(environment.FIRST_NAME,  String(this.userData['firstName']));
          

       //   alert('Login successfully');

        //  this.subject.next({ userDataSubject: this.userData });
        this.currentUser.next(this.userData);
        
          console.log(loginRes);
        // location.reload();
         return 'Login successfully';
        }
      })
    );
  }

  getToken(): string {
    return window.localStorage.getItem(environment.USER_TOKEN);
  }

  getIsNew(): boolean {
    return Boolean(window.localStorage.getItem(environment.IS_NEW));
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
  getEmail(){
    return window.localStorage.getItem(environment.EMAIL);   
  }
  getFirstName(){
    return window.localStorage.getItem(environment.FIRST_NAME);
  
  }

}