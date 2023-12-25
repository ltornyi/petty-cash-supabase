import { RequestState } from "../../common/types/request-state";

export interface CashRequests {
  getCashTransactions: RequestState;
  createCashTransaction: RequestState;
  updateCashTransaction: RequestState;
  deleteCashTransaction: RequestState;
}
