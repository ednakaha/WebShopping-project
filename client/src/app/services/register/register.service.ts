import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { PersonM } from '../../models/person';
import { Router } from "@angular/router";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router: Router) { }


  getPerson(id?: string): Observable<PersonM[] | PersonM> {
    if (id) {
      return this.http.get<PersonM>(environment.url + '/register/get/' + id);
    }
    else {
      return this.http.get<PersonM[]>(environment.url + '/register/get');
    }
  }
 

  addPersonStep1(Person: PersonM) {
    //debugger;
     return this.http.post<PersonM>(environment.url + '/register/addStep1', Person, httpOptions);
    //  .subscribe(
    //   data => {
    //     alert('person step 1 done');
    //     // console.log("Person Request is successful ", data);
    //     this.router.navigate(['/register2'])
    //   },
    //   error => {
    //     alert('addPersonStep1 -' + error.error)
    //  //   console.log("Error", error);
    //   }
    // )
  };
  
  addPersonStep2(Person: PersonM) {
    debugger;
    return this.http.post<PersonM>(environment.url + '/register/addStep2', Person, httpOptions)
      // data => {
      //   alert('Registration successfully passed');
      //   this.router.navigate(['first-Page']);
      //   console.log("Person Request is successful ", data);
      // },
      // error => {
      //   alert('Registration failed: ' + error.error);
      //   console.log("Error", error);
      // }
    
  };
}


