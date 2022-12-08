import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultSelected'
})
export class DefaultSelectedPipe implements PipeTransform {

  transform(currentOption: string | Number, currentProperty: string | Number): boolean {

    return currentOption.toString() == currentProperty.toString() ? true : false;
  }

}
