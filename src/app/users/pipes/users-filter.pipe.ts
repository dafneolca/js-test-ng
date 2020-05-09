import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'userFilter' })
export class userFilterPipe implements PipeTransform {
  transform(user, userSearch) {
    console.log(user);
    console.log(userSearch);
    if (!user || !userSearch) {
      return user;
    }
    return user.filter(user => user.first_name.toLowerCase().indexOf(userSearch.toLowerCase()) !== -1);
  }
}
