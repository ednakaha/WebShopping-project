import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ItemM } from '../../models/item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) { }

  getItemByCategory(category: string): Observable<ItemM[] | ItemM> {
    //debugger;
    if (category) {
      return this.http.get<ItemM>(environment.url + '/item/getByCategory/' + category, httpOptions);
    }
    else { //all
      return this.http.get<ItemM>(environment.url + '/item/getItem', httpOptions);

    }

  }

  getItemById(id?: string): Observable<ItemM[]> {  //by id
      debugger;
      return this.http.get<ItemM[]>(environment.url + '/item/getById/' + id);   
  }

  getItem(id?: string): Observable<ItemM[]> {//| ItemM> {  //by name
    if (id) {
      debugger;
      return this.http.get<ItemM[]>(environment.url + '/item/get/' + id);
    }
    else {
      return this.http.get<ItemM[]>(environment.url + '/item/get');
    }
  }

  updateItem(item: ItemM) {
    this.http.put<ItemM>(environment.url + '/item/update', item, httpOptions).subscribe(
      data => { })
  }


  addItem(item: ItemM) {
    this.http.post<ItemM>(environment.url + '/item/add', item, httpOptions).subscribe(
      data => {
        alert(data)
        console.log("POST Request is successful ", data);
      },
      error => {
        alert(error.error)
        console.log("Error", error);
      }
    )
  };
}
