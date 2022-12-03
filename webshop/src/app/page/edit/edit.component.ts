import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField, FormService } from 'src/app/service/form.service';

import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { combineLatest, map, Observable, of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  // Variables for creating forms  
  baseFormGroup: FormGroup = new FormGroup({});
  fields: FormField[] = this.formService.orderEditorFormFields;

  dataIdForEdit: number = 2;
  formValues$: Observable<Order> = new Observable

  constructor(
    private dataService: DataService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.getDataForForm('order', 'customer', 'customerID', 'product', 'productID')
    this.formValues$.subscribe(data => this.createControls(data))
  }

  // Creating FormControls for validation
  createControls(givenData: Bill | Product | Customer | Order): void {

    this.fields.forEach(field => {
      const control = new FormControl(givenData[field.key], field.validators);
      this.baseFormGroup.addControl(field.key, control);
    });
  }

  onSubmit() { }

  prepareDataForBillForm(billData: Bill, orderData: Order) {

  }

  getDataForForm(
    entityOne: string,
    entityTwo?: string,
    idTwoFromOne?: string,
    entityThree?: string,
    idThreeFromOne?: string) {

    // If there is only one valid parameter for the one entity
    if (!entityTwo && !idTwoFromOne && !entityThree && !idThreeFromOne) {
      this.formValues$ = this.dataService.get(this.dataIdForEdit, entityOne)
    }

    // Three valid parameters for two entity
    else if (entityTwo && idTwoFromOne && !entityThree && !idThreeFromOne) {

      this.dataService.get(this.dataIdForEdit, entityOne).subscribe(dataOne => {
        let dataToReturn = dataOne;
        let idFromDataOne = dataOne[idTwoFromOne];
        this.dataService.get(idFromDataOne, entityTwo).subscribe(secondaryServerData => {
          dataToReturn[entityTwo] = secondaryServerData;
        });
        this.createControls(dataToReturn)
        console.log(dataToReturn)
      });
    }

    // 5 valid parameters for three entity
    else if (entityTwo && idTwoFromOne && entityThree && idThreeFromOne) {

      this.dataService.get(this.dataIdForEdit, entityOne).subscribe(dataOne => {
        let dataToReturn = dataOne;
        let idTwoFromDataOne = dataOne[idTwoFromOne];
        let idThreeFromDataOne = dataOne[idThreeFromOne];

        this.dataService.get(idTwoFromDataOne, entityTwo).subscribe(secondaryServerData => {
          dataToReturn[entityTwo] = secondaryServerData;
        });

        this.dataService.get(idThreeFromDataOne, entityThree).subscribe(tertiaryServerData => {
          dataToReturn[entityThree] = tertiaryServerData;
        });

        this.createControls(dataToReturn)
        console.log(dataToReturn)
      });
    }
  }

  // getProductForForm() {
  //   this.dataService.get(this.dataIdForEdit, 'bill').subscribe(primaryServerData => {
  //     let dataToReturn = primaryServerData;
  //     let idFromPrimaryServerData = primaryServerData['orderID'];
  //     this.dataService.get(idFromPrimaryServerData, 'order').subscribe(secondaryServerData => {
  //       dataToReturn['order'] = secondaryServerData;
  //       this.list = dataToReturn
  //     });
  //   });
  // }

}
