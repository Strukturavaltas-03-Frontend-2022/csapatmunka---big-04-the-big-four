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
      label: 'Customer',
      key: 'customerID',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Product',
      key: 'productID',
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
}
