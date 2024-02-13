import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  getProfile() {
    return this.http.get<ProfileResponse>('http://localhost:3000/profile')
  }

  constructor(private http: HttpClient) {}
}

type ProfileResponse = {
    email: string;
}
