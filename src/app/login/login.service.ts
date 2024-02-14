import { Injectable } from '@angular/core';
import { Credentials, LoginResponse, TokenResponse } from './types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token(email: string) {
    return this.http.post<TokenResponse>('http://localhost:3000/auth/token', { email })
  }

  login(credentials: Credentials, token: string) {
    return this.http
      .post<LoginResponse>('http://localhost:3000/auth/login', credentials, {
        headers: { 'Token': token }
      })
      .pipe(catchError(
        (error: HttpErrorResponse) => {
          const message = error.error.message
          console.log('Error:', message)
          throw new Error(message)
        }
      ))
  }

  constructor(private http: HttpClient) {}
}