import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';


export class FormField {
  label: string = '';
  key: string = '';
  originalKey?: string = '';
  subKey?: string = '';
  type?: string = 'text';
  fieldType?: string = 'input'
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
      label: 'Description',
      key: 'description',
      fieldType: 'textarea',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Price',
      key: 'price',
      type: 'number',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Featured',
      key: 'featured',
      type: 'checkbox',
      fieldType: 'checkbox',

    },
    {
      label: 'Active',
      key: 'active',
      type: 'checkbox',
      fieldType: 'checkbox',
    },
    {
      label: 'Category',
      key: 'catID',
      fieldType: 'select',
      validators: [
        Validators.required,
      ]
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
      label: 'Active',
      key: 'active',
      type: 'checkbox',
      fieldType: 'checkbox',
    },
    {
      label: 'Address',
      key: 'address',
    },
  ];

  addressEditorFormFields: FormField[] = [
    {
      label: 'ZIP code',
      key: 'zip',
      type: 'number',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Country',
      key: 'country',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'City',
      key: 'city',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Street',
      key: 'street',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Notes',
      key: 'notes',
      fieldType: 'textarea',
      validators: [
        Validators.required,
      ]
    },
  ]

  orderEditorFormFields: FormField[] = [
    {
      label: 'Customer',
      key: 'customerID',
      fieldType: 'select',
      validators: [
        Validators.required,
      ],
    },
    {
      label: 'Product',
      key: 'productID',
      fieldType: 'select',
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
      fieldType: 'select',
      selectOptions: [
        { text: 'New', value: 'new' },
        { text: 'Shipped', value: 'shipped' },
        { text: 'Paid', value: 'paid' },
      ],
      validators: [
        Validators.required,
      ]
    },

  ];

  billEditorFormFields: FormField[] = [
    {
      label: 'Order',
      key: 'orderID',
      fieldType: 'select',
      validators: [
        Validators.required,
      ]
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
      fieldType: 'select',
      selectOptions: [
        { text: 'New', value: 'new' },
        { text: 'Shipped', value: 'shipped' },
        { text: 'Paid', value: 'paid' },
      ],
      validators: [
        Validators.required,
      ],
    },
  ];

  // Accessory fields
  categoryEditorFormFields: FormField[] = [
    {
      label: 'Category ID',
      key: 'id',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Category Name',
      key: 'name',
      validators: [
        Validators.required,
      ]
    },
    {
      label: 'Category Description',
      key: 'description',
      fieldType: 'textarea',
      validators: [
        Validators.required,
      ]
    }
  ];


  constructor() { }

}
