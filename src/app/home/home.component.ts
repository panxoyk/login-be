import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { User } from '../user';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  getUser() {
    return this.loginService.getUser();
  }

}
