import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  getProfile() {
    const session = window.sessionStorage.getItem('session')
    return this.http.get<ProfileResponse>('http://localhost:3000/profile', { headers: {
        "Auth": JSON.stringify(session)
    } })
  }

  constructor(private http: HttpClient) {}

}

type ProfileResponse = {
    email: string;
}
