import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../shared/toasts/toast.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private toastService: ToastService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      happy: new FormControl('true'),
    });
  }

  onSubmit() {
    const newUser = this.signupForm.value;
    console.log(
      `Jetzt soll eine Email an hofolperdorfapp@gmail.com versendet werden mit den dazugehörigen Daten: ${newUser.email}, ${newUser.username}, ${newUser.phoneNumber}, ${newUser.happy}`
    );
  }

  
}
