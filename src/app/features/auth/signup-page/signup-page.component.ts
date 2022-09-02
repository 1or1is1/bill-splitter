import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/models/login-details.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  
  loading: boolean = false;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  signup(loginData: LoginDetails): void {
    this.loading = true;
    this.auth.signup(loginData).subscribe(
      () => {
        this.loading = false;
        this.openSnackBar("Signup Success, You can login now", "OK", "bg-success");
        this.router.navigateByUrl("/login");
      },
      error => {
        this.loading = false;
        this.openSnackBar("Signup Failed, Please enter correct details", "OK", "bg-danger");
      }
    )

  }

  openSnackBar(message: string, action: string, classToApply: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: classToApply
    });
  }

}
