import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { WorkAllComponent } from './work-all/work-all.component';
import { WorkService } from './work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
})
export class WorkComponent implements OnInit {
  username: string;
  phoneNumber: string;
  type: string;
  heading: string;
  private userSub: Subscription;
  @ViewChild('f', { static: false }) form: NgForm;
  constructor(
    private modalService: NgbModal,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private workService: WorkService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.phoneNumber = user.phoneNumber;
      }
    });
  }

  openWorkNeed(content) {
    this.heading = 'Ich brauche Hilfe';
    this.type = 'need';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openWorkWould(content) {
    this.heading = 'Ich möchte helfen';
    this.type = 'would';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(form) {
    const { job, description } = form.value;
    const username = this.username;
    const phoneNumber = this.phoneNumber;

    if (this.type === 'would') {
      this.dataStorageService
        .storeWorkWould(username, job, description, phoneNumber)
        .subscribe(
          ({ data }: any) => {
            this.workService.addWorkWould({
              __typename: 'WorkWould',
              id: data.createWorkWould.id,
              username,
              job,
              description,
              phoneNumber,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.type === 'need') {
      this.dataStorageService
        .storeWorkNeed(username, job, description, phoneNumber)
        .subscribe(
          ({ data }: any) => {
            this.workService.addWorkNeed({
              __typename: 'WorkNeed',
              id: data.createWorkNeed.id,
              username,
              job,
              description,
              phoneNumber,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.error('Fehler');
      this.form.reset();
    }
  }
}
