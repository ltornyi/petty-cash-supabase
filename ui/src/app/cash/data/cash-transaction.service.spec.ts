import { TestBed } from '@angular/core/testing';

import { CashTransactionService } from './cash-transaction.service';

describe('AaaService', () => {
  let service: CashTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
