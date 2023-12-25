import { Injectable } from '@angular/core';
import { defer } from 'rxjs';
import { createSupabaseClient } from '../../common/client/supabase-client';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionService {
  private pettyCashClient;

  constructor() {
    this.pettyCashClient =  createSupabaseClient('pettycash');
  }

  getAllRecords() {
    const response = this.pettyCashClient
      .from('cash_transaction')
      .select();

    return defer(() => response)
  }
}
