import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerServer } from 'src/app/model/customer';
import { Order, OrderDisp, OrderServer } from 'src/app/model/order';
import { ProductServer } from 'src/app/model/product';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  combinedList: OrderDisp[] = [];

  orderList: OrderServer[] = [];
  orders$: Observable<OrderServer[]> = this.dataService.getAll('order');

  productsList: ProductServer[] = [];
  products$: Observable<ProductServer[]> = this.dataService.getAll('product');

  customerList: CustomerServer[] = [];
  Customers$: Observable<CustomerServer[]> =
    this.dataService.getAll('customer');

  list$: Observable<Order[]> = this.dataService.getAll('order');

  columns = this.config.orderTableColumns;

  constructor(
    private dataService: DataService,
    private config: ConfigService,
    private _router: Router
  ) {}

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
          this.combinedList = [];
          this.CombineData();
        });
      });
    });
  }

  CombineData(): void {
    this.orderList.forEach((item, index) => {
      this.combinedList[index] = new OrderDisp();

      this.combinedList[index].id = item.id;
      this.combinedList[index].amount = item.amount;
      this.combinedList[index].status = item.status;

      let idx = this.customerList.findIndex(
        (element) => element.id == item.customerID
      );
      if (this.customerList[idx])
        this.combinedList[
          index
        ].customerID = `${this.customerList[idx].first_name}, ${this.customerList[idx].last_name}`;
      else this.combinedList[index].customerID = 'Unknown';

      idx = this.productsList.findIndex(
        (element) => element.id == item.productID
      );
      if (this.productsList[idx])
        this.combinedList[
          index
        ].productID = `${this.productsList[idx].name}, ${this.productsList[idx].type}`;
      else this.combinedList[index].productID = 'Unknown';
    });
  }

  onSelect(order: OrderDisp): void {
    this._router.navigateByUrl(`/edit-order/${order.id}`);
  }

  onDelete(order: OrderDisp): void {
    this.dataService
      .delete(order.id, 'order')
      .subscribe(() => this.updateCombinedList());
  }

  onCreate(): void {
    this._router.navigate(['/edit-order/0']);
  }
}
