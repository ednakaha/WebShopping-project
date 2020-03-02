import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { LoginService } from 'src/app/services/login/login.service';
import { OrderService } from 'src/app/services/order/order.service';
import { PersonM } from 'src/app/models/person';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  ordersCounter: string;
  itemsCounter: string;
  
  firstName: string;
  aCurrentUser: PersonM;
  userId: string;

  constructor(private generalService: GeneralService, private cartService: CartService,
    private loginService: LoginService, private orderService: OrderService) {
    this.loginService.currentUser.subscribe(currLog => {
          
      this.aCurrentUser = currLog;
      this.firstName = this.aCurrentUser['firstName'];
      this.userId = this.aCurrentUser['_id'];
    });
   
  }

  ngOnInit() {
    this.getGeneral();
  }

  getGeneral() {
    this.generalService.getGeneral()
      .subscribe(p => {
        this.ordersCounter = p[0].ordersCounter;
        this.itemsCounter = p[0].itemsCounter;
      });
  }
 
}
