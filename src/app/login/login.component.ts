import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from './types';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth/auth.service';
import { finalize } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errorMessage: string = "";

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
    if(this.authService.isLogged()) this.router.navigate(['/home'])
  }

  login () {
    try {
      this.loginService.token(this.loginForm.value.email as string)
        .pipe(
          finalize(() => this.loginForm.reset())
        )
        .subscribe({
          next: (tokenRes) => {
            this.loginService.login(this.loginForm.value as Credentials, tokenRes.token)
              .subscribe({
                next: (loginRes) => {
                  this.authService.login(loginRes.session)
                  this.router.navigate(['/profile'])
                },
                error: () => {
                  this.errorMessage = 'Invalid email or password'
                  setTimeout(() => this.errorMessage = '', 3000)
                }
              })
          }
        })

    } catch (error) {
      console.log('ERROR ANGULAR', error)
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}
}
