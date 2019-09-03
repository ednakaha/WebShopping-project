import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { GeneralM } from 'src/app/models/general';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/environments/environment.prod';
import { CartM } from 'src/app/models/cart';
import { LoginService } from 'src/app/services/login/login.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  ordersCounter: string;
  itemsCounter: string;
  isNew: boolean;
  updateDateCart: string;
  orderDate: string;

  constructor(private generalService: GeneralService, private cartService: CartService,
    private loginService: LoginService, private orderService: OrderService) { }

  ngOnInit() {
    this.getGeneral();
    this.getCart();
    this.getOrders();
  }

  getGeneral() {
    this.generalService.getGeneral()
      .subscribe(p => {
        this.ordersCounter = p[0].ordersCounter;
        this.itemsCounter = p[0].itemsCounter;
      });
  }
  getCart() {
    this.cartService.getCartByUser(this.loginService.getUserId()).subscribe(cartData => {
      let createdate = String(cartData["createDate"]).slice(0, 16);
      let updateDate = String(cartData["updateDate"]).slice(0, 16);
      this.isNew = (createdate === updateDate);
      this.updateDateCart = String(cartData["updateDate"]).slice(0, 16);
    })
  }

  getOrders() {
    this.orderService.getOrderByUser(this.loginService.getUserId()).subscribe(orderData => {
      debugger;
      this.orderDate = String(orderData["createdDate"]).slice(0, 16);
    })
  }

  //todo update cart on changes
}
