import { Injectable } from '@angular/core';
import { User } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(user: User) {
    return this.http.post<LoginResponse>('http://localhost:3000/login', null, { headers: {
      "Login": JSON.stringify(user)
    } })
  }

  constructor(private http: HttpClient) {}

}

type LoginResponse = {
    session: string;
}