import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { CityM } from '../../models/city';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }


  getCity(id?: string): Observable<CityM[] | CityM> {
    if (id) {
      return this.http.get<CityM>(environment.url + '/city/get/' + id);
    }
    else {
      return this.http.get<CityM[]>(environment.url + '/city/get');
    }
  }

  addCity(city: CityM): Observable<CityM[] | CityM> {
    return this.http.post<CityM>(environment.url + '/city/add', city, httpOptions);
  };
}
