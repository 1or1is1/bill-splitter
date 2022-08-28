import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup(loginData: LoginDetails): void {
    this.loading = true;
    this.auth.signup(loginData).subscribe(
      () => {
        this.loading = false;
        this.router.navigateByUrl("/login");
      },
      error => {
        this.loading = false;
        alert('Some error occured while SignUp!');
      }
    )

  }

}
