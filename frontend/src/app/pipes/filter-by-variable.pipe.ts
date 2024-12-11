import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByVariable',
})
export class FilterByVariablePipe implements PipeTransform {
  transform(values: any[], ...args: unknown[]): any[] {
    return values.filter((v) => v.tax.isVariable === false);
  }
}
