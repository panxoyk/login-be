import { Component, OnInit } from '@angular/core';
import { JSEncrypt } from 'jsencrypt'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from './types';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
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
    if (this.authService.isLogged()) this.router.navigate(['/profile'])
  }

  login(): void {
    this.loginService.access(this.loginForm.value.email)
      .subscribe({
        next: ({ token, key }) => {
          const email = this.loginForm.value.email
          const encrypt = new JSEncrypt()
          encrypt.setPublicKey(key)
          const password = encrypt.encrypt(this.loginForm.value.password)
          this.loginService.login({ email, password } as Credentials, token)
            .subscribe({
              next: ({ session }) => {
                this.authService.login(session)
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
  ) { }
}
