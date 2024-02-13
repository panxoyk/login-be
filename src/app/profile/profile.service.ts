import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  getProfile() {
    const session = this.authService.getToken()
    return this.http.get<ProfileResponse>('http://localhost:3000/profile', { headers: {
        "Auth": JSON.stringify(session)
    } })
  }

  constructor(private http: HttpClient, private authService: AuthService) {}
}

type ProfileResponse = {
    email: string;
}
