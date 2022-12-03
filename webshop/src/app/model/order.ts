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
