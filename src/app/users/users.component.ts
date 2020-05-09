import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

import { IUser } from './models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userData: IUser[] = [];
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar', 'edit', 'seeProfile', 'delete'];
  p: number = 1;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getData();
    // this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.usersService.getUsers().subscribe(
      res => {
        this.userData = Object.values(res['data']);
        console.log(res);
      },
      err => console.log(err)
    );
  }

  seeDetails(user) {
    console.log('see details');
    console.log(user);
    this.router.navigate([`${user.id}`], { relativeTo: this.route });
  }

  onEdit() {
    console.log('edit');
  }

  onDelete(id) {
    console.log('id:', id);
    console.log('delete');
    this.usersService.deleteUser(id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
}
