import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import {  } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { IUser } from '../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userID: number;
  user: IUser;

  deleting: boolean = false;

  postStatus: number;

  modalRef: BsModalRef;
  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService, private modalService: BsModalService) {}

  ngOnInit() {
    (this.userID = this.route.snapshot.params['id']), console.log(this.user);
    if (this.userID) {
      this.getData();
    }
  }

  getData() {
    this.usersService.getUser(this.userID).subscribe(
      res => {
        // console.log(res);
        this.user = res['data'];
        // console.log(this.user);
      },
      err => console.log(err)
    );
  }

  openModal(template: TemplateRef<any>) {
    console.log('open modal');
    this.modalRef = this.modalService.show(template);
  }

  deleteUser() {
    console.log('deleting user', this.user);
    this.deleting = true;
    this.usersService.deleteUser(this.user['id']).subscribe(
      res => {
        console.log(res);
        setTimeout(() => {
          this.router.navigate(['users']);
          this.modalRef.hide();
        }, 1000);
        return res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // deleteArticle(articleId: string) {
  // 	this.preProcessConfigurations();
  // 	this.articleService.deleteArticleById(articleId)
  // 		.subscribe(successCode => {
  // 			//this.statusCode = successCode;
  // 			//Expecting success code 204 from server
  // 			this.statusCode = 204;
  // 			this.getAllArticles();
  // 			this.backToCreateArticle();
  // 		},
  // 			errorCode => this.statusCode = errorCode);
  // }
}
