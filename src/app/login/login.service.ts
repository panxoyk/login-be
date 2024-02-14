import { Injectable } from '@angular/core';
import { Credentials, LoginResponse, TokenResponse } from './types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = 'http://localhost:3000'

  token(email: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.url}/auth/token`, { email })
  }

  login(credentials: Credentials, token: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.url}/auth/login`, credentials, {
        headers: { 'Token': token }
      })
      .pipe(catchError(
        (error: HttpErrorResponse) => {
          const message = error.error.message
          throw new Error(message)
        }
      ))
  }

  constructor(private http: HttpClient) {}
}