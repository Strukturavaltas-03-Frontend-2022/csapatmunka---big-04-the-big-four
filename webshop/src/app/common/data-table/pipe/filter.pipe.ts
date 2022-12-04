import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe<T extends { [x: string]: any }>
  implements PipeTransform
{
  transform(list: T[], phrase: string = '', key: string = ''): T[] {
    if (!Array.isArray(list) || !phrase) {
      return list;
    }

    phrase = phrase.toLowerCase();

    if (key !== '') {
      return list.filter((item) => {
        const keys = key.split('.');
        let element = item;
        for (let i = 0; i < keys.length; i += 1) {
          element = element[keys[i]];
        }

        if (typeof element === 'number') {
          return Number(phrase) === element;
        }
        return ('' + element).toLowerCase().includes(phrase);
      });
    }

    return list.filter((item) =>
      Object.values(item).join(' ').toLowerCase().includes(phrase)
    );
  }
}
