import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service'
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { CityService } from 'src/app/services/city/city.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user;
  logged: boolean;
  isNew: boolean;

  constructor(private loginService: LoginService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.user = {};
  }

  login() {
    this.loginService.login(this.user).subscribe(loginRes => {
      //create or get the cart of the user
      this.cartService.getOrSetCart(this.loginService.getUserId()).subscribe(cartData => {
        let createdate = String(cartData["createDate"]).slice(0, 16);
        let updateDate = String(cartData["updateDate"]).slice(0, 16);
        this.isNew = (createdate === updateDate);
      
        this.logged = true;
      });
      console.log('login ' + loginRes);
    })
  }

  toShopping() {
    this.router.navigate(['/shopping-page']);
  }

}