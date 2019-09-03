import { EnumRole } from 'src/environments/environment';

export class PersonM {
    id: number;
    tz:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cityId: string;
    street: string;
    roleId: EnumRole;
  }