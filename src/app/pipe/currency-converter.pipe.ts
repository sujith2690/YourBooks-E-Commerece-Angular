import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {
  transform(amount: any) {
    const conversionRate = 82;
    const inrAmount = amount * conversionRate;
    let formattedAmount: string = Number(inrAmount).toFixed(2);
    return formattedAmount;
  }
}
