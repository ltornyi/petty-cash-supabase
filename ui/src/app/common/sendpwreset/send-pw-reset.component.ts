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
  selector: 'app-sendpwreset',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './send-pw-reset.component.html',
  styleUrl: './send-pw-reset.component.css'
})
export class SendPwResetComponent {
  public pwResetError = '';

  form = this.fb.group({
    email: ['', Validators.required],
  })

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async sendPwReset() {
    const email = this.form.value.email
    if (email) {
      this.authService.sendPwReset(email)
        .then(data => {
          if (data.error) {
            this.pwResetError = data.error.message;
          } else {
            this.pwResetError = '';
            this.router.navigateByUrl('/',
              {state:
                {msg: 'Check your email and follow the instructions',
                 email: email}
              }
            )
          }
        })
    }
  }

  login() {
    this.router.navigateByUrl('/');
  }
}
