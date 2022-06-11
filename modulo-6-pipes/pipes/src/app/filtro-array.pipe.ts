import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray',
  pure: false
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown[] {

    if (value.length === 0 || args === undefined) {
      return value
    }

    let filter = args.toLocaleString().toLocaleLowerCase();
    return value.filter(
      (v: string) => v.toLocaleLowerCase().indexOf(filter) != -1
    )
  }

}