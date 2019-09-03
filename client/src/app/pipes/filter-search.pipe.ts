
// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filterSearch'
// })

// export class FilterSearchPipe implements PipeTransform {
//   transform(locked: any, query: string): any {
//     console.log(locked); //this shows in the console
//     console.log(query); //this does not show anything in the console when typing
//     if(!query) {
//       return locked;
//     }
//     return locked.filter((lock) => {
//       return lock.User.toLowerCase().match(query.toLowerCase());
//     });
//   }
// }

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'filterSearch',
//   pure: false
// })
// export class FilterSearchPipe implements PipeTransform {

//   transform(itemsList: any[], term: string): any {
//     //debugger;
//     return itemsList.filter(item => item.toUpperCase().indexOf(term.toUpperCase()) != -1);
//   }

// }

import { Pipe, PipeTransform } from '@angular/core';
import { ItemService } from '../services/item/item.service';

@Pipe({
    name: 'filterSearch'
})

export class FilterSearchPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        
        if (!args) return value;
      
        if (!value) return null;
       

        args = args.toLowerCase();

        return value.filter(function (item) {
            //debugger;
            return JSON.stringify(item.name).toLowerCase().includes(args);
        });
    }
}
