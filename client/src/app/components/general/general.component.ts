import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { GeneralM } from 'src/app/models/general';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/environments/environment.prod';
import { CartM } from 'src/app/models/cart';
import { LoginService } from 'src/app/services/login/login.service';
import { OrderService } from 'src/app/services/order/order.service';
import * as moment from 'moment';
import { PersonM } from 'src/app/models/person';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  ordersCounter: string;
  itemsCounter: string;
  //isNew: boolean;
  // updateDateCart: string;
  
  firstName: string;
  aCurrentUser: PersonM;
  userId: string;

  constructor(private generalService: GeneralService, private cartService: CartService,
    private loginService: LoginService, private orderService: OrderService) {
    this.loginService.currentUser.subscribe(currLog => {
      debugger;
      this.aCurrentUser = currLog;
      //this.firstName = this.aCurrentUser['firstName'];
      this.userId = this.aCurrentUser['_id'];
    });
   
  }

  ngOnInit() {
    this.getGeneral();
   // this.firstName = this.loginService.getFirstName();
  }

  getGeneral() {
    this.generalService.getGeneral()
      .subscribe(p => {
        this.ordersCounter = p[0].ordersCounter;
        this.itemsCounter = p[0].itemsCounter;
      });
  }
 

  

  //todo update cart on changes
}
