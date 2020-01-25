import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartItemService } from 'src/app/services/cartItem/cart-item.service';
import { ItemService } from 'src/app/services/item/item.service';
import { CartItemExpandedM } from 'src/app/models/cartItemExpanded';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { ItemM } from 'src/app/models/item';
import { CartItemM } from 'src/app/models/cartItem';

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

  constructor(private loginService: LoginService, private cartService: CartService,
    private cartItemService: CartItemService, private router: Router, private itemService: ItemService) {

  }

  ngOnInit() {
    // this.getCartItemExList();
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
            debugger;
            this.errorMessage = String(data);
            this.deleteItemEmitter.emit()
            setTimeout(function() {
              this.errorMessage = '';
          }.bind(this), 3000);
            // console.log("POST Request is successful ", data);
            //result =   true;
          },
          error => {
            this.errorMessage = error.error;
            setTimeout(function() {
              this.errorMessage = '';
          }.bind(this), 3000);
          }
        )
      // this.rerender = true;
      //todo !!!!!! refresh
      //  this.rerunGuradsAndResolvers();
      //this.router.navigate(['/cart-item']);
      //  window.location.reload(); //todo reload
      // this.cartItemExArray.
    }
  }


  //Total Amount
  getTotal() {
    let total = 0;
    debugger;
    for (var i in this.cartItemExArray) {
      if (this.cartItemExArray[i].sum) {
        total += this.cartItemExArray[i].sum;
        this.totalAmount = total;
      }
    }
    return total.toFixed(2);
  }

  getCartItemExList() {
    //  //debugger;
    this.cartItemService.getCartItemExpanded(this.loginService.getCartId())
      .subscribe(cd => {
        this.cartItemExArray = cd;
        debugger;
      });
  }


}
