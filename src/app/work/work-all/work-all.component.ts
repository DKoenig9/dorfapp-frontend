import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { WorkService } from '../work.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { WorkWould } from '../work-would.model';
import { WorkNeed } from '../work-need.model';
import { modalWork } from 'src/app/shared/modals/modal-work.component';
import { modalDelete } from 'src/app/shared/modals/modal-delete.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-all',
  templateUrl: './work-all.component.html',
  styleUrls: ['./work-all.component.css'],
})
export class WorkAllComponent implements OnInit {
  isOwn: boolean = false;
  workWoulds: WorkWould[] = [];
  workNeeds: WorkNeed[] = [];
  phoneNumber: string;
  username: string;
  updateForm: FormGroup;
  itemName: string;
  id: string;
  private userSub: Subscription;
  private workNeedSub: Subscription;
  private workWouldSub: Subscription;
  constructor(
    private modalService: NgbModal,
    private dataStorageService: DataStorageService,
    private workService: WorkService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //loginDaten
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.username = user.username;
      }
    });

    //WorkNeeds von Datenbank
    this.dataStorageService
      .fetchWorkNeeds()
      .valueChanges.subscribe((result: any) => {
        this.workService.updateWorkNeeds(result.data.workNeeds);
      });

    //WorkWoulds von Datenbank
    this.dataStorageService
      .fetchWorkWoulds()
      .valueChanges.subscribe((result: any) => {
        this.workService.updateWorkWoulds(result.data.workWoulds);
      });

    this.workNeedSub = this.workService.workNeeds.subscribe((workNeeds) => {
      this.workNeeds = workNeeds;
    });

    this.workWouldSub = this.workService.workWoulds.subscribe((workWoulds) => {
      this.workWoulds = workWoulds;
    });
  }

  open(item) {
    console.log(item);

    const modalRef = this.modalService.open(modalWork);
    modalRef.componentInstance.username = item.username;
    modalRef.componentInstance.phoneNumber = item.phoneNumber;

    if (item.__typename === 'WorkNeed') {
      modalRef.componentInstance.title = 'Ich brauche Hilfe';
      modalRef.componentInstance.message =
        'Ruf doch einfach an, vielleicht kannst du ja helfen.';
    } else {
      modalRef.componentInstance.title = 'Ich möchte helfen';
      modalRef.componentInstance.message = 'Fragen kostet nichts :)';
    }
  }

  onDelete(item) {
    const modalRef = this.modalService.open(modalDelete);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.text = `dein Job ${item.job}`;
  }

  openUpdate(content, item) {
    console.log(content);
    this.itemName = item.job;
    this.id = item.id;

    this.updateForm = new FormGroup({
      job: new FormControl(item.job, Validators.required),
      description: new FormControl(item.description, Validators.required),
    });

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  onUpdate(){
    console.log("moin");
    const { job, description } =
      this.updateForm.value;
      this.workService.updateWorkNeed(this.id, job, description);
  }
}
