import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile() {
    const session = window.sessionStorage.getItem('session')
    return this.http.get<ProfileResponse>('http://localhost:3000/profile', { headers: {
        "Auth": JSON.stringify(session)
    } })
  }

}

type ProfileResponse = {
    email: string;
}
