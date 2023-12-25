import { Tables } from '../../common/client/supabase.types';
import { CashRequests } from './cash-requests';

export type ICashTransaction = Tables<'cash_transaction'>

export class CashTransactionStoreState {
  cashTransactions: ICashTransaction[] = [];
  requests: CashRequests = {
    getCashTransactions: {},
    createCashTransaction: {},
    updateCashTransaction: {},
    deleteCashTransaction: {}
  }
}
