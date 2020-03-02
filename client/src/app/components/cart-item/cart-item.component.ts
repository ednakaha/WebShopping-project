import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartItemService } from 'src/app/services/cartItem/cart-item.service';
import { ItemService } from 'src/app/services/item/item.service';
import { CartItemExpandedM } from 'src/app/models/cartItemExpanded';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { CartM } from 'src/app/models/cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  totalAmount: number;
  @Input() cartItemExArray: CartItemExpandedM[];
  rerender = true;
  @Output() deleteItemEmitter: EventEmitter<void> = new EventEmitter<void>();
  errorMessage: any;
  currCart: CartM;


  constructor(private loginService: LoginService, private cartService: CartService,
    private cartItemService: CartItemService, private router: Router, private itemService: ItemService) {
  }

  ngOnInit() {
    this.currCart = new CartM();
    this.totalAmount = Number(this.getTotal);
  }

  rerunGuradsAndResolvers() {
    const defaltOnSameUrlNavigation = this.router.onSameUrlNavigation;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(this.router.url, {
      replaceUrl: true
    });
    this.router.onSameUrlNavigation = defaltOnSameUrlNavigation;
  }


  delCartItem(id: string) {
    //this.rerender = false;
    if (confirm("Are you sure you want to delete the item?")) {
      this.cartItemService.delItemCartById(id)
        .subscribe(
          data => {

            this.errorMessage = String(data);
            this.deleteItemEmitter.emit()
            setTimeout(function () {
              this.errorMessage = '';
            }.bind(this), 3000);
          },
          error => {
            this.errorMessage = error.error;
            setTimeout(function () {
              this.errorMessage = '';
            }.bind(this), 3000);
          }
        )
    }
  }

  UpdateSum() {
    //save total sum in Cart table
    this.currCart.id = this.loginService.getCartId();
    this.currCart.sum = this.totalAmount;
    this.cartService.updateTotalSumByCartId(this.currCart).subscribe(
      data => {
        this.errorMessage = String(data)
        setTimeout(function () {
          this.errorMessage = '';
        }.bind(this), 3000);
      },
      error => {
        this.errorMessage = error.error;
        console.log("Error", error);
        setTimeout(function () {
          this.errorMessage = '';
        }.bind(this), 3000);
      }
    );
  }


  //Total Amount
  getTotal() {
    let total = 0;
    for (var i in this.cartItemExArray) {
      if (this.cartItemExArray[i].sum) {
        total += this.cartItemExArray[i].sum;
        this.totalAmount = total;
      }
    }
    return total.toFixed(2);
  }

  getCartItemExList() {
    this.cartItemService.getCartItemExpanded(this.loginService.getCartId())
      .subscribe(cd => {
        this.cartItemExArray = cd;
      });
  }

}
