import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bill, BillDisp, BillServer } from 'src/app/model/bill';
import { CustomerServer } from 'src/app/model/customer';
import { OrderDisp, OrderServer } from 'src/app/model/order';
import { ProductServer } from 'src/app/model/product';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent {
  combinedList: BillDisp[] = [];

  orderList: OrderServer[] = [];
  orders$: Observable<OrderServer[]> = this.dataService.getAll('order');

  productsList: ProductServer[] = [];
  products$: Observable<ProductServer[]> = this.dataService.getAll('product');

  customerList: CustomerServer[] = [];
  Customers$: Observable<CustomerServer[]> =
    this.dataService.getAll('customer');

  billList: BillServer[] = [];
  bills$: Observable<BillServer[]> = this.dataService.getAll('bill');

  list$: Observable<Bill[]> = this.dataService.getAll('bill');

  columns = this.config.billTableColumns;

  constructor(
    private dataService: DataService,
    private config: ConfigService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.updateCombinedList();
  }

  updateCombinedList(): void {
    this.products$.subscribe((data) => {
      this.productsList = data;
      this.orders$.subscribe((data) => {
        this.orderList = data;
        this.Customers$.subscribe((data) => {
          this.customerList = data;
          this.bills$.subscribe((data) => {
            this.billList = data;
            this.combinedList = [];
            this.setHideLoader(data)
            this.CombineData();
          });
        });
      });
    });
  }

  getCustomerName(customerID: number): string {
    let idx = this.customerList.findIndex(
      (element) => element.id == customerID
    );
    if (this.customerList[idx])
      return `${this.customerList[idx].first_name}, ${this.customerList[idx].last_name}`;
    else return 'Unknown';
  }

  getProductName(productID: number): string {
    let idx = this.productsList.findIndex((element) => element.id == productID);
    if (this.productsList[idx])
      return `${this.productsList[idx].name}, ${this.productsList[idx].type}`;
    else return 'Unknown';
  }

  getOrder(orderID: number): OrderServer {
    let idx = this.orderList.findIndex((element) => element.id == orderID);
    if (this.orderList[idx]) return this.orderList[idx];
    else return new OrderServer();
  }

  CombineData(): void {
    this.billList.forEach((item, index) => {
      this.combinedList[index] = new BillDisp();

      this.combinedList[index].id = item.id;
      this.combinedList[index].amount = item.amount;
      this.combinedList[index].status = item.status;
      let currOrder: OrderServer = this.getOrder(item.orderID);
      let currCustomer: string = this.getCustomerName(currOrder.customerID);
      let currProduct: string = this.getProductName(currOrder.productID);
      this.combinedList[
        index
      ].orderID = `Name:${currCustomer}; Product:${currProduct}`;
    });
  }

  onSelect(bill: BillDisp): void {
    this._router.navigateByUrl(`/edit-bill/${bill.id}`);
  }

  onDelete(bill: BillDisp): void {
    this.dataService
      .delete(bill.id, 'bill')
      .subscribe(() => this.updateCombinedList());
  }

  onCreate(): void {
    this._router.navigate(['/edit-bill/0']);
  }
  hideloader() {
    const loadingggg = document.getElementById('loading');
    if (loadingggg) {
      loadingggg.classList.add('visually-hidden')
    }
  }

  setHideLoader(dataToWaitFor: any) {
    if (dataToWaitFor) {
      this.hideloader();
    }
  }
}
