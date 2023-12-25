import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public signupError = '';

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async signup() {
    const credentials = {email: this.form.value.email ?? '', password: this.form.value.password ?? ''};
    this.authService.signUp(credentials)
      .then(data => {
        if (data.error) {
          this.signupError = data.error.message;
        } else {
          this.signupError = '';
          this.router.navigateByUrl('/',
            {state:
              {msg: 'Check your email and follow the instructions',
               email: credentials.email}
            }
          )
        }
      })
  }

  login() {
    this.router.navigateByUrl('/');
  }
}
