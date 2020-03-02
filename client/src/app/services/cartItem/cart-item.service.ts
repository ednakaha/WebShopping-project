import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { CartItemM } from '../../models/cartItem';
import { CartItemExpandedM } from 'src/app/models/cartItemExpanded';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <token>'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) { }


  getcartItemForTextFile(id: string): Observable<CartItemExpandedM[] | CartItemExpandedM> {
    if (id) {
      return this.http.get<CartItemExpandedM>(environment.url + '/cartItem/cartItemForTextFile/' + id, httpOptions);
    }
  }

  getCartItemExpanded(id?: string): Observable<CartItemExpandedM[]> {
    if (id) {
      return this.http.get<CartItemExpandedM[]>(environment.url + '/cartItem/cartItemExpanded/' + id, httpOptions);
    }
    else {
      return this.http.get<CartItemExpandedM[]>(environment.url + '/cartItem/cartItemExpanded', httpOptions);
    }
  }

  getCartItem(id?: string): Observable<CartItemM[] | CartItemM> {
    if (id) {
      return this.http.get<CartItemM>(environment.url + '/cartItem/get/' + id, httpOptions);
    }
    else {
      return this.http.get<CartItemM[]>(environment.url + '/cartItem/get', httpOptions);
    }
  }

  addCartItem(cartItem: CartItemM) {//}: boolean {

    return this.http.post<CartItemM>(environment.url + '/cartItem/add', cartItem, httpOptions);

  };

  delItemCartById(id: string) {
    return this.http.delete<any>(environment.url + '/cartItem/deleteCartItem/' + id, httpOptions)

  }


  delAllItemsCart(cartId: string) {

    return this.http.delete<any>(environment.url + '/cartItem/delete/' + cartId, httpOptions)

  }
}
