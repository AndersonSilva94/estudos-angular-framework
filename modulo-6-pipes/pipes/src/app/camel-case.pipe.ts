import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let values = value.split(' ');
    let resultado = '';

    for(let v of values) {
      resultado += this.capitalize(v) + ' ';
    }

    return resultado;
  }

  capitalize(value: string) {
    return value.substring(0, 1).toUpperCase() +
      value.substring(1).toLowerCase();
  }

}
