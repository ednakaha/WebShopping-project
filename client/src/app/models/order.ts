import { EnumStatusOrder } from '../../environments/environment';

export class OrderM{
    id:string;
    personId:string;
    cartId:string;
    finalSum:number;
    cityIdShip:string;
    streetShip:string;
    dateShip:Date;
    createdDate:Date;
    lastPaymentCreditCard:string;
    status:EnumStatusOrder;
  }