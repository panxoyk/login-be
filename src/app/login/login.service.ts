import { Injectable } from '@angular/core';
import { Credentials } from './types';
import { HttpClient } from '@angular/common/http';

type LoginResponse = {
  session: string;
}

type TokenResponse = {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token(email: string) {
    return this.http.post<TokenResponse>('http://localhost:3000/auth/token', { email })
  }

  login(credentials: Credentials, token: string) {
    return this.http.post<LoginResponse>('http://localhost:3000/auth/login', credentials, { headers: {
      'Token': token
    } })
  }

  constructor(private http: HttpClient) {}
}