import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  list$: Observable<Order[]> = this.dataService.getAll('order');

  columns = this.config.orderTableColumns;

  constructor(
    private dataService:  DataService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  onSelect( order:  Order): void {
    console.log( order);
   
  }

  onDelete(order:  Order): void {
    this.dataService.delete( order.id, 'order').subscribe(
      () => this.list$ = this.dataService.getAll('order'),
    );
  }
}
