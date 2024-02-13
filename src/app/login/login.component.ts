import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from './types';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
    if(this.authService.isLogged()) this.router.navigate(['/home'])
  }

  login () {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as Credentials)
        .subscribe((data) => {
          this.authService.login(data.session)
          this.router.navigate(['/profile'])
        })
    }
    this.loginForm.reset()
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}
}
