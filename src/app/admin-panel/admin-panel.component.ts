import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';
import { modalDelete } from '../shared/modals/modal-delete.component';
import { ToastService } from '../shared/toasts/toast.service';
import { AdminPanelService } from './admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers: [DecimalPipe],
})
export class AdminPanelComponent implements OnInit {
  users: User[];
  usersArraySub: Subscription;
  signupForm: FormGroup;
  searchForm: FormGroup;
  updateForm: FormGroup;
  username: string;
  id: string;
  firstSearch = false;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private adminPanelService: AdminPanelService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.usersArraySub = this.adminPanelService.users.subscribe((users) => {
      if (users) {
        this.users = users;
      }
    });

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
    });

    this.searchForm = new FormGroup({
      text: new FormControl(null, Validators.required),
    });
  }

  onSignup() {
    console.log(this.signupForm);
    const { email, username, phoneNumber } = this.signupForm.value;

    // Random Passwort erstellen -> funktioniert, wird aus Testgründen aber noch nicht verwendet
    // const password = Math.random().toString(36).slice(-8);
    // console.log(password);
    const password = 123456;

    this.authService
      .signupUser(email, password, username, phoneNumber)
      .subscribe(
        ({ data }: any) => {
          console.log(data);
          this.firstSearch = true;
          this.adminPanelService.addUser(data.createUser);
          this.toastService.show('Erfolgreich erstellt', {
            classname: 'bg-success text-light',
            delay: 3000,
          });
        },
        (err) => {
          console.log(err);
          this.toastService.show(err, {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
        }
      );
  }

  onSearch() {
    this.firstSearch = true;
    this.adminPanelService.searchUser(this.searchForm.value.text);
  }

  openUpdate(content, user) {
    this.username = user.username;
    this.id = user.id;
    console.log(user.userRole);

    this.updateForm = new FormGroup({
      email: new FormControl(user.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null),
      username: new FormControl(user.username, Validators.required),
      phoneNumber: new FormControl(user.phoneNumber, Validators.required),
      userRole: new FormControl(user.userRole),
    });

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  onUpdate() {
    console.log(this.updateForm.value);
    const { email, username, password, phoneNumber, userRole } =
      this.updateForm.value;
      console.log(password);
      

    this.adminPanelService.updateUser(
      this.id,
      email,
      password,
      username,
      phoneNumber,
      userRole
    );
  }

  onDelete(user) {
    const modalRef = this.modalService.open(modalDelete);
    modalRef.componentInstance.item = user;
    modalRef.componentInstance.text = `der Nutzer ${user.username}`;
  }
}
