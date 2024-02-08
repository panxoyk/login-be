import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    if(!this.loginService.getUser()) this.router.navigate(['/login'])
  }

  constructor(private loginService: LoginService, private router: Router) {}

  getUser() {
    return this.loginService.getUser();
  }

  logout() {
    window.sessionStorage.removeItem('session')
    this.router.navigate(["/home"])
  }

}
