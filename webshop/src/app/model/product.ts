import { Category } from "./category";

export class Product {
    [x: string]: any;
    id: number = 0;
    name: string = "";
    type: string = "";
    catID: number = 0;
    category?: Category = new Category();
    description: number = 0;
    price: number = 0;
    featured: boolean = true;
    active: boolean = true;
}

export class ProductServer {
    [x: string]: any;
    id: number = 0;
    name: string = "";
    type: string = "";
    catID: number = 0;
    description: number = 0;
    price: number = 0;
    featured: boolean = true;
    active: boolean = true;
}

export class ProductDisp {
    [x: string]: any;
    id: number = 0;
    name: string = "";
    type: string = "";
    catID: string = "";
    description: number = 0;
    price: number = 0;
    featured: boolean = true;
    active: boolean = true;
}
