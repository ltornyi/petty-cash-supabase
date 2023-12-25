import { Injectable } from '@angular/core';
import { defer } from 'rxjs';
import { AuthService } from '../../common/auth/auth.service';
import { TablesInsert, TablesUpdate } from '../../common/client/supabase.types';

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

  async create(insert: TablesInsert<'cash_transaction'>) {
    const {data, error} = await this.pettyCashClient.from('cash_transaction')
      .insert({
        transaction_date: insert.transaction_date,
        debit: !!insert.debit,
        amount: insert.amount,
        clerk: insert.clerk,
        comment: insert.comment
      })
      .select();
    if (error) {
      throw new Error(`Failed to create: ${error.message}`);
    } else {
      return data[0]
    }
  }

  async update(update: TablesUpdate<'cash_transaction'>) {
    const {data, error} = await this.pettyCashClient.from('cash_transaction')
      .update({
        transaction_date: update.transaction_date,
        debit: !!update.debit,
        amount: update.amount,
        clerk: update.clerk,
        comment: update.comment
      })
      .eq('transaction_id', update.transaction_id as number)
      .select()
    if (error) {
      throw new Error(`Failed to update: ${error.message}`);
    }
    return data[0]
  }

  async delete(transaction_id: number) {
    const {error} = await this.pettyCashClient.from('cash_transaction')
      .delete()
      .eq('transaction_id', transaction_id)
    if (error) {
      throw new Error(`Failed to delete: ${error.message}`);
    }
  }

}
