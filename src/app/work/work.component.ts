import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  submitForm: FormGroup;
  userId: string;
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
        this.userId = user.id;
        this.username = user.username;
        this.phoneNumber = user.phoneNumber;
      }
    });

    this.submitForm = new FormGroup({
      jobCategory: new FormControl('default'),
      job: new FormControl(null),
      description: new FormControl(null, Validators.required),
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

  onSubmit() {
    let { jobCategory, job, description } = this.submitForm.value;
    if (jobCategory === 'default') {
      console.log('default');
    } else {
      console.log('was anderes');
      job = jobCategory;
    }

    if (this.type === 'would') {
      this.dataStorageService
        .storeWorkWould(
          this.username,
          this.userId,
          job,
          description,
          this.phoneNumber
        )
        .subscribe(
          ({ data }: any) => {
            this.workService.addWorkWould({
              __typename: 'WorkWould',
              id: data.createWorkWould.id,
              username: this.username,
              userId: this.userId,
              job,
              description,
              phoneNumber: this.phoneNumber,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.type === 'need') {
      this.dataStorageService
        .storeWorkNeed(
          this.username,
          this.userId,
          job,
          description,
          this.phoneNumber
        )
        .subscribe(
          ({ data }: any) => {
            this.workService.addWorkNeed({
              __typename: 'WorkNeed',
              id: data.createWorkNeed.id,
              userId: this.userId,
              username: this.username,
              job,
              description,
              phoneNumber: this.phoneNumber,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.error('Fehler');
      this.submitForm.reset();
    }
    this.submitForm.reset();
  }
}
