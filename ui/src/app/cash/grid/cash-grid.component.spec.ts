import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashGridComponent } from './cash-grid.component';

describe('CashGridComponent', () => {
  let component: CashGridComponent;
  let fixture: ComponentFixture<CashGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
