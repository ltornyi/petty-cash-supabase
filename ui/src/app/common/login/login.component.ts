import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatDividerModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public loginError = '';

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.authService.getCurrentUser().subscribe( user => {
      if (user) {
        this.router.navigateByUrl('/cash')
      }
    })
  }

  ngOnInit(): void {
    if (window.history.state?.msg) {
      const state = window.history.state;
      this.snackBar.open(window.history.state.msg, "Close", {duration: 5000});
      this.form.controls.email.setValue(state.email);
    }
  }

  async login() {
    const credentials = {email: this.form.value.email ?? '', password: this.form.value.password ?? ''};
    this.authService.signIn(credentials)
      .then(data => this.loginError = data.error ? data.error.message : '')
  }

  signUp() {
    this.router.navigateByUrl('/signup')
  }
}
