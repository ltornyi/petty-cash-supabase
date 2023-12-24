import { ColDef } from "ag-grid-community";

export const CashGridConfig = {
  columnDefs: [
    {field: 'transaction_id', headerName: 'ID'},
    {field: 'transaction_date', headerName: 'Date', sortable: true, sort: 'desc'},
    {field: 'amount', headerName: 'Amount', valueFormatter: (p => p.data.debit ? p.data.amount : -1 * p.data.amount), sortable: true, type: 'rightAligned'},
    {field: 'clerk', headerName: 'Clerk'},
    {field: 'comment', headerName: 'Comment'},
  ] as ColDef[],
  defaultColDef: {
    filter: true,
    resizable: true,
  } as ColDef,
  paginationPageSize: 20
}
