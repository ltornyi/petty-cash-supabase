import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CashTransactionService } from './cash-transaction.service';
import { CashTransactionStoreState, ICashTransaction } from './cash-transaction.store.state';
import { CashRequests } from './cash-requests';
import { RequestState, RequestStatus } from '../../common/types/request-state';
import { CashFormAction, ICashFormResult } from '../form/cash-form.component';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionStore {
  private _cashTransactions: BehaviorSubject<CashTransactionStoreState>;
  readonly cashTransactions$: Observable<CashTransactionStoreState>;

  constructor(private cashTransactionService: CashTransactionService) {
    this._cashTransactions = new BehaviorSubject<CashTransactionStoreState>(new CashTransactionStoreState);
    this.cashTransactions$ = this._cashTransactions.asObservable();
  }

  get cashTransactions() {
    return this._cashTransactions.getValue().cashTransactions;
  }

  get requests() {
    return this._cashTransactions.getValue().requests;
  }

  get state() {
    return this._cashTransactions.getValue();
  }

  setState(nextState: CashTransactionStoreState) {
    this._cashTransactions.next(nextState);
  }

  setRequestState(requestName: keyof CashRequests, requestStatus: RequestStatus, msg?:string) {
    const newRequestState: RequestState = {status: requestStatus, msg: msg}
    this.setState({
      ...this.state,
      requests: {
        ...this.state.requests,
        [requestName]: newRequestState
      }
    })
  }

  loadAll() {
    this.setRequestState('getCashTransactions', RequestStatus.InProgress);
    this.cashTransactionService.getAllRecords()
      .subscribe(allItems => {
        if (allItems.error) {
          this.setRequestState('getCashTransactions', RequestStatus.Error, allItems.error.message);
        } else {
          this.setState({
            ...this.state,
            cashTransactions: allItems.data,
            requests: {
              ...this.state.requests,
              ['getCashTransactions']: {status: RequestStatus.OK, msg:''}
            }
          })
        }
      });
  }

  processCashFormResult(formResult: ICashFormResult) {
    if (formResult && formResult.action !== CashFormAction.Close) {
      const data = formResult.data
      if (formResult.action === CashFormAction.Save) {
        if (!data.transaction_id) {
          this.createNewRow(data)
        } else {
          this.updateRow(data)
        }
      } else if (formResult.action === CashFormAction.Delete) {
        this.deleteRow(data.transaction_id)
      }
    }
  }

  private createNewRow(data: ICashTransaction) {
    this.setRequestState('createCashTransaction', RequestStatus.InProgress)
    this.cashTransactionService.create(data)
      .then(newRow => this.setState({
        ...this.state,
        cashTransactions: [...this.state.cashTransactions, newRow],
        requests: {
          ...this.state.requests,
          ['createCashTransaction']: {status: RequestStatus.OK, msg:''}
        }
      }))
      .catch(err => this.setRequestState('createCashTransaction', RequestStatus.Error, err))
  }

  private updateRow(data: ICashTransaction) {
    this.setRequestState('updateCashTransaction', RequestStatus.InProgress)
    this.cashTransactionService.update(data)
      .then(updatedRow => this.setState({
        ...this.state,
        cashTransactions: [...this.state.cashTransactions.map(t => t.transaction_id === updatedRow.transaction_id ? updatedRow : t)],
        requests: {
          ...this.state.requests,
          ['updateCashTransaction']: {status: RequestStatus.OK, msg:''}
        }
      }))
      .catch(err => this.setRequestState('updateCashTransaction', RequestStatus.Error, err))
  }

  private deleteRow(transaction_id: number) {
    this.setRequestState('deleteCashTransaction', RequestStatus.InProgress)
    this.cashTransactionService.delete(transaction_id)
      .then(_ => this.setState({
        ...this.state,
        cashTransactions: [...this.state.cashTransactions].filter(c => c.transaction_id !== transaction_id),
        requests: {
          ...this.state.requests,
          ['deleteCashTransaction']: {status: RequestStatus.OK, msg:''}
        }
      }))
      .catch(err => this.setRequestState('deleteCashTransaction', RequestStatus.Error, err))
  }
}
