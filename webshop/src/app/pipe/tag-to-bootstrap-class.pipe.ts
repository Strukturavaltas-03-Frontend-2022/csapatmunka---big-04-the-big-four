import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagToBootstrapClass'
})

export class TagToBootstrapClassPipe<T> implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'checkbox': return 'form-check'
        break;
      default: return 'form-control'
    }
  }

}
