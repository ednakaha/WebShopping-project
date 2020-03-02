import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { CategoryM } from '../../models/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <token>'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  getCategory(id?: string): Observable<CategoryM[]> {
    if (id) {
      return this.http.get<CategoryM[]>(environment.url + '/category/get/' + id, httpOptions);
    }
    else {
      return this.http.get<CategoryM[]>(environment.url + '/category/get', httpOptions);
    }
  }

  addCategory(category: CategoryM): Observable<CategoryM[] | CategoryM> {//}: boolean {
    return this.http.post<CategoryM>(environment.url + '/category/add', category, httpOptions);
  }
 
}
