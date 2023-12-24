import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMainComponent } from './cash-main.component';

describe('CashMainComponent', () => {
  let component: CashMainComponent;
  let fixture: ComponentFixture<CashMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
