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
    return this.http.post<PersonM>(environment.url + '/register/addStep1', Person, httpOptions);
  };

  addPersonStep2(Person: PersonM) {
        
    return this.http.post<PersonM>(environment.url + '/register/addStep2', Person, httpOptions)
  };
}


