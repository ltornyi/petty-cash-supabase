import { Injectable } from '@angular/core';
import { defer } from 'rxjs';
import { AuthService } from '../../common/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionService {
  private pettyCashClient;

  constructor(private authService: AuthService) {
    this.pettyCashClient = authService.supabaseClient
  }

  getAllRecords() {
    const response = this.pettyCashClient
      .from('cash_transaction')
      .select();

    return defer(() => response)
  }
}
