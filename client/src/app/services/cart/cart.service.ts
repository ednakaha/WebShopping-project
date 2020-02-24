import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CartM } from '../../models/cart';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartData: CartM;
  IsNewUser:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getOrSetCart(userId: string):  Observable<CartM[] | CartM> {
    debugger;
    return this.http.get<CartM>(environment.url + '/cart/getOrSetCart/' + userId).pipe(
      catchError((errorRes) => {
        //debugger;
        window.localStorage.removeItem(environment.CART_DATA);
        // alert('Cart error ' + errorRes.error);
        console.log(' Cart error' + errorRes);
        return of(undefined);
      }),
      map((cartRes) => {
        if (cartRes) {
          debugger;
          this.cartData = cartRes["cartData"];
          let isNew = cartRes["isNew"]
          window.localStorage.removeItem(environment.CART_DATA);
          window.localStorage.setItem(environment.CART_DATA, this.cartData[0]._id);
          window.localStorage.removeItem(environment.IS_NEW);
          window.localStorage.setItem(environment.IS_NEW,isNew);
          // alert('Cart added successfully');
          //console.log('cart added ' + JSON.stringify(this.cartData));
          this.IsNewUser.next(isNew);
          return this.cartData;
        }
      })
    );
  }

  getCartByUser(id?: string): Observable<CartM[]> {
    if (id) {
      return this.http.get<CartM[]>(environment.url + '/cart/getCartByUser/' + id);
    }
  }


  getCart(id?: string): Observable<CartM[] | CartM> {
    if (id) {
      return this.http.get<CartM>(environment.url + '/cart/get/' + id);
    }
    else {
      return this.http.get<CartM[]>(environment.url + '/cart/get');
    }
  }

  addCart(cart: CartM) {
    {
      this.http.post<CartM>(environment.url + '/cart/add', cart, httpOptions).subscribe(
        data => {
          alert(data)
          // console.log("POST Request is successful ", data);
          //result =   true;
        },
        error => {
          alert(error.error)
          console.log("Error", error);
        }
      )
    };
  };

  updateTotalSumByCartId(currCart:CartM){
    return this.http.post<CartM>(environment.url + '/cart/updateTotal', currCart, httpOptions)
  }
}
