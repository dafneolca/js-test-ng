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
  username = new FormControl('');

  ngOnInit() {
    this.newUserForm = new FormGroup({
      'first-name': new FormControl(null, Validators.required),
      'last-name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.newUserForm);
    console.log('submitting');
    this.usersService.addUser(this.newUserForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  // ASYNC FOR BE CALL
  // duplicateEmail(control: FormControl): Promise<any> | Observable<any>{
  //   const promise = new Promise<any>((res, rej) => {
  //     setTimeout(()=> {
  //       if (control.value === 'test@test.com') {
  //         resolve({'emailIsForbitten'})
  //       }
  //       else {
  //         resolve(null)
  //       }
  //     })
  //   })
  //   return promise
  // }
}
