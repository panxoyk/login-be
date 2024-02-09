import { Injectable } from '@angular/core';
import { User } from '../user';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser() {
    try {
      const sessionToken = window.sessionStorage.getItem('session')
      if (!sessionToken) return
      return jwtDecode(sessionToken) as User
    } catch (error) {
      return
    }
  }

  login(user: User) {
    return this.http.post('http://localhost:3000/login', null, { headers: {
      "Login": JSON.stringify(user)
    } })
  }

}