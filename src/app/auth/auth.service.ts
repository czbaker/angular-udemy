import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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

  private API_KEY = 'AIzaSyC5LoWbHYHUbNXf0iuOo-H3RL6OZuYTba0';

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

  signup(email: string, password: string) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
    return this.http.post<AuthResponseData>(URL, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`
    return this.http.post<AuthResponseData>(URL, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError));;
  }

}