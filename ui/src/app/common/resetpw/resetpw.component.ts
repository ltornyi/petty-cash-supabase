import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-resetpw',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './resetpw.component.html',
  styleUrl: './resetpw.component.css'
})
export class ResetPwComponent {
  public pwUpdateError = '';

  form = this.fb.group({
    password: ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async updatePwd() {
    const password = this.form.value.password
    if (password) {
      this.authService.updatePw(password)
        .then(data => {
          if (data.error) {
            this.pwUpdateError = data.error.message;
          } else {
            this.pwUpdateError = '';
            this.router.navigateByUrl('/')
          }
        })
    }
  }

  login() {
    this.router.navigateByUrl('/');
  }
}
