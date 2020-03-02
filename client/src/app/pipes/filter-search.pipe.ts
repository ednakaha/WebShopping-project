import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSearch'
})

export class FilterSearchPipe implements PipeTransform {
    transform(value: any, args?: any): any {

        if (!args) return value;

        if (!value) return null;


        args = args.toLowerCase();

        return value.filter(function (item) {
            return JSON.stringify(item.name).toLowerCase().includes(args);
        });
    }
}
