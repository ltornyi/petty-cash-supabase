import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CashFormComponent } from './cash-form.component';

describe('CashFormComponent', () => {
  let component: CashFormComponent;
  let fixture: ComponentFixture<CashFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashFormComponent, ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        provideAnimations(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
