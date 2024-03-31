import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate',
  standalone: true
})
export class LocalDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const dateTimestamp = new Date(value);  
    const newDate = dateTimestamp.toLocaleString('pt-BR')
    const allData = newDate.split(',');

    return allData[0];
  }

}
