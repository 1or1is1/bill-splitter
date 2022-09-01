import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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
        this.openSnackBar("Login Failed, Please enter correct Email and Password", "OK");
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'bg-danger'
    });
  }

}
