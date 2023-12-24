import { ColDef } from "ag-grid-community";

export const CashGridConfig = {
  columnDefs: [
    {field: 'transaction_id', 'headerName': 'ID'},
    {field: 'transaction_date', 'headerName': 'Date', sortable: true, sort: 'desc'},
    {field: 'amount', 'headerName': 'Amount', valueFormatter: (p => p.data.debit ? p.data.amount : -1 * p.data.amount), sortable: true, type: 'rightAligned'},
  ] as ColDef[],
  defaultColDef: {
    filter: false,
    resizable: true,
  } as ColDef,
  paginationPageSize: 20
}
