import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";

import { User } from "./user.model";

// Auth Response Interface
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Props
  private API_KEY = 'AIzaSyC5LoWbHYHUbNXf0iuOo-H3RL6OZuYTba0';
  user = new Subject<User>();

  // DI
  constructor(private http: HttpClient) { }

  // Error Handler
  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error has occurred!'

    // Generic Error
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }

    // Check object returned from Firebase, switch on message
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This e-mail already exists, fam.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'User not found!';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Password is incorrect!';
        break;
    }

    // Return the message now
    return throwError(errorMsg);
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, userId, token, expDate);
    this.user.next(user);
  }

  signup(email: string, password: string) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
    return this.http.post<AuthResponseData>(URL, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`
    return this.http.post<AuthResponseData>(URL, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));;
  }

}