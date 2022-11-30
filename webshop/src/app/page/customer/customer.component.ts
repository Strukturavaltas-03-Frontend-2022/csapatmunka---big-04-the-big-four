import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  list$: Observable<Customer[]> = this.dataService.getAll('customer');

  columns = this.config.customerTableColumns;

  constructor(
    private dataService:  DataService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  onSelect( customer:  Customer): void {
    console.log( customer);
   
  }

  onDelete(customer:  Customer): void {
    this.dataService.delete( customer.id, 'customer').subscribe(
      () => this.list$ = this.dataService.getAll('customer'),
    );
  }
}
