import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { CashGridConfig } from './cash-grid.config';
import { GridReadyEvent, CellClickedEvent } from 'ag-grid-community';
import { CashTransactionService } from '../data/cash-transaction.service';
import { Tables } from '../../common/client/supabase.types';
import { CashFormComponent, ICashFormResult } from '../form/cash-form.component';

@Component({
  selector: 'app-cash-grid',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './cash-grid.component.html',
  styleUrl: './cash-grid.component.css',
  providers: [CashTransactionService]
})
export class CashGridComponent {
  public gridConfig = CashGridConfig
  public rowData: Tables<'cash_transaction'>[] = [];

  constructor(
    private cashTransactionService: CashTransactionService,
    private dialog: MatDialog) {}

  onGridReady(params: GridReadyEvent) {
    this.loadAll();
  }

  private loadAll() {
    this.cashTransactionService.getAllRecords()
      .subscribe(result => this.rowData = result.data ?? []);
  }

  onCellClicked(e: CellClickedEvent) {
    const dialogRef = this.dialog.open(CashFormComponent, {
      width: '450px',
      data: e.data,
    });

    dialogRef.afterClosed().subscribe(result => this.processDialogResult(result));
  }

  private processDialogResult(result: ICashFormResult) {
    if (result) {
      console.log(result.action)
    }
  }
}
