import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  constructor() {}

  newUserForm: FormGroup;
  username = new FormControl('');

  ngOnInit() {
    this.newUserForm = new FormGroup({
      'first-name': new FormControl(null),
      'last-name': new FormControl(null),
      'email': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.newUserForm.value);
  }
}
