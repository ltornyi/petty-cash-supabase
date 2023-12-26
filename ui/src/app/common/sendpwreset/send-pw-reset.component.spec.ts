import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

import { SendPwResetComponent } from './send-pw-reset.component';

describe('SendPwResetComponent', () => {
  let component: SendPwResetComponent;
  let fixture: ComponentFixture<SendPwResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendPwResetComponent],
      providers: [provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPwResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
