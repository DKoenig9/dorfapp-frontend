import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { ToastService } from '../shared/toasts/toast.service';
import { WorkNeed } from './work-need.model';
import { WorkWould } from './work-would.model';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  workNeeds: BehaviorSubject<Array<WorkNeed>> = new BehaviorSubject([]);
  workWoulds: BehaviorSubject<Array<WorkWould>> = new BehaviorSubject([]);
  oldValue: WorkNeed[];

  constructor(
    private dataStorageService: DataStorageService,
    private toastService: ToastService
  ) {}

  updateWorkNeeds(data) {
    this.workNeeds.next(data);
  }

  addWorkNeed(dataObj: WorkNeed) {
    const currentValue = this.workNeeds.value;
    const updatedValue = [...currentValue, dataObj];

    this.workNeeds.next(updatedValue);
  }

  deleteWorkNeed(dataObj) {
    console.log(dataObj.id);

    this.dataStorageService.deleteWorkNeedById(dataObj.id);
    const value: WorkNeed[] = this.workNeeds.value.slice();

    value.forEach((element, index) => {
      if (element === dataObj) value.splice(index, 1);
    });
    this.workNeeds.next(value);
  }

  updateWorkWoulds(data) {
    this.workWoulds.next(data);
  }

  addWorkWould(dataObj: WorkWould) {
    const currentValue = this.workWoulds.value;
    const updatedValue = [...currentValue, dataObj];

    this.workWoulds.next(updatedValue);
  }

  deleteWorkWould(dataObj) {
    this.dataStorageService.deleteWorkWouldById(dataObj.id);
    const value: WorkWould[] = this.workWoulds.value.slice();

    value.forEach((element, index) => {
      if (element === dataObj) value.splice(index, 1);
    });
    this.workWoulds.next(value);
  }

  updateWorkNeed(id, job, description) {
    this.dataStorageService.updateWorkNeed(id, job, description).subscribe(
      ({ data }: any) => {
        this.deleteOld(data.editWorkNeed);
        this.toastService.show('Erfolgreich geändert', {
          classname: 'bg-success text-light',
          delay: 3000,
        });
      },
      (err) => {
        console.error(err);
        this.toastService.show(err, {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
  }

  updateWorkWould(id, job, description) {
    this.dataStorageService.updateWorkWould(id, job, description).subscribe(
      ({ data }: any) => {
        this.deleteOld(data.editWorkWould);
        this.toastService.show('Erfolgreich geändert', {
          classname: 'bg-success text-light',
          delay: 3000,
        });
      },
      (err) => {
        console.error(err);
        this.toastService.show(err, {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      }
    );
  }

  deleteOld(dataObj) {
    if (this.oldValue) {
      this.oldValue.forEach((element, index) => {
        if (element.id === dataObj.id) this.oldValue.splice(index, 1);
      });
      this.workNeeds.next(this.oldValue);
    }
  }
}
