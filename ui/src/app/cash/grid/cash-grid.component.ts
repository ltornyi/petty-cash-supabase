import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { CashGridConfig } from './cash-grid.config';
import { GridReadyEvent, CellClickedEvent } from 'ag-grid-community';
import { CashTransactionService } from '../data/cash-transaction.service';
import { Tables } from '../../common/client/supabase.types';
import { CashFormComponent } from '../form/cash-form.component';
import { CashTransactionStore } from '../data/cash-transaction.store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cash-grid',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './cash-grid.component.html',
  styleUrl: './cash-grid.component.css',
  providers: [CashTransactionService]
})
export class CashGridComponent implements OnInit{
  public gridConfig = CashGridConfig
  public rowData: Tables<'cash_transaction'>[] = [];

  private ngUnsubscribe$: Subject<undefined> = new Subject();

  constructor(
    private store: CashTransactionStore,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.cashTransactions$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(state => this.rowData = state.cashTransactions)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(undefined);
    this.ngUnsubscribe$.complete();
  }

  storeLoadAll() {
    this.store.loadAll()
  }

  onGridReady(params: GridReadyEvent) {
    this.storeLoadAll();
  }

  onCellClicked(e: CellClickedEvent) {
    const dialogRef = this.dialog.open(CashFormComponent, {
      width: '450px',
      data: e.data,
    });

    dialogRef.afterClosed().subscribe(result => this.store.processCashFormResult(result));
  }

}
