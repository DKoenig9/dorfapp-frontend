import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { WorkNeed } from './work-need.model';
import { WorkWould } from './work-would.model';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  workNeeds: BehaviorSubject<Array<WorkNeed>> = new BehaviorSubject([]);
  workWoulds: BehaviorSubject<Array<WorkWould>> = new BehaviorSubject([]);

  constructor(private dataStorageService: DataStorageService) {}

  updateWorkNeeds(data) {
    this.workNeeds.next(data);
  }

  addWorkNeed(dataObj) {
    const currentValue = this.workNeeds.value;
    const updatedValue = [...currentValue, dataObj];

    this.workNeeds.next(updatedValue);
  }

  deleteWorkNeed(dataObj) {
    console.log(dataObj.id);

    this.dataStorageService.deleteWorkNeedById(dataObj.id);
    const value: WorkNeed[] = this.workNeeds.value.slice();
    console.log(value);

    value.forEach((element, index) => {
      if (element === dataObj) value.splice(index, 1);
    });
    this.workNeeds.next(value);
  }

  updateWorkWoulds(data) {
    this.workWoulds.next(data);
  }

  addWorkWould(dataObj) {
    const currentValue = this.workWoulds.value;
    const updatedValue = [...currentValue, dataObj];

    this.workWoulds.next(updatedValue);
  }

  deleteWorkWould(dataObj) {
    console.log(dataObj);
    
    this.dataStorageService.deleteWorkWouldById(dataObj.id);
    const value: WorkWould[] = this.workWoulds.value.slice();

    value.forEach((element, index) => {
      if (element === dataObj) value.splice(index, 1);
    });
    this.workWoulds.next(value);
  }
}
