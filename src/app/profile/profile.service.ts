import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileResponse } from './types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url: string = 'http://localhost:3000'

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.url}/profile`)
  }

  constructor(private http: HttpClient) { }
}
