import { Customer } from "./customer";
import { Product } from "./product";

export class Order {
    [x: string]: any;
    id: number = 0;
    customerID: number = 0;
    customer?: Customer = new Customer();
    productID: number = 0;
    product?: Product = new Product();
    amount: number = 0;
    status: string = "new|shipped|paid";
}

export class OrderServer {
    [x: string]: any;
    id: number = 0;
    customerID: number = 0;
    productID: number = 0;
    amount: number = 0;
    status: string = "";
}

export class OrderDisp {
    [x: string]: any;
    id: number = 0;
    customerID: string = "";
    productID: string = "";
    amount: number = 0;
    status: string = "";
}
