import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { IUser } from './models/user.model';
import { tableHeaders } from './table-headers';
import { faUsers, faSearch, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userData: IUser[] = [];
  filteredUserData: IUser[] = [];
  userSearch: string;

  uItemsPerPage: number;
  uTotalItems: number;
  totalPages: number;
  page: number = 1;

  statusCode: number;

  tableHeaders = tableHeaders;

  // fa icons
  faUsers = faUsers;
  faSearch = faSearch;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;

  pager = {};
  pageOfItems = [];

  _url: string = 'https://reqres.in/api/users';

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.userData = this.userData.slice();
  }

  ngOnInit() {
    this.usersService.getPageSettings().subscribe(
      result => {
        this.uTotalItems = result['total'];
        this.uItemsPerPage = result['per_page'];
        this.totalPages = result['total_pages'];
      },
      err => console.log(err)
    );
    this.getData(this._url, this.userData);
  }

  getData(url, users, page?) {
    url = `${url}?page=${page}`;
    this.http.get(url).subscribe(data => {
      users = users.concat(data['data']);
      if (data['page'] < data['total_pages']) {
        this.getData(this._url, users, data['page'] + 1);
      }
      this.userData = users;
      console.log(this.userData);
    });
  }

  pageChanged(e) {
    this.page = e;
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
