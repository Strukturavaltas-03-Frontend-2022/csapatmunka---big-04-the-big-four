import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product, ProductDisp, ProductServer } from 'src/app/model/product';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {


  productsList:ProductServer[]=[]
  categoryList:Category[]=[]
  combinedList:ProductDisp[]=[]
  products$: Observable<ProductServer[]> = this.dataService.getAll('product');
  categories$: Observable<Category[]> = this.dataService.getAll('category');
  



  columns = this.config.productTableColumns;


  constructor(

    private dataService:  DataService,
    private config: ConfigService,
    private _router: Router
  ) { }


  ngOnInit(): void {
   this.updateCombinedList()
  }

  updateCombinedList():void{
    this.products$.subscribe(
      data=>{this.productsList=data
             this.categories$.subscribe(
              data=>{this.categoryList=data;
                     this.combinedList=[];
                     this.CombineData();})})

  }


  CombineData():void{
    this.productsList.forEach((item,index)=>{
      if(!this.combinedList[index]){
        this.combinedList[index]=new ProductDisp()
      }
      this.combinedList[index].id=item.id;
      this.combinedList[index].name=item.name;
      this.combinedList[index].type=item.type;
      this.combinedList[index].description=item.description;
      this.combinedList[index].price=item.price;
      this.combinedList[index].featured=item.featured;
      this.combinedList[index].active=item.active;
      let idx=this.categoryList.findIndex((element)=>element.id==item.catID)
      this.combinedList[index].catID=`${this.categoryList[idx].name}, ${this.categoryList[idx].description}`
    })

  }


  onSelect( product:  ProductDisp): void {
    this._router.navigateByUrl(`/edit-product/${product.id}`)
   
  }

  onDelete(product:  ProductDisp): void {
    this.dataService.delete( product.id, 'product').subscribe(
      () => this.updateCombinedList(),
    );

  }
}
