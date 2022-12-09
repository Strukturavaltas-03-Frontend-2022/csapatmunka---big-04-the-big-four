import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField, FormService } from 'src/app/service/form.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { DataService } from 'src/app/service/data.service';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { Category } from 'src/app/model/category';
import { Address } from 'src/app/model/address';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {


  currentFormSection: string = ''

  // Common variables for creating forms -------------------------------------
  baseFormGroup: FormGroup = new FormGroup({});
  fields: FormField[] = [new FormField]
  dataIdForEdit: number = Number(this.router.url.split('/')[2]);

  // Product form variables----------------------------------------------------
  currentProduct: Product | null = null
  categorySelection: Category[] = []

  keyNameSwitchHappened: boolean = false

  // Product data combiner
  combinedProductData = combineLatest({
    mainData: this.dataService.get(this.dataIdForEdit, 'product'),
    subData: this.dataService.getAll('category'),
  })

  // Customer form variables---------------------------------------------------
  addressFormGroup: FormGroup = new FormGroup({});
  customerFields: FormField[] = [];
  addressFields: FormField[] = this.formService.addressEditorFormFields;
  currentCustomer: Customer | null = null
  customerAddress: Address | null = null

  addressControl: FormControl = new FormControl

  addressId: number = 0;


  // Order form variables------------------------------------------------------
  currentOrder: Order | null = null
  customerSelection: Customer[] | null = null;
  productSelection: Product[] | null = null;

  // Order data combiner
  combinedOrderData = combineLatest({
    mainData: this.dataService.get(this.dataIdForEdit, 'order'),
    subData1: this.dataService.getAll('customer'),
    subData2: this.dataService.getAll('product'),
  })

  // Bill form variables------------------------------------------------------
  currentBill: Bill | null = null
  orderSelection: Order[] | null = null;
  // customer & productSelection at order form segment

  // Bill data combiner
  combinedBillData = combineLatest({
    mainData: this.dataService.get(this.dataIdForEdit, 'bill'),
    subData1: this.dataService.getAll('order'),
    subData2: this.dataService.getAll('customer'),
    subData3: this.dataService.getAll('product'),
  })


  // CONSTRUCTOR --------------------------------------------------------------

  constructor(
    private router: Router,
    private dataService: DataService,
    private formService: FormService,
    private toastr: ToastrService,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    this.setUpCorrectForm(this.router.url)
  }






  // METHODS ------------------------------------------------------------------

  // Bill Form
  createBillForm() {
    if (this.dataIdForEdit == 0) {
      this.combinedBillData.subscribe(serverData => {
        this.currentBill = new Bill
        this.currentBill.status = ''

        this.orderSelection = serverData.subData1;
        this.customerSelection = serverData.subData2;
        this.productSelection = serverData.subData3;

        this.createControls(this.currentBill, this.fields,)
      });
    } else {
      this.combinedBillData.subscribe(serverData => {
        this.currentBill = serverData.mainData
        this.orderSelection = serverData.subData1;
        this.customerSelection = serverData.subData2;
        this.productSelection = serverData.subData3;
        this.createControls(this.currentBill, this.fields,)

      });
    }
  }

  // Order Form
  createOrderForm() {
    if (this.dataIdForEdit == 0) {
      this.combinedOrderData.subscribe(serverData => {
        this.currentOrder = new Order
        this.currentOrder.status = ''

        this.customerSelection = serverData.subData1;
        this.productSelection = serverData.subData2;

        this.createControls(this.currentOrder, this.fields,)
      });
    } else {
      this.combinedOrderData.subscribe(serverData => {
        this.currentOrder = serverData.mainData
        this.customerSelection = serverData.subData1;
        this.productSelection = serverData.subData2;
        this.createControls(this.currentOrder, this.fields,)
      });
    }
  }

  // Customer Form
  createCustomerForm() {
    if (this.dataIdForEdit == 0) {
      this.currentCustomer = new Customer;
      this.customerAddress = new Address;
      this.createControls(this.currentCustomer, this.fields, this.customerAddress)

    } else {
      this.dataService.get(this.dataIdForEdit, 'customer').subscribe(data => {
        this.currentCustomer = data
        this.addressId = data.address
        this.dataService.get(data.address, 'address').subscribe(subData => {
          this.customerAddress = subData
          if (this.customerAddress) {

            this.createControls(this.currentCustomer, this.fields, this.customerAddress)
          };
        })
      })
    }
  }


  // Product Form
  createProductForm() {
    if (this.dataIdForEdit == 0) {
      this.dataService.getAll('category').subscribe(data => {
        this.currentProduct = new Product
        this.currentProduct.featured = false;
        this.currentProduct.active = false;
        this.categorySelection = data;
        this.createControls(this.currentProduct, this.fields,)
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
    if (Number(this.dataIdForEdit) == Number(0)) {
      this.hideloader()
      this.setHideLoader(givenData)
    } else {
      this.setHideLoader(givenData)
    }

    // Check for givenData
    if (givenData == null) {
      console.error('waiting for data')
    } else {

      // Loop through fields, based on givenFields ( main fields )
      givenFields.forEach(field => {

        // Fix problematic indexing - occurs in CustomerData
        if (this.currentFormSection == 'customer') {

          if (field.key == 'first_name' || field.key == 'firstName') {
            field.key = 'firstName'
            givenData[field.key] = givenData['first_name']
          } else if (field.key === 'last_name' || field.key == 'lastName') {
            field.key = 'lastName'
            givenData[field.key] = givenData['last_name']
          }

          // Delay form creation until the aforementioned problematic indexing is fixed
          this.keyNameSwitchHappened = true
        }

        // If there is an address, create its FormControls and add them to addressFormGroup
        if (field.key == 'address') {
          this.addressFormGroup = new FormGroup({})
          this.addressFields.forEach(addressField => {
            if (givenAddress != undefined && this.addressFormGroup != null) {
              const control = new FormControl(givenAddress[addressField.key], addressField.validators);
              this.addressFormGroup.addControl(addressField.key, control);
            }
          })

        } else {
          // Create FormControl for any other field and add it to main FormGroup
          const control = new FormControl(givenData[field.key], field.validators);
          this.baseFormGroup.addControl(field.key, control);
        }
      })
      // Add the addressFormGroup to the main FormGroup, with 'address' key if its the Customer Form
      if (this.currentFormSection == 'customer') {
        this.baseFormGroup.addControl('address', this.addressFormGroup)
      }
    }

  }

  createSimpleFormControls(
    givenData: Bill | Product | Order | Category | null,
    givenFields: FormField[]
  ): void {

    if (givenData == null) {
      console.error('No data was received for form creation.')
    } else {
      // Loop through fields, based on givenFields ( main fields ) and add it to main FormGroup
      givenFields.forEach(field => {
        const control = new FormControl(givenData[field.key], field.validators);
        this.baseFormGroup.addControl(field.key, control);
      })
    }
  }

  // Method to get the right template for the form from url
  setUpCorrectForm(currentRoute: string) {
    const currentForm = currentRoute.split('/')[1]
    switch (currentForm) {
      case 'edit-bill': {
        this.fields = this.formService.billEditorFormFields;
        this.currentFormSection = 'bill'
        this.createBillForm()
      }
        break;
      case 'edit-customer': {
        this.fields = this.formService.customerEditorFormFields;
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

  onSubmit() {
    if (this.currentFormSection == 'product') {
      this.submitProduct(this.baseFormGroup.value)

    } else if (this.currentFormSection == 'customer') {
      this.submitCustomer(this.baseFormGroup.value)

    } else if (this.currentFormSection == 'order') {
      this.submitOrder(this.baseFormGroup.value)

    } else if (this.currentFormSection == 'bill') {
      this.submitBill(this.baseFormGroup.value)
    }
    this.dataIdForEdit == 0 ? this.toastrCreate() : this.toastrEdit()
  }


  submitProduct(formValues: { [x: string]: any }) {
    const product = formValues
    product['id'] = Number(this.dataIdForEdit)
    product['catID'] = Number(product['catID']);

    if (this.dataIdForEdit == 0) {
      this.dataService.create(product, 'product').subscribe(data => this.router.navigate(['/', 'products']))
    } else {
      this.dataService.update(product, 'product').subscribe(data => this.router.navigate(['/', 'products']))
    }
  }

  submitCustomer(formValues: { [x: string]: any }) {
    const customer = formValues
    const address = customer['address']

    if (this.dataIdForEdit == 0) {
      this.dataService.create(address, 'address').subscribe(data => {
        this.dataService.getAll('address').subscribe(serverData => {
          const latestElement = serverData.pop()
          this.addressId = latestElement.id

          customer['address'] = this.addressId
          customer['id'] = Number(this.dataIdForEdit)
          delete Object.assign(customer, { ['first_name']: customer['firstName'] })['firstName'];
          delete Object.assign(customer, { ['last_name']: customer['lastName'] })['lastName'];

          this.dataService.create(customer, 'customer').subscribe(data => this.router.navigate(['/', 'customer']))
        })
      })

    } else {
      address.id = this.addressId
      this.dataService.update(address, 'address').subscribe()

      customer['address'] = this.addressId
      customer['id'] = Number(this.dataIdForEdit)
      delete Object.assign(customer, { ['first_name']: customer['firstName'] })['firstName'];
      delete Object.assign(customer, { ['last_name']: customer['lastName'] })['lastName'];

      this.dataService.update(customer, 'customer').subscribe(data => this.router.navigate(['/', 'customer']))

    }
  }

  submitOrder(formValues: { [x: string]: any }) {
    const order = formValues
    order['id'] = Number(this.dataIdForEdit)

    if (this.dataIdForEdit == 0) {
      this.dataService.create(order, 'order').subscribe(data => this.router.navigate(['/', 'order']))
    } else {
      this.dataService.update(order, 'order').subscribe(data => this.router.navigate(['/', 'order']))
    }
  }

  submitBill(formValues: { [x: string]: any }) {
    const bill = formValues
    bill['id'] = Number(this.dataIdForEdit)

    if (this.dataIdForEdit == 0) {
      this.dataService.create(bill, 'bill').subscribe(data => this.router.navigate(['/', 'bill']))
    } else {
      this.dataService.update(bill, 'bill').subscribe(data => this.router.navigate(['/', 'bill']))
    }
  }


  // Toastr
  toastrCreate() {
    this.toastr.success(`A new ${this.currentFormSection} has been created.`, 'Success!', { timeOut: 6000 });
  }

  toastrEdit() {
    this.toastr.info(`The ${this.currentFormSection} has been updated successfully.`, 'Updated!', { timeOut: 6000 });
  }


  // Spinner
  // https://www.geeksforgeeks.org/how-to-display-spinner-on-the-screen-till-the-data-from-the-api-loads-using-angular-8/

  hideloader() {
    const loadingggg = document.getElementById('loading');
    if (loadingggg) {
      loadingggg.classList.add('visually-hidden')
    }
  }

  setHideLoader(dataToWaitFor: any) {
    if (dataToWaitFor) {
      this.hideloader();
    }
  }



}