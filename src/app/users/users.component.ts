import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { IUser, ITableHeaders } from './models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userData: IUser[] = [];
  tableHeaders: ITableHeaders[] = [
    {
      name: '#',
      id: 'id'
    },
    {
      name: 'First Name',
      id: 'first_name'
    },
    {
      name: 'Last Name',
      id: 'last_name'
    },
    {
      name: 'Email',
      id: 'email'
    },
    {
      name: 'Picture',
      id: 'picture'
    }
  ];

  page: number = 1;
  userSearch: string;
  statusCode: number;

  dataPages: number;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) {
    this.userData = this.userData.slice();
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      result => {
        this.dataPages = result['total_pages'];
        console.log(this.dataPages);
      },
      err => (this.statusCode = err)
    );
    this.getData();
  }

  getData() {
    this.usersService.getUsers().subscribe(
      result => {
        this.userData = Object.values(result['data']);
      },
      err => (this.statusCode = err)
    );
  }

  clearFilter() {
    this.userSearch = '';
  }

  onCreateNewUser() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  sortData(sort: Sort) {
    const data = this.userData.slice();
    if (!sort.active || sort.direction === '') {
      this.userData = data;
      return;
    }
    this.userData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'first_name':
          return compare(a.first_name, b.first_name, isAsc);
        case 'last_name':
          return compare(a.last_name, b.last_name, isAsc);
        default:
          return 0;
      }
      function compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }
    });
  }

  seeDetails(user) {
    this.router.navigate([`${user.id}`], { relativeTo: this.route });
  }

  onEdit(user) {
    this.router.navigate([`${user.id}/edit`], { relativeTo: this.route });
  }
}
