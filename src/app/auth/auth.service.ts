import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(session: string): void {
    window.sessionStorage.setItem('session', session)
  }

  logout(): void {
    window.sessionStorage.removeItem('session')
  }

  isLogged() {
    return !!window.sessionStorage.getItem('session')
  }

  getToken() {
    return window.sessionStorage.getItem('session')
  }

  constructor() { }
}