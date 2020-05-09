import { PipeTransform, Pipe } from '@angular/core';
import { IUser } from '../models/user.model';

@Pipe({ name: 'userFilter' })
export class userFilterPipe implements PipeTransform {
  transform(items: IUser, filter: any, defaultFilter: boolean): any {
    if (!filter || !Array.isArray(items)) {
      return items;
    }
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item => filterKeys.reduce((x, keyName) => (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == '', true));
      } else {
        return items.filter(item => {
          return filterKeys.some(keyName => {
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == '';
          });
        });
      }
    }
  }
}
