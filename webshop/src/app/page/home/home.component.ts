import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address';
import { BillServer } from 'src/app/model/bill';
import { Category } from 'src/app/model/category';
import { CustomerServer } from 'src/app/model/customer';
import { OrderServer } from 'src/app/model/order';
import { ProductServer } from 'src/app/model/product';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  openOrders: number = 0;
  orderList: OrderServer[] = []
  orders$: Observable<OrderServer[]> = this.dataService.getAll('order');

  activeProducts: number = 0;
  productsList: ProductServer[] = []
  products$: Observable<ProductServer[]> = this.dataService.getAll('product');

  activeCustomers: number = 0;
  customerList: CustomerServer[] = []
  Customers$: Observable<CustomerServer[]> = this.dataService.getAll('customer');

  unpaidSum:string="";
  billList: BillServer[] = []
  bills$: Observable<BillServer[]> = this.dataService.getAll('bill');

  categoryList: Category[] = []
  categories$: Observable<Category[]> = this.dataService.getAll('category');

  addressList: Address[] = []
  Address$: Observable<Address[]> = this.dataService.getAll('address');

  constructor(private dataService: DataService,) { }

  ngOnInit(): void {
    this.getAllAll()
  }

  getAllAll(): void {
    this.products$.subscribe(
      data => {
        this.productsList = data
        this.orders$.subscribe(
          data => {
            this.orderList = data;
            this.Customers$.subscribe(
              data => {
                this.customerList = data;
                this.bills$.subscribe(
                  data => {
                    this.billList = data;
                    this.categories$.subscribe(
                      data => {
                        this.categoryList = data
                        this.Address$.subscribe(
                          data => {
                            this.addressList = data
                            this.dataSummary()
                          })
                      })
                  })
              })
          })
      })

  }




  dataSummary(): void {
    //aktív termékek
    let accumulator: number = 0;
    this.productsList.forEach(item => { if (item.active) { accumulator++ } });
    this.activeProducts = accumulator;
    //aktív felhasználók
    accumulator = 0;
    this.customerList.forEach(item => { if (item.active) { accumulator++ } });
    this.activeCustomers = accumulator;
    //ki nem fizetett rendelések
    accumulator = 0;
    this.orderList.forEach(item => { if (item.status == "new") { accumulator++ } });
    this.openOrders = accumulator;
    //Még nem fizetett számlák összege
    accumulator = 0;
    this.billList.forEach(item => { 
      if (item.status == "new") { 
        let currOrder=this.getOrder(item.orderID)
        let currProduct=this.getProduct(currOrder.productID)
        accumulator=accumulator+currProduct.price*item.amount
       } });
    this.unpaidSum = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(accumulator);

  }


  getProduct(productID: number): ProductServer {
    let idx = this.productsList.findIndex((element) => element.id == productID)
    if (this.productsList[idx])
      return this.productsList[idx]
    else
      return new ProductServer()
  }

  getOrder(orderID: number): OrderServer {
    let idx = this.orderList.findIndex((element) => element.id == orderID)
    if (this.orderList[idx])
      return this.orderList[idx]
    else
      return new OrderServer()
  }


}
