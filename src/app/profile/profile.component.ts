import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { Profile } from './types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: Profile = null

  ngOnInit(): void {
    this.loadProfile()
  }

  loadProfile(): void {
    this.profileService.getProfile()
      .subscribe({
        next: (data) => {
          this.profile = data
        },
        error: () => {
          this.logout()
        }
      })
  }

  logout(): void {
    this.authService.logout()
    this.profile = null
    this.router.navigate(['/login'])
  }

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) { }
}