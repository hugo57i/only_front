import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonepipe'
})
export class PhonepipePipe implements PipeTransform {

  transform(value: string, country: { name: string, dial_code: string, code: string}): string {
    if (value) {
      if (country.code === 'FR') {
        return value.charAt(0) + " " +  value.substr(1, value.length).replace(/(.{2})/g,"$1 ");
      } else {
        let newStr = '';
        let i = 0;
        for (; i < Math.floor(value.length / 3) - 1; i++) {
          newStr = newStr + value.substr(i * 3, 3) + '-';
        }
        return newStr + value.substr(i * 3);
      }
    }

  }

}
