import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private userSub: Subscription;
  user: User;
  profileForm: FormGroup;
  defaultPic = true;
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      console.log(user);
      this.user = user;
    });

    this.profileForm = new FormGroup({
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email),
      password: new FormControl(null),
      phoneNumber: new FormControl(this.user.phoneNumber),
    });
  }

  onUpdate() {
    console.log('update');
    console.log(this.profileForm.value);
    let { username, email, password, phoneNumber } = this.profileForm.value;
    console.log("Passwort: ",password);
  
  
    this.authService.updateUser(
      this.user.id,
      email,
      password,
      username,
      phoneNumber,
      this.user.userRole
    );
  }

  changePic(){
    console.log("lesgo");
    
  }
}
