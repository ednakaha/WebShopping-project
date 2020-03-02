import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item/item.service';
import { ItemM } from 'src/app/models/item';
import { ActivatedRoute } from '@angular/router';
import { CartItemM } from 'src/app/models/cartItem';
import { CartItemService } from '../../services/cartItem/cart-item.service'
import { LoginService } from 'src/app/services/login/login.service';
import { PromptComponent } from '../prompt/prompt.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

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
  errorMessage: string;
  myImagesFolder: string;


  @Input() itemArray: ItemM[] | ItemM;

  count: number;

  @Output() updateItemEmitter: EventEmitter<ItemM[]> = new EventEmitter<ItemM[]>();
  @Output() addItemEmitter: EventEmitter<CartItemM> = new EventEmitter<CartItemM>();

  constructor(private route: ActivatedRoute, private itemService: ItemService,
    private loginService: LoginService, private cartItemService: CartItemService,
    private modalService: NgbModal) {
      
    this.myImagesFolder = environment.IMAGES_FOLDER;

  }

  ngOnInit() {
    this.setCategoryId();
    this.cartId = this.loginService.getCartId();
    this.userId = this.loginService.getUserId();
    this.roleId = Number(this.loginService.getRoleId());
    this.cartItem = new CartItemM();
  }

  addToCartItem(currItem: ItemM) {
    this.cartItem.itemId = currItem['_id'];
    this.cartItem.sum = currItem.price * this.selCount;
    this.cartItem.count = this.selCount;
    this.cartItem.cartId = this.cartId;
    this.cartItem.createdBy = this.userId;
    this.cartItem.createDate = new Date();
    this.cartItem.updateDate = new Date();
    
    this.cartItemService.addCartItem(this.cartItem)
      .subscribe(
        data => {
          this.errorMessage = String(data);
          this.addItemEmitter.emit(this.cartItem);
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

  updateItemByAdmin(item) {
    //emitter for <app-item-update>
    this.updateItemEmitter.emit(item)
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

