import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField, FormService } from 'src/app/service/form.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { DataService } from 'src/app/service/data.service';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  // Variables for creating forms
  baseFormGroup: FormGroup = new FormGroup({});
  fields: FormField[] = this.formService.orderEditorFormFields;

  currentParametersForForm: string[] = [];
  dataIdForEdit: number = 0;

  dataIsLive$: Observable<Order> = new Observable

  constructor(
    private router: Router,
    private dataService: DataService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    // Get the right template for the form from url 
    this.dataIdForEdit = Number(this.router.url.split('/')[2])
    this.setUpCorrectForm(this.router.url)

    // Create the form
    // this.formValues$.subscribe(data => this.createControls(data))
  }

  // Creating FormControls for validation
  createControls(givenData: Bill | Product | Customer | Order): void {
    console.log(givenData)

    this.fields.forEach(field => {
      console.log()
      const control = new FormControl(givenData[field.key], field.validators);
      console.log(givenData[field.key])
      this.baseFormGroup.addControl(field.key, control);
    });

  }

  onSubmit() { }

  prepareDataForBillForm(billData: Bill, orderData: Order) {

  }

  // Method to get the right template for the form from url
  setUpCorrectForm(currentRoute: string) {
    const currentForm = currentRoute.split('/')[1]
    switch (currentForm) {
      case 'edit-bill': {
        this.fields = this.formService.billEditorFormFields;
        this.getDataForForm('bill', 'order', 'orderID')
      }
        break;
      case 'edit-customer': {
        this.fields = this.formService.customerEditorFormFields;
        this.getDataForForm('customer', 'address', 'address')
      }
        break;
      case 'edit-order': {
        this.fields = this.formService.orderEditorFormFields;
        this.getDataForForm('order', 'customer', 'customerID', 'product', 'productID')
      }
        break;
      case 'edit-product': {
        this.fields = this.formService.productEditorFormFields;
        this.getDataForForm('product', 'category', 'catID')

        console.log('imhere')
      }
        break;
      default: console.error('Invalid route')
    }
  }

  // Method to get the data from the server for the forms
  getDataForForm(
    entityOne: string,
    entityTwo?: string,
    idTwoFromOne?: string,
    entityThree?: string,
    idThreeFromOne?: string) {

    // If there is only one valid parameter for the one entity
    if (!entityTwo && !idTwoFromOne && !entityThree && !idThreeFromOne) {
      this.dataIsLive$ = this.dataService.get(this.dataIdForEdit, entityOne)
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
