import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/models/login-details.interface';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loading: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { 
    this.loading = false;
  }

  ngOnInit(): void {
  }

  login(loginData: LoginDetails) {
    this.loading = true;
    this.auth.login(loginData).subscribe(
      (data) => {
        this.loading = false;
        this.router.navigateByUrl("/dashboard");
      },
      err => {
        this.loading = false;
        alert('Login FAILED!');
      }
    );
  }

}
