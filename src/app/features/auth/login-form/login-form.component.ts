import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginDetails } from 'src/app/models/login-details.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() 
  formData: EventEmitter<LoginDetails> = new EventEmitter();

  @Input()
  currentState: 'login' | 'signup';

  @Input()
  loading: boolean = false;

  loginForm: FormGroup;
  hide: boolean;

  constructor(private fb: FormBuilder) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.generateLoginForm();
  }

  get emailFormControl() {
    return this.loginForm.get('email');
  }

  get passwordFormControl() {
    return this.loginForm.get('password');
  }

  generateLoginForm(): void {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

  }

  onSubmit(): void {
    this.formData.emit(this.loginForm.value);
  }

}
