import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from './types';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errorMessage: string = ""

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
    if(this.authService.isLogged()) this.router.navigate(['/home'])
  }

  login(): void {
    this.loginService.token(this.loginForm.value.email as string)
      .subscribe({
        next: (tokenRes) => {
          this.loginService.login(this.loginForm.value as Credentials, tokenRes.token)
            .subscribe({
              next: (loginRes) => {
                this.authService.login(loginRes.session)
                this.router.navigate(['/profile'])
              },
              error: (error) => {
                console.log('LOGIN ERROR:', error.message)
                this.errorMessage = error.message
                setTimeout(() => this.errorMessage = '', 3000)
              }
            })
        },
        error: (error) => {
          console.log('TOKEN ERROR:', error.message)
        },
        complete: () => {
          this.loginForm.reset()
        }
      })
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}
}
