import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item/item.service';
import { ItemM } from 'src/app/models/item';
import { ActivatedRoute } from '@angular/router';
import { CartItemM } from 'src/app/models/cartItem';
import { CartItemService } from '../../services/cartItem/cart-item.service'
import { LoginService } from 'src/app/services/login/login.service';
import { PromptComponent } from '../prompt/prompt.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.css']
})
//onInit
export class ItemShowComponent implements OnInit {
  categoryId: any;
  cartId: string;
  userId: string;
  selCount: number;
  cartItem: CartItemM;
  roleId: number;
  item: ItemM;


  @Input() itemArray: ItemM[] | ItemM;

  count: number;

  @Output() updateItemEmitter: EventEmitter<ItemM[]> = new EventEmitter<ItemM[]>();
  @Output() addItemEmitter: EventEmitter<CartItemM> = new EventEmitter<CartItemM>();

  constructor(private route: ActivatedRoute, private itemService: ItemService,
    private loginService: LoginService, private cartItemService: CartItemService,
    private modalService: NgbModal) {

  }

  ngOnInit() {
    // this.toggle = true;
    this.setCategoryId();
    // this.getListItemByCat();
    this.cartId = this.loginService.getCartId();
    this.userId = this.loginService.getUserId();
    this.roleId = Number(this.loginService.getRoleId());
    this.cartItem = new CartItemM();
  }

  addToCartItem(currItem: ItemM) {
    this.cartItem.itemId = currItem['_id'];
    // this.cartItem.count = this.count;
    this.cartItem.sum = currItem.price * this.selCount;
    this.cartItem.count = this.selCount;
    this.cartItem.cartId = this.cartId;
    this.cartItem.createdBy = this.userId;
    this.cartItem.createDate = new Date();
    this.cartItem.updateDate = new Date();
    this.cartItemService.addCartItem(this.cartItem)
      .subscribe(
        data => {
          debugger;
          alert(data);
          this.addItemEmitter.emit(this.cartItem);
          // console.log("POST Request is successful ", data);
          //result =   true;
        },
        error => {
          alert(error.error)
          console.log("Error", error);
          // return false;
        }
      )


  }

  updateItemByAdmin(item) {
    //emitter for <app-item-update>
    this.updateItemEmitter.emit(item)
    // alert('update item');
  }

  // getItemDataById(id: string) {
  //   this.itemService.getItemById(id).subscribe(data =>
  //     this.updateItemEmitter.emit(data)

  //   )
  // }


  setCategoryId() {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });
  }

  openModal(currItem: ItemM) {
    const modalReference = this.modalService.open(PromptComponent);
    //get the count's selected from prompt component
    modalReference.componentInstance.passEntry.subscribe((SelectedCount) => {
      this.selCount = SelectedCount;
      modalReference.close();
      this.addToCartItem(currItem);
    })

  }

}

