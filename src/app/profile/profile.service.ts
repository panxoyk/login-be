import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileResponse } from './types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  getProfile() {
    return this.http.get<ProfileResponse>('http://localhost:3000/profile')
  }

  constructor(private http: HttpClient) {}
}
