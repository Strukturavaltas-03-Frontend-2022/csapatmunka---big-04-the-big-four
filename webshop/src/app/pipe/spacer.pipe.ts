import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacer'
})
export class SpacerPipe implements PipeTransform {

  transform(value: string | number): string {

    const idLength = 4
    const nameLength = 21
    let spaceRepeats = 0
    let oneSpace = '\u00A0'

    if (String(value).length <= idLength) {
      spaceRepeats = idLength - String(value).length

    } else if (String(value).length <= nameLength) {
      spaceRepeats = nameLength - String(value).length
    }

    return `${value}${oneSpace.repeat(spaceRepeats)}`

  }

}
