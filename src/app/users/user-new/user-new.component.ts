import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  newUserForm: FormGroup;
  postStatus: number;

  ngOnInit() {
    this.newUserForm = new FormGroup({
      'first-name': new FormControl(null, Validators.required),
      'last-name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.usersService.addUser(this.newUserForm.value).subscribe(
      res => {
        console.log(res);
        this.postStatus = res.status;
      },
      err => {
        console.log(err);
        return err;
      }
    );
  }
}
