import { TestBed } from '@angular/core/testing';

import { CashTransactionStore } from './cash-transaction.store';

describe('CashTransactionStoreService', () => {
  let service: CashTransactionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashTransactionStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
