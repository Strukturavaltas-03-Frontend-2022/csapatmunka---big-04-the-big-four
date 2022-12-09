import { Injectable } from '@angular/core';

export interface ITableColumn {
  title: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  productTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'Category', key: 'catID' },
    { title: 'Description', key: 'description' },
    { title: 'Price', key: 'price' },
    { title: 'Featured', key: 'featured' },
    { title: 'Active', key: 'active' },
  ];

  customerTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'First name', key: 'first_name' },
    { title: 'Last name', key: 'last_name' },
    { title: 'Email', key: 'email' },
    { title: 'Address', key: 'address' },
    { title: 'Active', key: 'active' },
  ];

  orderTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Customer', key: 'customerID' },
    { title: 'Product', key: 'productID' },
    { title: 'Amount', key: 'amount' },
    { title: 'Status', key: 'status' },
  ];

  billTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id' },
    { title: 'Order', key: 'orderID' },
    { title: 'Amount', key: 'amount' },
    { title: 'Status', key: 'status' },
  ];


  constructor() { }
}
