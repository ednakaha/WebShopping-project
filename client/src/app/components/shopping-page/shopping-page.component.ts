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
  itemArray: ItemM[];
  cartItemExArray: CartItemExpandedM[];
  query: string;
  item_Emitter: ItemM;
  roleId: Number;

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
    this.cartItemService.getCartItemExpanded(this.loginService.getCartId())
      .subscribe(cd => {
        this.cartItemExArray = cd;            
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
        
    this.filteredArray = this.itemArray.filter(val =>{
          
      return  val.categoryId.includes(categoryId)});
           

  }

  getSelectedItem(item) {
    this.item_Emitter = item
  }
  updateArry() {
    this.getCartItemExList();
  }


}
