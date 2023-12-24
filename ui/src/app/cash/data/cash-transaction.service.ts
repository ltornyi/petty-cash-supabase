import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SupabaseConfig } from './supabase.config';
import { Database, Tables } from './supabase.types';
import { defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionService {
  private pettyCashClient: SupabaseClient<Database>;
  private xxx = 'cash_transaction'
  constructor() {
    this.pettyCashClient =  createClient(
      SupabaseConfig.endpoint,
      SupabaseConfig.key,
      {db: {schema: 'pettycash'}}
    );
  }

  getAllRecords() {
    const response = this.pettyCashClient
      .from('cash_transaction')
      .select()
      .returns<Tables<'cash_transaction'>>();

    return defer(() => response)
  }
}
