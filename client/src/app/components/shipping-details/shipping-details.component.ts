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
import { OrdersDateGroup } from 'src/app/models/ordersDateGroup';
import * as moment from 'moment';
import {Router} from '@angular/router';

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
  config: NgbDatepickerConfig;
  calendar: NgbCalendar;
  filteredArrayDate: string[] = [];
  textFile: string;
  ShipDate:Date;

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  cartItemExArray: CartItemExpandedM[] | CartItemExpandedM;
  errorMessage: string;
 
  

  markDisabled2(date: { year: number, month: number, date: number }): boolean {

    return date.date <= 3;
  }



  constructor(private orderService: OrderService, private loginService: LoginService,
    private cartItemService: CartItemService,private router: Router) {

    this.loadGroupOrdersByDate();

    this.orderDone = false;
  }

  getSelectedCityId($event) {
    this.emitCityId = $event;
  }

  ngOnInit() {
  }
  doOrder() {
    this.orderService.addOrder({
      id: "",
      personId: this.loginService.getUserId(),
      cartId: this.loginService.getCartId(),
      finalSum: 0,  //todo total!!!!
      cityIdShip: this.emitCityId,
      streetShip: this.streetShip,
      dateShip:this.ShipDate,// new Date(this.dateShip),//todo fix date from object to date - now it's null
      createdDate: new Date(),
      lastPaymentCreditCard: String(this.creditCardNo).slice(-4),
      status: EnumStatusOrder.Close
    }
    ).subscribe(orderRes => {

      this.errorMessage = String(orderRes);
      this.orderDone = orderRes;
      setTimeout(function() {
        this.errorMessage = '';
    }.bind(this), 3000);
    },
      error => {
        // debugger;
        this.errorMessage = error.error;
        setTimeout(function() {
          this.errorMessage = '';
      }.bind(this), 3000);
      });
  }


navigateToHome(){
  this.router.navigate(['/first-Page']);
}
  dynamicDownloadTxt(res: any) {
    this.textFile = JSON.stringify(res);
    this.textFile = this.textFile.split('"').join('').split('[').join('').split(']').join('').split(',').join('\r\n');
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Order file',
      text: this.textFile
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

  isDateInArray(array, value) {
    return !!array.find(item => { return item.getTime() == value.getTime(); });
  }

  //define calender 
  setCalender(groupOrdersByDateArray) {
    // customize default values of datepickers used by this component tree
    debugger;
    this.config.minDate = { year: 1900, month: 1, day: 1 };
    this.config.maxDate = { year: 2099, month: 12, day: 31 };

    // days that don't belong to current month are not visible
    this.config.outsideDays = 'hidden';

    // weekends are disabled
    //config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) === 6;
    //config.markDisabled =  (date: NgbDate) => 
    // date === NgbDate.from({year: 2019, month: 9, day: 1});
    //const todayNGB = calendar.getToday();
    //const today = new Date(todayNGB.year, todayNGB.month, todayNGB.day);
    // var array = [new Date("December 10, 2019 00:00:00"), new Date("December 14, 2019 00:00:00"), new Date("December 28, 2016 00:00:00"), new Date("December 29, 2016 00:00:00")];
    debugger;
    this.config.markDisabled = (date: NgbDateStruct) => {
      const d = new Date(date.year, date.month, date.day);
      debugger;
      return (this.isDateInArray(groupOrdersByDateArray, d));
    }



  };

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

  loadGroupOrdersByDate() {
    this.orderService.getGroupingOrders().subscribe(
      groupO => {
        //filter just 3 orders for a day
        var filteredOrders = groupO.filter(e => {
          return e.total >= 3
        });

        filteredOrders.forEach(val => {
          debugger;
          var currDate = val["_id"];
          //  this.filteredArrayDate.push('new Date('+ new Date(currDate).toISOString().slice(0,10)+')');//new Date(currDate));
          this.filteredArrayDate.push('new Date(' + moment(String(currDate).slice(0, 16)).format('MMMM DD, YYYY HH:mm:ss') + ')');

        });
        //  debugger;
        //  var array1 = [new Date("December 10, 2019 00:00:00"), new Date("December 14, 2019 00:00:00"), new Date("December 28, 2016 00:00:00"), new Date("December 29, 2016 00:00:00")];
        this.setCalender(this.filteredArrayDate);
      }
    )
  }
}