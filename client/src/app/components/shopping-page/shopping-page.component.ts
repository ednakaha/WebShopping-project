import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItemService } from '../../services/cartItem/cart-item.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item/item.service';
import { ItemM } from 'src/app/models/item';
import { CartItemExpandedM } from 'src/app/models/cartItemExpanded';


@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  itemArray: ItemM[];//| ItemM;
  cartItemExArray: CartItemExpandedM[];
  query: string;
  item_Emitter: ItemM;
  roleId: Number;
  // @Output("itemArray") changeQueryEmitter: EventEmitter<ItemM[]> = new EventEmitter<ItemM[]>();

  filteredArray: ItemM[];
  errorMessage: string;
  constructor(private cartItemService: CartItemService,
    private itemService: ItemService,
    private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.item_Emitter = new ItemM()
    this.getListItem();
    this.roleId = Number(this.loginService.getRoleId());
    this.getCartItemExList();
  }



  getCartItemExList() {
    //  //debugger;
    //this.cartItemService.getCartItemExpanded()
    this.cartItemService.getCartItemExpanded(this.loginService.getCartId())
      .subscribe(cd => {
        this.cartItemExArray = cd;
        debugger;
      });
  }


  delCart() {
    if (confirm("Are you sure you want to delete the cart?")) {
      this.cartItemService.delAllItemsCart(this.loginService.getCartId())
        .subscribe(
          data => {
            this.errorMessage = String(data);
            setTimeout(function() {
              this.errorMessage = '';
          }.bind(this), 3000);
          },
          error => {
            this.errorMessage = error.error;
            setTimeout(function() {
              this.errorMessage = '';
          }.bind(this), 3000);
          }
        )
    }
    //refresh page after deleting
     window.location.reload();
  }

  getListItem() {
    this.itemService.getItem()
      .subscribe(p =>
        this.itemArray = p);
  }

  filterByName(t) {

    t.target.value ?
      this.filteredArray = this.itemArray.filter(val => val.name.toLowerCase().includes(t.target.value)) :
      this.filteredArray = [];

  }

  filterByCategory(categoryId) {
    debugger;
    this.filteredArray = this.itemArray.filter(val =>{
      debugger;
      return  val.categoryId.includes(categoryId)});
       debugger;

  }

  getSelectedItem(item) {
  //  console.log("--getSelectedItem---", item)
    this.item_Emitter = item
  }
  updateArry() {
    this.getCartItemExList();
  }


}
