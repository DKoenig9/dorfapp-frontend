import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '../shared/toasts/toast.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup;
  error: string = null;

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password).subscribe(
      (data) => {
        console.log(data);
        this.toastService.show('Erfolgreich eingeloggt', {
          classname: 'bg-success text-light',
          delay: 5000,
        });
      },
      (err) => {
        console.error(err);
        this.toastService.show('Fehler', {
          classname: 'bg-danger text-light',
          delay: 15000,
        });
      }
    );

    this.loginForm.reset();
  }
}
