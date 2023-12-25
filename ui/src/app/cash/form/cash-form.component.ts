import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateFnsModule, DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { enGB } from 'date-fns/locale';

import { Tables } from '../../common/client/supabase.types';

export enum CashFormAction {
  Save = 'SAVE',
  Delete = 'DELETE',
  Close = 'CLOSE'
}

export interface ICashFormResult {
  data: Tables<'cash_transaction'>,
  action: CashFormAction
}

const ISO_DATE_FORMATS = {
  parse: {
    dateInput: 'yyyy-MM-dd',
  },
  display: {
    dateInput: 'yyyy-MM-dd',
    monthLabel: 'MMM',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  },
};

@Component({
  selector: 'app-cash-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatDatepickerModule, MatDateFnsModule, MatCheckboxModule, MatButtonModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: enGB},
    {provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: ISO_DATE_FORMATS},

  ],
  templateUrl: './cash-form.component.html',
  styleUrl: './cash-form.component.css'
})
export class CashFormComponent {

  form = this.fb.group({
    transaction_id: [this.cashItem.transaction_id],
    transaction_date: [this.cashItem.transaction_date, [Validators.required] ],
    debit: [this.cashItem.debit],
    amount: [this.cashItem.amount, [Validators.required, Validators.pattern(/^\d+$/)] ],
    clerk: [this.cashItem.clerk, Validators.required],
    comment: [this.cashItem.comment]
 });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CashFormComponent>,
    @Inject(MAT_DIALOG_DATA) public cashItem: Tables<'cash_transaction'>,
  ) {}

  save() {
    this.dialogRef.close({data: this.form.value as Tables<'cash_transaction'>, action: CashFormAction.Save} as ICashFormResult);
  }

  delete() {
    this.dialogRef.close({data: this.form.value as Tables<'cash_transaction'>, action: CashFormAction.Delete} as ICashFormResult);
  }

  close() {
    this.dialogRef.close({data: this.form.value as Tables<'cash_transaction'>, action: CashFormAction.Close} as ICashFormResult);
  }
}
