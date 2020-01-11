import { Injectable } from '@angular/core';
//import { HttpClient,  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ItemM } from '../../models/item';
import { HttpClient, HttpEvent, HttpHeaders,HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { LoginService } from '../login/login.service';
import { DEFAULT_ECDH_CURVE } from 'tls';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient,private loginService:LoginService) { }

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
    debugger;
    return this.http.put<ItemM>(environment.url + '/item/update', item, httpOptions);//;.subscribe(
    //  data => { })
  }


  addItem(item: ItemM) {
    debugger;
    return this.http.post<ItemM>(environment.url + '/item/add', item, httpOptions)
    // .subscribe(
    //   data => {
    //     alert(data)
    //     console.log("POST Request is successful ", data);
    //   },
    //   error => {
    //     alert(error.error)
    //     console.log("Error", error);
    //   }
    // )
  };
//https://www.techiediaries.com/angular-file-upload-progress-bar/
  public upload(data, userId) {

    return this.http.post<any>(environment.url+'/upload/save', data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      debugger;
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
