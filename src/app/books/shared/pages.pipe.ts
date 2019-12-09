import { Pipe, PipeTransform } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Pipe({
  name: 'pages'
})
export class PagesPipe implements PipeTransform {
  transform(value: any, arg: any = 'S.'): any {
    return `${arg}: ${value}`;
  }
}
