import { Component, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastService } from '../shared/toasts/toast.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @Output() isLoginValid: boolean = null;

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(input: NgForm) {
    if (!input.valid) {
      return;
    }
    const { email, password, username, phoneNumber } = input.value;

    this.authService.loginUser(email, password).subscribe(
      (data) => {
        console.log(data);
        this.toastService.show('Erfolgreich eingeloggt', {
          classname: 'bg-success text-light',
          delay: 5000,
        });
      },
      (err) => {
        console.log(err);
        this.toastService.show('Fehler',{
          classname: 'bg-danger text-light',
          delay: 15000,
        });
      }
    );

    input.reset();
  }
}
