import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../models/user-interface';

import { getSignInURL, getSignUpURL } from '../config/firebase.config';
import { LoginDetails } from '../models/login-details.interface';
import { Router } from '@angular/router';
import { GroupDetail } from '../models/group-interface';

export const AUTH_USER = 'auth_user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(null);
  private userId: string = null;
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {

    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    const user = localStorage.getItem(AUTH_USER);
    if (user) {
      const userObj = JSON.parse(user);
      this.subject.next(userObj);
      this.userId = userObj?.localId;
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
          this.userId = user?.localId;
        }),
        shareReplay()
      );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_USER);
    this.router.navigate(['/login']);
  }

  setGroupData(group: GroupDetail) {
    let groups: GroupDetail[] = [];
    if (localStorage.getItem(this.userId) === null) {
      localStorage.setItem(this.userId, JSON.stringify(groups));
    }

    groups = JSON.parse(localStorage.getItem(this.userId));
    groups.push(group);
    localStorage.setItem(this.userId, JSON.stringify(groups));

  }

  setParticularGroupData(index: number, group: GroupDetail) {
    let groups: GroupDetail[] = [];
    if (localStorage.getItem(this.userId) === null) {
      localStorage.setItem(this.userId, JSON.stringify(groups));
    }
    groups = JSON.parse(localStorage.getItem(this.userId));
    groups[index] = group;
    localStorage.setItem(this.userId, JSON.stringify(groups));
  }

  getGroupData(): GroupDetail[] {
    let groups: GroupDetail[] = [];
    if (localStorage.getItem(this.userId) === null) {
      localStorage.setItem(this.userId, JSON.stringify(groups));
    }

    groups = JSON.parse(localStorage.getItem(this.userId));

    return groups;

  }

}
