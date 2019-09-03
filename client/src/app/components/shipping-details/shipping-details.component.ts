import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { LoginService } from 'src/app/services/login/login.service';
import { OrderM } from '../../models/order'
import { EnumStatusOrder } from '../../../environments/environment';
import { of, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CartItemService } from 'src/app/services/cartItem/cart-item.service';
import { CartItemExpandedM } from 'src/app/models/cartItemExpanded';
@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {
  model;
  emitCityId: string;
  streetShip: string;
  dateShip: Date;
  creditCardNo: number;
  orderDone: Boolean;
  lastOrder: OrderM;

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  cartItemExArray: CartItemExpandedM[] | CartItemExpandedM;


  constructor(private orderService: OrderService, private loginService: LoginService,
    private cartItemService: CartItemService) {
    this.orderDone = false;
  }

  getSelectedCityId($event) {
    this.emitCityId = $event;
  }

  ngOnInit() {
  }
  doOrder() {
    //debugger;
    this.orderService.addOrder({
      id: "",
      personId: this.loginService.getUserId(),
      cartId: this.loginService.getCartId(),
      finalSum: 0,  //todo total!!!!
      cityIdShip: this.emitCityId,
      streetShip: this.streetShip,
      dateShip: new Date(this.dateShip),//todo fix date from object to date - now it's null
      createdDate: new Date(),
      lastPaymentCreditCard: String(this.creditCardNo).slice(-4),
      status: EnumStatusOrder.Close
    }).subscribe(orderRes => {
      //debugger;
      this.orderDone = orderRes;
    });
  }



  dynamicDownloadTxt(res: any) {
    //debugger;
    // if (res!= undefined){
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Order file',
      text: JSON.stringify(res)
    }
);
  }



  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    //debugger;
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = 'text/plain';
    //debugger;
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
  
  getCartItemExList() {
    //debugger;
    this.cartItemService.getcartItemForTextFile(this.loginService.getCartId())
      .subscribe(cd => {
        //debugger;
        this.cartItemExArray = cd;
        this.dynamicDownloadTxt(this.cartItemExArray);
        //debugger;
      });
  }

}