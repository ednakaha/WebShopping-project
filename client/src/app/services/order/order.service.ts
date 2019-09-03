import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { OrderM } from '../../models/order';
import { Router } from "@angular/router";
import { catchError, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }

  getOrderByCart(cart: string): Observable<OrderM> {
    return this.http.get<OrderM>(environment.url + '/order/getByCart/' + cart);
  }

  getOrder(id?: string): Observable<OrderM[] | OrderM> {
    if (id) {
      return this.http.get<OrderM>(environment.url + '/order/get/' + id);
    }
    else {
      return this.http.get<OrderM[]>(environment.url + '/order/get');
    }
  }

  getOrderByUser(id?: string): Observable<OrderM[]> {
    if (id) {
      return this.http.get<OrderM[]>(environment.url + '/order/getOrderByUser/' + id);
    }
  }
  /*
    addOrder(Order: OrderM):Observable<Boolean> {
      //debugger;
      return  this.http.post<OrderM>(environment.url + '/order/addOrder', Order, httpOptions).subscribe(
        data => {
          alert('Order successfully passed');
          return true;
          //   this.router.navigate(['/login'])
          //todo message
        },
        error => {
          alert('Order failed: ' + error.error)
          console.log("Error", error);
          return false;
        }
      )};*/

  addOrder(Order: OrderM): Observable<any> {
    return this.http.post<OrderM>(environment.url + '/order/addOrder', Order, httpOptions).pipe(
      catchError((errorRes) => {
        //debugger;
        alert('Order failed: ' + errorRes.error)
        console.log(' login error' + errorRes);
        return errorRes;
      }),
      map((orderRes: string) => {
        if (orderRes) {
          //debugger;
          alert('Order is done successfully');
          console.log(orderRes);
          return true;
        }
      })
    );
  }


}
