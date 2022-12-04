import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address';
import { Customer, CustomerDisp, CustomerServer } from 'src/app/model/customer';
import { ConfigService } from 'src/app/service/config.service';
import { DataService } from 'src/app/service/data.service';






@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  customerList:CustomerServer[]=[]
  addressList:Address[]=[]
  combinedList:CustomerDisp[]=[]
  Customers$: Observable<CustomerServer[]> = this.dataService.getAll('customer');
  Address$: Observable<Address[]> = this.dataService.getAll('address');

  columns = this.config.customerTableColumns;

  constructor(
    private dataService:  DataService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
   this.updateCombinedList()
  }

  updateCombinedList():void{
    this.Customers$.subscribe(
      data=>{this.customerList=data
             this.Address$.subscribe(
              data=>{this.addressList=data
                     this.CombineData()})})

  }


  CombineData():void{
    this.customerList.forEach((item,index)=>{
      if(!this.combinedList[index]){
        this.combinedList[index]=new CustomerDisp()
      }
      this.combinedList[index].id=item.id
      this.combinedList[index].first_name=item.first_name
      this.combinedList[index].last_name=item.last_name
      this.combinedList[index].email=item.email
      this.combinedList[index].active=item.active
      let addIdx=this.addressList.findIndex((element)=>element.id==item.address)
      this.combinedList[index].address=`${this.addressList[addIdx].notes},
                                        ${this.addressList[addIdx].street}, 
                                        ${this.addressList[addIdx].city}, 
                                        ${this.addressList[addIdx].country}, 
                                        ${this.addressList[addIdx].zip}`
    })
  }

    /*id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  address: Address = new Address();
  active: boolean = true;*/

  /*    id: number = 0;
    zip: number = 0;
    country: string = "";
    city: string = "";
    street: string = "";
    notes: string = "";*/

  onSelect( customer:  CustomerDisp): void {
    console.log( customer);
   
  }

  onDelete(customer:  CustomerDisp): void {
    this.dataService.delete( customer.id, 'customer').subscribe(
      () => this.Customers$ = this.dataService.getAll('customer'),
    );
  }
}
