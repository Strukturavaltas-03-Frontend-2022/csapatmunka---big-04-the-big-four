import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasCorrectKey'
})
export class HasCorrectKeyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
