import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginError = '';

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    const credentials = {email: this.form.value.email ?? '', password: this.form.value.password ?? ''};
    this.authService.signIn(credentials)
      .then(data => {
        if (data.error) {
          this.loginError = data.error.message;
        } else {
          this.loginError = '';
          this.router.navigateByUrl('/cash')
        }
      })
  }
}
