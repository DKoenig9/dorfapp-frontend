import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ToastService } from '../shared/toasts/toast.service';

@Injectable({ providedIn: 'root' })
export class AdminPanelService {
  users: BehaviorSubject<Array<User>> = new BehaviorSubject([]);
  oldValue: User[];
  constructor(
    private dataStorageService: DataStorageService,
    private toastService: ToastService
  ) {}

  addUser(dataObj) {
    const currentValue = this.users.value;
    console.log(currentValue);
    console.log(dataObj);

    const newArray = this.arrayUnique(currentValue.concat(dataObj));
    this.oldValue = this.users.value.slice();
    this.users.next(newArray);
  }

  arrayUnique(array) {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].id === a[j].id) a.splice(j--, 1);
      }
    }

    return a;
  }

  updateUsers(data) {
    this.users.next(data);
  }

  updateOld(dataObj) {
    console.log(dataObj);
    console.log(this.oldValue);

    this.oldValue.forEach((element, index) => {
      if (element.id === dataObj.id) {
        this.oldValue[index] = dataObj;
      }
    });
    console.log(this.oldValue);
    this.users.next(this.oldValue);
  }

  deleteUser(dataObj) {
    console.log(dataObj.id);

    this.dataStorageService.deleteUserById(dataObj.id).subscribe(
      (res) => {
        console.log('Erfolgreich gelöscht');
        const value: User[] = this.users.value.slice();

        value.forEach((element, index) => {
          if (element === dataObj) value.splice(index, 1);
        });
        this.users.next(value);
        this.toastService.show('Erfolgreich gelöscht', {
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

  searchUser(text) {
    this.dataStorageService.getUserBySomething(text).valueChanges.subscribe(
      ({ data }: any) => {
        console.log(data.usersBySomething);

        this.addUser(data.usersBySomething);

        this.toastService.show('Suche erfolgreich', {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        this.oldValue = this.users.value.slice();
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

  updateUser(id, email, password, username, phoneNumber, userRole) {
    this.dataStorageService
      .updateUser(id, email, password, username, phoneNumber, userRole)
      .subscribe(
        ({ data }: any) => {
          console.log(data.editUser);
          this.updateOld(data.editUser);
          this.toastService.show('Erfolgreich geändert', {
            classname: 'bg-success text-light',
            delay: 3000,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
