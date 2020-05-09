import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userID: string;
  user: IUser;
  constructor(private route: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit() {
    (this.userID = this.route.snapshot.params['id']), console.log(this.user);
    if (this.userID) {
      this.getData();
    }
  }

  getData() {
    this.usersService.getUser(this.userID).subscribe(
      res => {
        console.log(res);
        this.user = res['data'];
        console.log(this.user);
        // this.userData = Object.values(res['data']);
        // console.log(res);
      },
      err => console.log(err)
    );
  }
}
