import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField, FormService } from 'src/app/service/form.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { DataService } from 'src/app/service/data.service';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  currentFormSection: string = ''

  // Common variables for creating forms
  baseFormGroup: FormGroup = new FormGroup({});
  fields: FormField[] = [new FormField]
  dataIdForEdit: number = Number(this.router.url.split('/')[2]);

  // Product form ------------------------------------------------------------
  currentProduct: Product | null = null
  categorySelection: Category[] = []

  // Product data combiner
  combinedProductData = combineLatest({
    mainData: this.dataService.get(this.dataIdForEdit, 'product'),
    subData: this.dataService.getAll('category'),
  })

  // Customer form ------------------------------------------------------------
  combinedCustomerFormGroup: FormGroup = new FormGroup({});
  addressFormGroup: FormGroup = new FormGroup({});
  customerFormGroup: FormGroup = new FormGroup({});
  customerFields: FormField[] = [];
  addressFields: FormField[] = this.formService.addressEditorFormFields;
  currentCustomer: Customer | null = null
  customerAddress: Address | null = null

  addressId: number = 0;


  // Order form --------------------------------------------------------------

  currentOrder: Order | null = null

  customerSelection: Customer[] = [];
  productSelection: Product[] = [];

  // Order data combiner
  combinedOrderData = combineLatest({
    mainData: this.dataService.get(this.dataIdForEdit, 'order'),
    subData1: this.dataService.getAll('customer'),
    subData2: this.dataService.getAll('product'),
  })

  constructor(
    private router: Router,
    private dataService: DataService,
    private formService: FormService,

    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setUpCorrectForm(this.router.url)
  }

  // Customer Form
  createOrderForm() {
    if (this.dataIdForEdit == 0) {
      this.dataService.getAll('category').subscribe(data => {
        this.categorySelection = data;
        this.createControls(this.currentProduct, this.fields)
      })
    } else {
      this.combinedOrderData.subscribe(serverData => {
        this.currentProduct = serverData.mainData
        this.customerSelection = serverData.subData1;
        this.productSelection = serverData.subData1;
        this.createControls(this.currentProduct, this.fields,)
      });
    }
  }

  // Customer Form
  createCustomerForm() {
    this.dataService.get(this.dataIdForEdit, 'customer').subscribe(data => {
      this.currentCustomer = data
      this.addressId = data.address
      this.dataService.get(data.address, 'address').subscribe(subData => {
        this.customerAddress = subData
        if (this.customerAddress) {
          if (this.dataIdForEdit == 0) {
            this.createControls(new Customer, this.fields, this.customerAddress)
          } else {
            this.createControls(this.currentCustomer, this.customerFields, this.customerAddress)
          };
        }
      })
    })
  }

  // Product Form
  createProductForm() {
    if (this.dataIdForEdit == 0) {
      this.dataService.getAll('category').subscribe(data => {
        this.categorySelection = data;
        this.createControls(this.currentProduct, this.fields)
      })
    } else {
      this.combinedProductData.subscribe(serverData => {
        this.currentProduct = serverData.mainData
        this.categorySelection = serverData.subData;
        this.createControls(this.currentProduct, this.fields,)
      });
    }
  }

  // Template - how to create nested formgroup
  // this.addressFormGroup = new FormGroup({})
  // const control = new FormControl('mynewvalue', [Validators.required]);
  // this.addressFormGroup.addControl('mynewkey', control);
  // this.combinedCustomerFormGroup.addControl('address', this.addressFormGroup)

  // Creating FormControls for validation
  createControls(
    givenData: Bill | Product | Customer | Order | Category | null,
    givenFields: FormField[],
    givenAddress?: Address
  ): void {

    // Check for givenData
    if (givenData == null) {
      console.error('waiting for data')
    } else {

      // Loop through fields, based on givenFields ( main fields )
      givenFields.forEach(field => {

        // Fix problematic indexing - occurs in CustomerData
        if (field.key == 'first_name') {
          field.key = 'firstName'
          givenData[field.key] = givenData['first_name']
        } else if (field.key == 'last_name') {
          field.key = 'lastName'
          givenData[field.key] = givenData['last_name']
        }

        // If there is an address, great a new FormGroup with its fields
        if (field.key == 'address') {
          this.addressFormGroup = new FormGroup({})
          this.addressFields.forEach(addressField => {
            if (givenAddress != undefined && this.addressFormGroup != null) {
              const control = new FormControl(givenAddress[addressField.key], addressField.validators);
              this.addressFormGroup.addControl(addressField.key, control);
            }
          })

        } else {
          // 
          const control = new FormControl(givenData[field.key], field.validators);
          this.baseFormGroup.addControl(field.key, control);
        }
      })
      this.baseFormGroup.addControl('address', this.addressFormGroup)
    }
  }


  // Method to get the right template for the form from url
  setUpCorrectForm(currentRoute: string) {
    const currentForm = currentRoute.split('/')[1]
    switch (currentForm) {
      case 'edit-bill': {
        this.fields = this.formService.billEditorFormFields;
        this.currentFormSection = 'bill'
      }
        break;
      case 'edit-customer': {
        this.customerFields = this.formService.customerEditorFormFields;
        this.currentFormSection = 'customer'
        this.createCustomerForm()
      }
        break;
      case 'edit-order': {
        this.fields = this.formService.orderEditorFormFields;
        this.currentFormSection = 'order'
        this.createOrderForm()
      }
        break;
      case 'edit-product': {
        this.fields = this.formService.productEditorFormFields;
        this.currentFormSection = 'product'
        this.createProductForm()
      }
        break;
      default: console.error('Invalid route')
    }
  }

  onUpdate() {
    if (this.currentFormSection == 'product') {

      const product = this.baseFormGroup.value
      product.id = Number(this.dataIdForEdit)
      product.catID = Number(product.catID);
      this.dataService.update(product, 'product').subscribe(data => console.log(data))

    } else if (this.currentFormSection == 'customer') {

      const customer = this.baseFormGroup.value
      const address = customer.address
      address.id = this.addressId
      this.dataService.update(address, 'address').subscribe(data => console.log(data))

      delete customer['address']
      customer.id = Number(this.dataIdForEdit)
      delete Object.assign(customer, { ['first_name']: customer['firstName'] })['firstName'];
      delete Object.assign(customer, { ['last_name']: customer['lastName'] })['lastName'];

      this.dataService.update(customer, 'customer').subscribe(data => console.log(data))
    }
  }

}
