import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from './types';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth/auth.service';
import { finalize } from 'rxjs';

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
    this.loginService.token(this.loginForm.value.email as string)
      .pipe(
        finalize(() => this.loginForm.reset())
      )
      .subscribe((tokenRes) => {
        this.loginService.login(this.loginForm.value as Credentials, tokenRes.token)
          .subscribe((loginRes) => {
            this.authService.login(loginRes.session)
            this.router.navigate(['/profile'])
          })
      })
  }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}
}
