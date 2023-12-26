import { Routes } from '@angular/router';
import { CashMainComponent } from './cash/main/cash-main.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from './common/auth/auth.guard';
import { SignupComponent } from './common/signup/signup.component';
import { SendPwResetComponent } from './common/sendpwreset/send-pw-reset.component';
import { ResetPwComponent } from './common/resetpw/resetpw.component';

export const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'sendpwreset', component: SendPwResetComponent},
  {path:'resetpw', component: ResetPwComponent},
  {path:'cash', component: CashMainComponent, canActivate: [AuthGuard]},
];
