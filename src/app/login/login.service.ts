import { Injectable } from '@angular/core';
import { Credentials } from './types';
import { HttpClient } from '@angular/common/http';

type LoginResponse = {
  session: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(credentials: Credentials) {
    return this.http.post<LoginResponse>('http://localhost:3000/auth/login', null, { headers: {
      "Login": JSON.stringify(credentials)
    } })
  }

  constructor(private http: HttpClient) {}
}