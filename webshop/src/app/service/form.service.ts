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
  myErrorMessage?: string;
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
        Validators.pattern(/^[a-záíűőüöúóé ,.'-]{3,30}$/i),
      ],
      myErrorMessage: `The product name must be 3-30 characters long and can't contain special characters  (except: ,.'-)`
    },
    {
      label: 'Type',
      key: 'type',
      validators: [
        Validators.pattern(/^.{2,15}$/i),
        Validators.required,
      ],
      myErrorMessage: 'The type must be 2-15 characters long.'
    },
    {
      label: 'Description',
      key: 'description',
      fieldType: 'textarea',
      validators: [
        Validators.pattern(/[^0]+/),
        Validators.required,
      ],
      myErrorMessage: `You can't leave this field empty.`
    },
    {
      label: 'Price',
      key: 'price',
      type: 'number',
      validators: [
        Validators.pattern(/^(?:(?:[1-9][0-9]{0,14})(?:\.[0-9]{0,2})?|\.[0-9]+)$/),
        Validators.required,
      ],
      myErrorMessage: `Max length: 15 number, and it can have decimals but no leading zeros.`
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
        Validators.pattern(/[^0]+/),
        Validators.required,
      ],
      myErrorMessage: 'You must pick a status!',
    },
  ];

  customerEditorFormFields: FormField[] = [
    {
      label: 'First name',
      key: 'first_name',
      validators: [
        Validators.pattern(/^[a-záíűőüöúóé ,.'-]{2,20}$/i),
        Validators.required,
      ],
      myErrorMessage: `The first name must be 2-30 characters long and can't contain special characters (except: ,.'-)`,
    },
    {
      label: 'Last name',
      key: 'last_name',
      validators: [
        Validators.pattern(/^[a-záíűőüöúóé ,.'-]{2,20}$/i),
        Validators.required,
      ],
      myErrorMessage: `The last name must be 2-30 characters long and can't contain special characters (except: ,.'-)`,
    },
    {
      label: 'Email',
      key: 'email',
      validators: [
        Validators.email,
        Validators.required,
      ],
      myErrorMessage: `Please provide a valid email address.`,
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
        Validators.pattern(/^[1-9][0-9]{3,4}$/i),
        Validators.required,
      ],
      myErrorMessage: `ZIP code should have 4 or 5 numbers.`,

    },
    {
      label: 'Country',
      key: 'country',
      validators: [
        Validators.pattern(/^[a-záíűőüöúóé ,.'-]{2,56}$/i),
        Validators.required,
      ],
      myErrorMessage: `You can't leave this field empty.`,

    },
    {
      label: 'City',
      key: 'city',
      validators: [
        Validators.pattern(/^[a-záíűőüöúóé ,.'-]{2,85}$/i),
        Validators.required,
      ],
      myErrorMessage: `You can't leave this field empty.`,
    },
    {
      label: 'Street',
      key: 'street',
      validators: [
        Validators.pattern(/^[a-záíűőüöúóé ,.'-]{2,50}$/i),
        Validators.required,
      ],
      myErrorMessage: `You can't leave this field empty`,
    },
    {
      label: 'Notes',
      key: 'notes',
      fieldType: 'textarea',
      validators: [
        Validators.required,
      ],
      myErrorMessage: `You can't leave this field empty.`,
    },
  ]

  orderEditorFormFields: FormField[] = [
    {
      label: 'Customer',
      key: 'customerID',
      fieldType: 'select',
      myErrorMessage: 'You must choose a customer from the list!',
      validators: [
        Validators.pattern(/^[1-9][0-9]*$/),
        Validators.required,
      ],
    },
    {
      label: 'Product',
      key: 'productID',
      fieldType: 'select',
      validators: [
        Validators.pattern(/^[1-9][0-9]*$/),
        Validators.required,
      ],
      myErrorMessage: 'You must choose a product from the list!',
    },

    {
      label: 'Amount',
      key: 'amount',
      type: 'number',
      validators: [
        Validators.pattern(/^[1-9][0-9]*$/),
        Validators.required,
      ],
      myErrorMessage: 'Amount has to be larger than 0!',

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
        Validators.pattern(/new|shipped|paid/),
        Validators.required,
      ],
      myErrorMessage: 'You must pick a status!',
    },

  ];

  billEditorFormFields: FormField[] = [
    {
      label: 'Order',
      key: 'orderID',
      fieldType: 'select',
      validators: [
        Validators.pattern(/^[1-9][0-9]*$/),
        Validators.required,
      ],
      myErrorMessage: 'You must choose an order from the list!',
    },
    {
      label: 'Amount',
      key: 'amount',
      type: 'number',
      validators: [
        Validators.pattern(/^[1-9][0-9]*$/),
        Validators.required,
      ],
      myErrorMessage: 'Amount has to be larger than 0!',
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
        Validators.pattern(/new|shipped|paid/),
        Validators.required,
      ],
      myErrorMessage: 'You must pick a status!',
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
