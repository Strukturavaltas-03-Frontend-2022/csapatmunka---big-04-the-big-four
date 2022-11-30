import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  list$: Observable<Bill[]> = this.dataService.getAll('bill');

  columns = this.config.billTableColumns;

  constructor(
    private dataService:  DataService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  onSelect( bill:  Bill): void {
    console.log( bill);
  }

  onDelete(bill:  Bill): void {
    this.dataService.delete( bill.id, 'bill').subscribe(
      () => this.list$ = this.dataService.getAll('bill'),
    );
  }
}
