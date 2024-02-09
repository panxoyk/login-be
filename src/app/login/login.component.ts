import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
    if(this.authService.getUser()) this.router.navigate(['/home'])
  }

  login () {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value as User)?.subscribe(
        (data: any) => {
          window.sessionStorage.setItem('session', data.session)
          this.router.navigate(['/profile'])
        }
      )
    }
    this.loginForm.reset()
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

}
