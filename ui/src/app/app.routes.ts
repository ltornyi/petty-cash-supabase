import { Routes } from '@angular/router';
import { CashMainComponent } from './cash/main/cash-main.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard } from './common/auth/auth.guard';

export const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'cash', component: CashMainComponent, canActivate: [AuthGuard]},
];
