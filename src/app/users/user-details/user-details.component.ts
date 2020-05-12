import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IUser } from '../models/user.model';
import { faTrashAlt, faEnvelope, faPhone, faUserAlt } from '@fortawesome/free-solid-svg-icons';

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

  faTrashAlt = faTrashAlt;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faUserAlt = faUserAlt;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService, private modalService: BsModalService) {}

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
    if (this.userID) {
      this.getData();
    }
  }

  getData() {
    this.usersService.getUser(this.userID).subscribe(
      res => {
        this.user = res['data'];
      },
      err => {
        console.log(err);
        return err;
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteUser() {
    this.deleting = true;
    console.log('[deleting] ', this.user);
    this.usersService.deleteUser(this.user['id']).subscribe(
      res => {
        console.log(res);
        this.postStatus = res.status;
        setTimeout(() => {
          this.router.navigate(['users']);
          this.modalRef.hide();
        }, 1000);
      },
      err => {
        console.log(err);
        return err;
      }
    );
  }
}
