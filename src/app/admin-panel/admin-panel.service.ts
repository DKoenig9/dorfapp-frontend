import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ToastService } from '../shared/toasts/toast.service';

@Injectable({ providedIn: 'root' })
export class AdminPanelService {
  users: BehaviorSubject<Array<User>> = new BehaviorSubject([]);
  oldValue: User[];
  check = true;
  constructor(
    private dataStorageService: DataStorageService,
    private toastService: ToastService
  ) {}

  addUser(dataObj) {
    const currentValue = this.users.value;
    currentValue.forEach((element) => {
      if (element === dataObj) {
        console.error('Existiert bereits');
        this.toastService.show('Nutzer liegt bereits in der Liste', {
          classname: 'bg-danger text-light',
          delay: 5000,
        });
        this.check = false;
      }
    });
    if (this.check) {
      const updatedValue = [...currentValue, dataObj];
      this.oldValue = this.users.value.slice();
      this.users.next(updatedValue);
    }
  }

  updateUsers(data) {
    this.users.next(data);
  }

  deleteOld(dataObj) {
    console.log(dataObj);

    this.oldValue.forEach((element, index) => {
      if (element.id === dataObj.id) this.oldValue.splice(index, 1);
    });
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
        this.addUser(data.usersBySomething);
        if (this.check) {
          this.toastService.show('Suche erfolgreich', {
            classname: 'bg-success text-light',
            delay: 3000,
          });
          this.oldValue = this.users.value.slice();
        }
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
          this.deleteOld(data.editUser);
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
