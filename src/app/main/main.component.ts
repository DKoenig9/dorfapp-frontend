import { Component, PipeTransform, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastService } from '../shared/toasts/toast.service';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private toastService: ToastService) {}

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
    console.log(this.signupForm);

    console.log(
      `Jetzt soll eine Email an hofolperdorfapp@gmail.com versendet werden mit den dazugehörigen Daten: ${newUser.email}, ${newUser.username}, ${newUser.phoneNumber}, ${newUser.happy}`
    );
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }
}
