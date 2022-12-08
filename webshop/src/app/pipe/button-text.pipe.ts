import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buttonText'
})
export class ButtonTextPipe implements PipeTransform {

  transform(value: string | number, section: string): string {

    if (Number(value) == 0) {
      return `Create new ${section}`
    } else {
      return `Update ${section}`
    }

  }

}
