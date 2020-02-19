import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service'
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import * as moment from 'moment';
import { OrderService } from 'src/app/services/order/order.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user;
  logged: boolean;
  isNew: boolean;
  roleId: number;
  errorMessage: string;
  userId: string;
  updateDateCart: string;
  orderDate: string;


  constructor(private loginService: LoginService,private orderService: OrderService, private router: Router, private cartService: CartService) {
     this.cartService.IsNewUser.subscribe(isNew => {
      this.isNew = isNew;
    })
  }

  ngOnInit() {
    this.user = {};
  }
  getOrders() {
    debugger;
    this.orderService.getOrderByUser(this.userId).subscribe(orderData => {
      debugger;
      this.orderDate = moment(String(orderData["createdDate"]).slice(0, 16)).format('DD-MM-YYYY HH:mm:ss');
      debugger;
    })
  }


  login() {
    debugger;
    this.loginService.login(this.user).subscribe(loginRes => {
      //create or get the cart of the user
      this.userId = this.loginService.getUserId();
      this.cartService.getOrSetCart(this.userId).subscribe(cartData => {
        this.roleId = Number(this.loginService.getRoleId());
        this.logged = true;
        debugger;
        this.updateDateCart = moment(String(cartData[0]["updateDate"]).slice(0, 16)).format('DD-MM-YYYY HH:mm:ss');
       debugger;
        this.getOrders();
      });
      debugger;
      console.log('login ' + loginRes);
      this.errorMessage = String(loginRes);
      setTimeout(function () {
        this.errorMessage = '';
      }.bind(this), 3000);
    },
      error => {
        debugger;
        this.errorMessage = 'Error user name or password';
        setTimeout(function () {
          this.errorMessage = '';
        }.bind(this), 3000);
      }

    );
  }

  toShopping() {
    this.router.navigate(['/shopping-page']);
  }

}