import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ResetPwComponent } from './resetpw.component';

describe('ResetpwComponent', () => {
  let component: ResetPwComponent;
  let fixture: ComponentFixture<ResetPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPwComponent],
      providers: [provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
