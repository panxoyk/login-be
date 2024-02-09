import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile: any = null;

  ngOnInit() {
    this.loadProfile()
  }

  loadProfile(): void {
    this.profileService.getProfile()
      .subscribe((data) => {
        this.profile = data
      })
  }

  logout() {
    window.sessionStorage.removeItem('session')
    this.profile = null
    this.router.navigate(["/home"])
  }

  constructor(private profileService: ProfileService, private router: Router) {}

}