import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { OrderM } from '../../models/order';
import { Router } from "@angular/router";
import { catchError, map } from 'rxjs/operators';
import { OrdersDateGroup } from 'src/app/models/ordersDateGroup';


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

  
  getGroupingOrders(): Observable<OrdersDateGroup[]> {
    return this.http.get<any>(environment.url + '/order/getGroupingOrders');
  }

  getOrderByUser(id: string): Observable<OrderM[]> {
    if (id) {
      return this.http.get<OrderM[]>(environment.url + '/order/getOrderByUser/' + id);
    }
  }

  addOrder(Order: OrderM): Observable<any> {
    return this.http.post<OrderM>(environment.url + '/order/addOrder', Order, httpOptions);
  }


}
