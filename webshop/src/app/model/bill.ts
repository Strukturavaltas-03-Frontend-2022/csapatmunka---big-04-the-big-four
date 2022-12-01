import { Order } from "./order";

export class Bill {
    [x: string]: any;
    id: number = 0;
    orderID: Order = new Order();
    amount: number = 0;
    status: string = "new|paid";
}
