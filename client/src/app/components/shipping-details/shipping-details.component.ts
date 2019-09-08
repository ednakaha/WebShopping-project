import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { LoginService } from 'src/app/services/login/login.service';
import { OrderM } from '../../models/order'
import { EnumStatusOrder } from '../../../environments/environment';
import { of, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CartItemService } from 'src/app/services/cartItem/cart-item.service';
import { CartItemExpandedM } from 'src/app/models/cartItemExpanded';
import { NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {
  //model;
  emitCityId: string;
  streetShip: string;
  dateShip: Date;
  creditCardNo: number;
  orderDone: Boolean;
  lastOrder: OrderM;
  model: NgbDateStruct;

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  cartItemExArray: CartItemExpandedM[] | CartItemExpandedM;
  markDisabled2(date: { year: number, month: number, date: number }): boolean {
    debugger;
    return date.date <= 3;
  }



  constructor(private orderService: OrderService, private loginService: LoginService,
    private cartItemService: CartItemService, config: NgbDatepickerConfig, calendar: NgbCalendar) {
    // customize default values of datepickers used by this component tree
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2099, month: 12, day: 31 };

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';

    // weekends are disabled
    //config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) === 6;
    //config.markDisabled =  (date: NgbDate) => 
    // date === NgbDate.from({year: 2019, month: 9, day: 1});
    //const todayNGB = calendar.getToday();
    //const today = new Date(todayNGB.year, todayNGB.month, todayNGB.day);
    var array = [new Date("December 10, 2019 00:00:00"), new Date("December 14, 2019 00:00:00"), new Date("December 28, 2016 00:00:00"), new Date("December 29, 2016 00:00:00")];
    function isInArray(array, value) {
      return !!array.find(item => { return item.getTime() == value.getTime() ;});
    }
    config.markDisabled = (date: NgbDateStruct) => {
      const d = new Date(date.year, date.month, date.day);
      return (isInArray(array, d));
      // return d > today;
    };
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