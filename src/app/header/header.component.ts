import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isMenuCollapsed = true;
  private userSub: Subscription;
  isAuth = false;
  username: string;
  userRole: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //Userdaten laden
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuth = true;
        this.username = user.username;
        this.userRole = user.userRole;
      }else {
        this.isAuth = false;
      }
    });
  }

  onLogout(){    
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
