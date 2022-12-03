import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';


export class FormField {
  label: string = '';
  key: string = '';
  type?: string = 'text';
  htmlTag?: string = 'input'
  selectOptions?: { text: string, value: any }[];
  validators?: ValidatorFn[] = [];
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FormService {

  productEditorFormFields: FormField[] = [
    {
      label: 'Name',
      key: 'name',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Type',
      key: 'type',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Category',
      key: 'category',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'CategoryID',
      key: 'catID',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Description',
      key: 'description',
      htmlTag: 'textarea',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Price',
      key: 'description',
      type: 'number',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Featured',
      key: 'featured',
      type: 'checkbox',
    },
    {
      label: 'Active',
      key: 'active',
      type: 'checkbox',
    },
  ];

  customerEditorFormFields: FormField[] = [
    {
      label: 'First name',
      key: 'first_name',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Last name',
      key: 'last_name',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Email',
      key: 'email',
      validators: [
        Validators.email,
        Validators.required,
      ]
    },
    {
      label: 'Address',
      key: 'address',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Active',
      key: 'active',
      type: 'checkbox',
    },
  ];

  orderEditorFormFields: FormField[] = [
    {
      label: 'CustomerID',
      key: 'customerID',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Customer',
      key: 'customer',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'ProductID',
      key: 'productID',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Product',
      key: 'product',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Amount',
      key: 'amount',
      type: 'number',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Status',
      key: 'status',
      htmlTag: 'select',
      selectOptions: [
        { text: 'New', value: 'new' },
        { text: 'Shipped', value: 'shipped' },
        { text: 'Paid', value: 'paid' },
      ],
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Active',
      key: 'active',
      type: 'checkbox',
    },
  ];

  billEditorFormFields: FormField[] = [
    {
      label: 'Order',
      key: 'orderID',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Amount',
      key: 'amount',
      type: 'number',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Status',
      key: 'status',
      htmlTag: 'select',
      selectOptions: [
        { text: 'New', value: 'new' },
        { text: 'Paid', value: 'paid' },
      ],
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Active',
      key: 'active',
      type: 'checkbox',
    },
  ];

  constructor() { }


  usersList: any = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
      cars: [
        { name: 'Ford', models: 'Fiesta' },
        { name: 'BMW', models: 'X1' },
        { name: 'Fiat', models: '100' },
      ],
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618',
        },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
      cars: [
        { name: 'Ford', models: 'Fiesta' },
        { name: 'BMW', models: 'X2' },
        { name: 'Fiat', models: '200' },
      ],
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      address: {
        street: 'Douglas Extension',
        suite: 'Suite 847',
        city: 'McKenziehaven',
        zipcode: '59590-4157',
        geo: {
          lat: '-68.6102',
          lng: '-47.0653',
        },
      },
      phone: '1-463-123-4447',
      website: 'ramiro.info',
      company: {
        name: 'Romaguera-Jacobson',
        catchPhrase: 'Face to face bifurcated interface',
        bs: 'e-enable strategic applications',
      },
      cars: [
        { name: 'Ford', models: 'Fiesta' },
        { name: 'BMW', models: 'X3' },
        { name: 'Fiat', models: '300' },
      ],
    },
  ];

  fetchUsersList() {
    return [...this.usersList];
  }
}
