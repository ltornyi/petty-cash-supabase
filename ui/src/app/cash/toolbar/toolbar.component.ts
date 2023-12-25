import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../common/auth/auth.service';
import { CashFormComponent } from '../form/cash-form.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router) {}

  logout() {
    this.authService.signOut()
      .then(() => this.router.navigateByUrl('/'));
  }

  openNewCashDialog() {
    const currentUser = this.authService.getCurrentUserValue();

    const dialogRef = this.dialog.open(CashFormComponent, {
      width: '450px',
      data: {transaction_date: new Date(), clerk: currentUser?.email},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Closed')
      console.log(result);
    });

  }
}
