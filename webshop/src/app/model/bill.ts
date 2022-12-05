import { Order } from "./order";

export class Bill {
    [x: string]: any;
    id: number = 0;
    amount: number = 0;
    status: string = "new|paid";
    orderID: number = 0;
    order?: Order = new Order();
}

export class BillServer {
    [x: string]: any;
    id: number = 0;
    amount: number = 0;
    status: string = "new|paid";
    orderID: number = 0;
}

export class BillDisp {
    [x: string]: any;
    id: number = 0;
    amount: number = 0;
    status: string = "new|paid";
    orderID: string = "";
}
