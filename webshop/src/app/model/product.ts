import { Category } from "./category";

export class Product {
    [x: string]: any;
    id: number = 0;
    name: string = "";
    type: string = "";
    catID: Category = new Category();
    description: number = 0;
    price: number = 0;
    featured: boolean = true;
    active: boolean = true;
}
