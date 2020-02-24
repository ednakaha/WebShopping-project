import { EnumStatusCart } from 'src/environments/environment';

export class CartM {
    id: string;
    personId: string;
    createDate: Date;
    updatedate?: Date;
    status:EnumStatusCart;
    sum:Number;
  }