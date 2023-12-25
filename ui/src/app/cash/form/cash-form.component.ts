import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

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

@Component({
  selector: 'app-cash-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatButtonModule],
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
