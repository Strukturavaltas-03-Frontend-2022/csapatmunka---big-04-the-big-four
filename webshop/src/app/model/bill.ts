import { Order } from "./order";

export class Bill {
    [x: string]: any;
    id: number = 0;
    orderID: number = 0
    amount: number = 0;
    status: string = "new|paid";
}
