import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../model/customer';
import { Product } from '../model/product';

@Pipe({
  name: 'idToString'
})
export class IdToStringPipe<T extends { [x: string]: any }> implements PipeTransform {

  transform(value: T[], idNumber: number, dataType: string): string {

    if (!Array.isArray(value) || !idNumber || !dataType) {
      return '/// Missing or wrong variable(s).'

    } else {
      if (dataType == 'customer') {
        const customer = value.find(item => Number(item['id']) == Number(idNumber))

        if (customer) {
          return `${customer['last_name']}, ${customer['first_name']}`

        } else return '/// No customer found'

      } else if (dataType == 'product') {
        const product = value.find(item => Number(item['id']) == Number(idNumber))

        if (product) {
          const productPrice = new Intl.NumberFormat('de-DE', {
            style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
          }).format(product['price'])
          return `/// ${product['name']}, ${product['type']} || ${productPrice} ///`

        } else return `/// No product found.`
      } else return `/// An error has occured.`
    }
  }
}