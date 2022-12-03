import {Address} from "src/app/model/address"

export class Customer {
  [x:string]:any;
    id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  address: Address = new Address();
  active: boolean = true;
}

export class CustomerServer {
  [x:string]:any;
    id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  address: number = 0;
  active: boolean = true;
}

export class CustomerDisp {
  [x:string]:any;
  id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  address: string = "";
  active: boolean = true;
}
