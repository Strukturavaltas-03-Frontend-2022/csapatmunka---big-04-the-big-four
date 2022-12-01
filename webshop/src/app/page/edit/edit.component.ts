import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField, FormService } from 'src/app/service/form.service';

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
  fields: FormField[] = this.formService.billEditorFormFields;
  baseFormGroup: FormGroup = new FormGroup({});

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
    console.log((new Bill).constructor.name)
    this.createControls(new Bill);
  }

  // Creating FormControls for validation
  createControls(givenClass: Bill | Product | Customer | Order): void {
    this.fields.forEach(field => {
      const control = new FormControl(givenClass[field.key], field.validators);
      this.baseFormGroup.addControl(field.key, control);
    });
  }

  onSubmit() { }

}
