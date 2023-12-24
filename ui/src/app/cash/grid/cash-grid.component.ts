import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { CashGridConfig } from './cash-grid.config';
import { GridReadyEvent } from 'ag-grid-community';
import { CashTransactionService } from '../data/cash-transaction.service';

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
  public rowData : any  = null;

  constructor(private cashTransactionService: CashTransactionService) {}

  onGridReady(params: GridReadyEvent) {
    this.loadAll();
  }

  private loadAll() {
    this.cashTransactionService.getAllRecords()
      .subscribe(result => {
        console.log(result);
        this.rowData = result.data;
        console.log(this.rowData)
      });
  }
}
