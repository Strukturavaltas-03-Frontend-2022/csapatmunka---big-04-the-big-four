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

  orderList: OrderServer[] = []
  orders$: Observable<OrderServer[]> = this.dataService.getAll('order');

  productsList: ProductServer[] = []
  products$: Observable<ProductServer[]> = this.dataService.getAll('product');

  customerList: CustomerServer[] = []
  Customers$: Observable<CustomerServer[]> = this.dataService.getAll('customer');

  billList: BillServer[] = []
  bills$: Observable<BillServer[]> = this.dataService.getAll('bill');

  categoryList: Category[] = []
  categories$: Observable<Category[]> = this.dataService.getAll('category');

  addressList: Address[] = []
  Address$: Observable<Address[]> = this.dataService.getAll('address');

  constructor(private dataService: DataService,) { }

  ngOnInit(): void {
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
                          })
                      })
                  })
              })
          })
      })

  }

}
