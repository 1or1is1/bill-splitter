import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../models/user-interface';

import { getSignInURL, getSignUpURL } from '../config/firebase.config';
import { LoginDetails } from '../models/login-details.interface';
import { Router } from '@angular/router';

const AUTH_USER = 'auth_user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {

    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    const user = localStorage.getItem(AUTH_USER);
    if (user) {
      // TODO : Add logic for validating TOKEN Details
      this.subject.next(JSON.parse(user));
    }

  }

  signup(loginDetails: LoginDetails) {
    const API = getSignUpURL();
    const payload = {
      email: loginDetails.email,
      password: loginDetails.password,
      returnSecureToken: true
    };
    return this.http.post<User>(API, payload);
  }

  login(loginDetails: LoginDetails): Observable<User> {
    const API = getSignInURL();
    const payload = {
      email: loginDetails.email,
      password: loginDetails.password,
      returnSecureToken: true
    };
    return this.http.post<User>(API, payload)
      .pipe(
        tap(user => {
          this.subject.next(user);
          localStorage.setItem(AUTH_USER, JSON.stringify(user));
        }),
        shareReplay()
      );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_USER);
    this.router.navigate(['/login']);
  }

}
