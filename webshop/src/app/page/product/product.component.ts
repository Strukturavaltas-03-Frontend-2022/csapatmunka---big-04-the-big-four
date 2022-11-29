import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  
  productList$: Observable<Product[]> = this.dataService.getAll('product');

  columns = this.config.productTableColumns;

  constructor(
    private dataService:  DataService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    //this.productList$.subscribe(data=>{console.log(data)})
  }

  onProductSelect( product:  Product): void {
    console.log( product);
   
  }

  onProductDelete(product:  Product): void {
    this.dataService.delete( product.id, 'product').subscribe(
      () => this.productList$ = this.dataService.getAll('product'),
    );
  }
}
