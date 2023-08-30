import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number): unknown {
      const priceString = value.toString()
      let result = ""
      for (let i = 0; i < priceString.length; i ++) {
        if ((i - 1) % 3 == 0 && (priceString.length > 3 || i > 1))
          result += "."
        result += priceString.charAt(i)
      }
      return result
  }

}
