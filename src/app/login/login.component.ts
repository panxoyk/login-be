import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../types';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';

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
    if(!!window.sessionStorage.getItem('session')) this.router.navigate(['/home'])
  }

  login () {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as User)?.subscribe(
        (data) => {
          window.sessionStorage.setItem('session', data.session)
          this.router.navigate(['/profile'])
        }
      )
    }
    this.loginForm.reset()
  }

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {}

}
