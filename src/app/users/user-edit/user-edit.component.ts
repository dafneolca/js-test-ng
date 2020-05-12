import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IUser } from '../models/user.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userID: number;
  user: IUser;

  newUserForm: FormGroup;
  postStatus: number;

  faEdit = faEdit;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService, private modalService: BsModalService) {}

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
    if (this.userID) {
      this.getData();
    }
    setTimeout(() => {
      this.newUserForm = new FormGroup({
        'first-name': new FormControl(this.user.first_name, Validators.required),
        'last-name': new FormControl(this.user.last_name, Validators.required),
        'email': new FormControl(this.user.email, [Validators.required, Validators.email])
      });
    }, 1000);
  }

  getData() {
    this.usersService.getUser(this.userID).subscribe(
      res => {
        console.log(res);
        this.user = res['data'];
      },
      err => {
        console.log(err);
        return err;
      }
    );
  }

  onSubmit() {
    console.log('save');
    this.usersService.updateUser(this.user).subscribe(
      res => {
        console.log(res);
        this.postStatus = res.status;
        console.log(this.postStatus);
        setTimeout(() => {
          this.router.navigate(['users']);
        }, 1000);
      },
      err => {
        console.log(err);
        return err;
      }
    );
  }
  onCancel() {
    this.router.navigate(['users']);
  }
}
